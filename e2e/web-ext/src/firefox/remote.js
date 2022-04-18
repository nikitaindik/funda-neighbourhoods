/* @flow */
import net from "net";

import FirefoxRDPClient, { connectToFirefox as defaultFirefoxConnector } from "./rdp-client";
import { createLogger } from "../util/logger";
import { isErrorWithCode, RemoteTempInstallNotSupported, UsageError, WebExtError } from "../errors";

const log = createLogger(__filename);

export type FirefoxConnectorFn = (port: number) => Promise<FirefoxRDPClient>;

export type FirefoxRDPAddonActor = {|
  id: string,
  actor: string,
|};

export type FirefoxRDPResponseError = {|
  error: string,
  message: string,
|};

export type FirefoxRDPResponseAddon = {|
  addon: FirefoxRDPAddonActor,
|};

export type FirefoxRDPResponseRequestTypes = {|
  requestTypes: Array<string>,
|};

// NOTE: this type aliases Object to catch any other possible response.
export type FirefoxRDPResponseAny = Object;

export type FirefoxRDPResponseMaybe = FirefoxRDPResponseRequestTypes | FirefoxRDPResponseAny;

// Convert a request rejection to a message string.
function requestErrorToMessage(err: Error | FirefoxRDPResponseError) {
  if (err instanceof Error) {
    return String(err);
  }
  return `${err.error}: ${err.message}`;
}

export class RemoteFirefox {
  client: Object;
  checkedForAddonReloading: boolean;

  constructor(client: FirefoxRDPClient) {
    this.client = client;
    this.checkedForAddonReloading = false;

    client.on("disconnect", () => {
      console.log('Received "disconnect" from Firefox client');
    });
    client.on("end", () => {
      console.log('Received "end" from Firefox client');
    });
    client.on("unsolicited-event", info => {
      console.log(`Received message from client: ${JSON.stringify(info)}`);
    });
    client.on("rdp-error", rdpError => {
      console.log(`Received error from client: ${JSON.stringify(rdpError)}`);
    });
    client.on("error", error => {
      console.log(`Received error from client: ${String(error)}`);
    });
  }

  disconnect() {
    this.client.disconnect();
  }

  async addonRequest(addon: FirefoxRDPAddonActor, request: string): Promise<FirefoxRDPResponseMaybe> {
    try {
      const response = await this.client.request({
        to: addon.actor,
        type: request,
      });
      return response;
    } catch (err) {
      console.log(`Client responded to '${request}' request with error:`, err);
      const message = requestErrorToMessage(err);
      throw new WebExtError(`Remote Firefox: addonRequest() error: ${message}`);
    }
  }

  async getAddonsActor(): Promise<string> {
    try {
      // getRoot should work since Firefox 55 (bug 1352157).
      const response = await this.client.request("getRoot");
      if (response.addonsActor == null) {
        return Promise.reject(
          new RemoteTempInstallNotSupported(
            "This version of Firefox does not provide an add-ons actor for " + "remote installation."
          )
        );
      }
      return response.addonsActor;
    } catch (err) {
      // Fallback to listTabs otherwise, Firefox 49 - 77 (bug 1618691).
      console.log("Falling back to listTabs because getRoot failed", err);
    }

    try {
      const response = await this.client.request("listTabs");
      // addonsActor was added to listTabs in Firefox 49 (bug 1273183).
      if (response.addonsActor == null) {
        console.log("listTabs returned a falsey addonsActor: " + `${JSON.stringify(response)}`);
        return Promise.reject(
          new RemoteTempInstallNotSupported(
            "This is an older version of Firefox that does not provide an " +
              "add-ons actor for remote installation. Try Firefox 49 or " +
              "higher."
          )
        );
      }
      return response.addonsActor;
    } catch (err) {
      console.log("listTabs error", err);
      const message = requestErrorToMessage(err);
      throw new WebExtError(`Remote Firefox: listTabs() error: ${message}`);
    }
  }

  async installTemporaryAddon(addonPath: string): Promise<FirefoxRDPResponseAddon> {
    const addonsActor = await this.getAddonsActor();

    try {
      const response = await this.client.request({
        to: addonsActor,
        type: "installTemporaryAddon",
        addonPath,
      });
      console.log(`installTemporaryAddon: ${JSON.stringify(response)}`);
      console.log(`Installed ${addonPath} as a temporary add-on`);
      return response;
    } catch (err) {
      const message = requestErrorToMessage(err);
      throw new WebExtError(`installTemporaryAddon: Error: ${message}`);
    }
  }

  async getInstalledAddon(addonId: string): Promise<FirefoxRDPAddonActor> {
    try {
      const response = await this.client.request("listAddons");
      for (const addon of response.addons) {
        if (addon.id === addonId) {
          return addon;
        }
      }
      console.log(`Remote Firefox has these addons: ${response.addons.map(a => a.id)}`);
      return Promise.reject(new WebExtError("The remote Firefox does not have your extension installed"));
    } catch (err) {
      const message = requestErrorToMessage(err);
      throw new WebExtError(`Remote Firefox: listAddons() error: ${message}`);
    }
  }

  async checkForAddonReloading(addon: FirefoxRDPAddonActor): Promise<FirefoxRDPAddonActor> {
    if (this.checkedForAddonReloading) {
      // We only need to check once if reload() is supported.
      return addon;
    } else {
      const response = await this.addonRequest(addon, "requestTypes");

      if (response.requestTypes.indexOf("reload") === -1) {
        const supportedRequestTypes = JSON.stringify(response.requestTypes);
        console.log(`Remote Firefox only supports: ${supportedRequestTypes}`);
        throw new UsageError("This Firefox version does not support add-on reloading. " + "Re-run with --no-reload");
      } else {
        this.checkedForAddonReloading = true;
        return addon;
      }
    }
  }

  async reloadAddon(addonId: string): Promise<void> {
    const addon = await this.getInstalledAddon(addonId);
    await this.checkForAddonReloading(addon);
    await this.addonRequest(addon, "reload");
    process.stdout.write(`\rLast extension reload: ${new Date().toTimeString()}`);
    console.log("\n");
  }
}

// Connect types and implementation

export type ConnectOptions = {|
  connectToFirefox: FirefoxConnectorFn,
|};

export async function connect(
  port: number,
  { connectToFirefox = defaultFirefoxConnector }: ConnectOptions = {}
): Promise<RemoteFirefox> {
  console.log(`Connecting to Firefox on port ${port}`);
  const client = await connectToFirefox(port);
  console.log(`Connected to the remote Firefox debugger on port ${port}`);
  return new RemoteFirefox(client);
}

// ConnectWithMaxRetries types and implementation

export type ConnectWithMaxRetriesParams = {|
  maxRetries?: number,
  retryInterval?: number,
  port: number,
|};

export type ConnectWithMaxRetriesDeps = {|
  connectToFirefox: typeof connect,
|};

export async function connectWithMaxRetries(
  // A max of 250 will try connecting for 30 seconds.
  { maxRetries = 250, retryInterval = 120, port }: ConnectWithMaxRetriesParams,
  { connectToFirefox = connect }: ConnectWithMaxRetriesDeps = {}
): Promise<RemoteFirefox> {
  async function establishConnection() {
    var lastError;

    for (let retries = 0; retries <= maxRetries; retries++) {
      try {
        return await connectToFirefox(port);
      } catch (error) {
        if (isErrorWithCode("ECONNREFUSED", error)) {
          // Wait for `retryInterval` ms.
          await new Promise(resolve => {
            setTimeout(resolve, retryInterval);
          });

          lastError = error;
          console.log(`Retrying Firefox (${retries}); connection error: ${error}`);
        } else {
          console.log(error.stack);
          throw error;
        }
      }
    }

    console.log("Connect to Firefox debugger: too many retries");
    throw lastError;
  }

  console.log("Connecting to the remote Firefox debugger");
  return establishConnection();
}

export function findFreeTcpPort(): Promise<number> {
  return new Promise(resolve => {
    const srv = net.createServer();
    // $FlowFixMe: signature for listen() is missing - see https://github.com/facebook/flow/pull/8290
    srv.listen(0, "127.0.0.1", () => {
      const freeTcpPort = srv.address().port;
      srv.close(() => resolve(freeTcpPort));
    });
  });
}

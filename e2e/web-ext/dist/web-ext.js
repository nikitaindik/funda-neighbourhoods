require("source-map-support").install(),
  (() => {
    "use strict";
    var e = {
        564: (e, t, r) => {
          r.r(t),
            r.d(t, {
              default: () => k,
              defaultPackageCreator: () => F,
              getDefaultLocalizedName: () => A,
              getStringPropertyValue: () => E,
              safeFileName: () => $,
            });
          var i = r(622),
            n = r.n(i),
            o = r(747),
            s = r(615),
            a = r(84),
            c = r.n(a),
            d = r(174),
            l = r.n(d),
            u = r(284),
            f = r.n(u),
            h = r(849),
            p = r.n(h);
          const g = require("zip-dir");
          var m = r.n(g),
            w = r(799),
            b = r(515),
            y = r(413),
            x = r(577),
            v = r(318),
            D = r(883);
          const P = (0, x.createLogger)("src/cmd/build.js");
          function $(e) {
            return e.toLowerCase().replace(/[^a-z0-9.-]+/g, "_");
          }
          async function A({ messageFile: e, manifestData: t }) {
            let r,
              i,
              n = t.name;
            try {
              i = await s.fs.readFile(e, { encoding: "utf-8" });
            } catch (t) {
              throw new v.Oi(`Error reading messages.json file at ${e}: ${t}`);
            }
            i = l()(i);
            try {
              r = c()(f()(i));
            } catch (t) {
              throw new v.Oi(`Error parsing messages.json file at ${e}: ${t}`);
            }
            return (
              (n = t.name.replace(/__MSG_([A-Za-z0-9@_]+?)__/g, (t, i) => {
                if (r[i] && r[i].message) return r[i].message;
                throw new v.Oi(`The locale file ${e} is missing key: ${i}`);
              })),
              Promise.resolve(n)
            );
          }
          function E(e, t) {
            const r = e.split(".").reduce((e, t) => e && e[t], t);
            if (!["string", "number"].includes(typeof r))
              throw new v.Oi(`Manifest key "${e}" is missing or has an invalid type: ${r}`);
            const i = `${r}`;
            if (!i.length) throw new v.Oi(`Manifest key "${e}" value is an empty string`);
            return i;
          }
          async function F(
            {
              manifestData: e,
              sourceDir: t,
              fileFilter: r,
              artifactsDir: i,
              overwriteDest: s,
              showReadyMessage: a,
              filename: c = "{name}-{version}.zip",
            },
            { fromEvent: d = p() } = {}
          ) {
            let l;
            e
              ? ((l = (0, b.L)(e)), console.log(`Using manifest id=${l || "[not specified]"}`))
              : (e = await (0, b.Z)(t));
            const u = await m()(t, { filter: (...e) => r.wantFile(...e) });
            let f = c,
              { default_locale: h } = e;
            if (h) {
              h = h.replace(/-/g, "_");
              const r = n().join(t, "_locales", h, "messages.json");
              console.log("Manifest declared default_locale, localizing extension name");
              const i = await A({ messageFile: r, manifestData: e });
              f = f.replace(/{name}/g, i);
            }
            const g = $(
                (function (e, t) {
                  const r = e.replace(/{([A-Za-z0-9._]+?)}/g, (e, r) => $(E(r, t))),
                    i = n().parse(r);
                  if (i.dir)
                    throw new v.Oi(`Invalid filename template "${e}". Filename "${r}" should not contain a path`);
                  if (![".zip", ".xpi"].includes(i.ext))
                    throw new v.Oi(
                      `Invalid filename template "${e}". Filename "${r}" should have a zip or xpi extension`
                    );
                  return r;
                })(f, e)
              ),
              w = n().join(i, g),
              y = (0, o.createWriteStream)(w, { flags: "wx" });
            y.write(u, () => {
              y.end();
            });
            try {
              await d(y, "close");
            } catch (e) {
              if (!(0, v.lP)("EEXIST", e)) throw e;
              if (!s)
                throw new v.Oi(
                  `Extension exists at the destination path: ${w}\nUse --overwrite-dest to enable overwriting.`
                );
              console.log(`Destination exists, overwriting: ${w}`);
              const t = (0, o.createWriteStream)(w);
              t.write(u, () => {
                t.end();
              }),
                await d(t, "close");
            }
            return a && console.log(`Your web extension is ready: ${w}`), { extensionPath: w };
          }
          async function k(
            {
              sourceDir: e,
              artifactsDir: t,
              asNeeded: r = !1,
              overwriteDest: i = !1,
              ignoreFiles: n = [],
              filename: o = "{name}-{version}.zip",
            },
            {
              manifestData: s,
              createFileFilter: a = D.k8,
              fileFilter: c = a({ sourceDir: e, artifactsDir: t, ignoreFiles: n }),
              onSourceChange: d = w.Z,
              packageCreator: l = F,
              showReadyMessage: u = !0,
            } = {}
          ) {
            const f = r;
            console.log(`Building web extension from ${e}`);
            const h = () =>
              l({
                manifestData: s,
                sourceDir: e,
                fileFilter: c,
                artifactsDir: t,
                overwriteDest: i,
                showReadyMessage: u,
                filename: o,
              });
            await (0, y.C)(t);
            const p = await h();
            return (
              f &&
                (console.log("Rebuilding when files change..."),
                d({
                  sourceDir: e,
                  artifactsDir: t,
                  onChange: () =>
                    h().catch(e => {
                      throw (console.log(e.stack), e);
                    }),
                  shouldWatchFile: (...e) => c.wantFile(...e),
                })),
              p
            );
          }
        },
        966: (e, t, r) => {
          r.r(t), r.d(t, { default: () => a, url: () => s });
          const i = require("open");
          var n = r.n(i);
          const o = (0, r(577).createLogger)("src/cmd/docs.js"),
            s = "https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/";
          function a(e, { openUrl: t = n() } = {}) {
            return new Promise((e, r) => {
              t(s, t => {
                t ? (console.log(`Encountered an error while opening URL ${s}`, t), r(t)) : e();
              });
            });
          }
        },
        177: (e, t, r) => {
          r.r(t), r.d(t, { default: () => a });
          const i = require("addons-linter");
          var n = r(577),
            o = r(883);
          const s = (0, n.createLogger)("src/cmd/lint.js");
          function a(
            {
              artifactsDir: e,
              boring: t,
              ignoreFiles: r,
              metadata: n,
              output: a,
              pretty: c,
              sourceDir: d,
              selfHosted: l,
              verbose: u,
              warningsAsErrors: f,
            },
            { createLinter: h = i.createInstance, createFileFilter: p = o.k8, shouldExitProgram: g = !0 } = {}
          ) {
            const m = p({ sourceDir: d, ignoreFiles: r, artifactsDir: e });
            return (
              console.log(`Running addons-linter on ${d}`),
              h({
                config: {
                  logLevel: u ? "debug" : "fatal",
                  stack: Boolean(u),
                  pretty: c,
                  warningsAsErrors: f,
                  metadata: n,
                  output: a,
                  boring: t,
                  selfHosted: l,
                  shouldScanFile: e => m.wantFile(e),
                  _: [d],
                },
                runAsBinary: g,
              }).run()
            );
          }
        },
        111: (e, t, r) => {
          r.r(t), r.d(t, { default: () => $ });
          var i = r(615),
            n = r(564),
            o = r(227),
            s = r(283),
            a = r(735),
            c = r(577),
            d = r(515),
            l = r(318),
            u = r(12),
            f = r.n(u),
            h = r(58),
            p = r.n(h),
            g = r(883),
            m = r(61),
            w = r(799);
          const b = (0, c.createLogger)("src/extension-runners/index.js");
          async function y(e) {
            switch (e.target) {
              case "firefox-desktop": {
                const { FirefoxDesktopExtensionRunner: t } = r(236);
                return new t(e.params);
              }
              case "firefox-android": {
                const { FirefoxAndroidExtensionRunner: t } = r(766);
                return new t(e.params);
              }
              case "chromium": {
                const { ChromiumExtensionRunner: t } = r(192);
                return new t(e.params);
              }
              default:
                throw new l.ag(`Unknown target: "${e.target}"`);
            }
          }
          class x {
            constructor(e) {
              f()(this, "extensionRunners", void 0),
                f()(this, "desktopNotifications", void 0),
                (this.extensionRunners = e.runners),
                (this.desktopNotifications = e.desktopNotifications);
            }
            getName() {
              return "Multi Extension Runner";
            }
            async run() {
              const e = [];
              for (const t of this.extensionRunners) e.push(t.run());
              await Promise.all(e);
            }
            async reloadAllExtensions() {
              console.log("Reloading all reloadable add-ons");
              const e = [];
              for (const t of this.extensionRunners) {
                const r = t.reloadAllExtensions().then(
                  () => ({ runnerName: t.getName() }),
                  e => ({ runnerName: t.getName(), reloadError: e })
                );
                e.push(r);
              }
              return await Promise.all(e).then(e => (this.handleReloadResults(e), e));
            }
            async reloadExtensionBySourceDir(e) {
              console.log(`Reloading add-on at ${e}`);
              const t = [];
              for (const r of this.extensionRunners) {
                const i = r.reloadExtensionBySourceDir(e).then(
                  () => ({ runnerName: r.getName(), sourceDir: e }),
                  t => ({ runnerName: r.getName(), reloadError: t, sourceDir: e })
                );
                t.push(i);
              }
              return await Promise.all(t).then(e => (this.handleReloadResults(e), e));
            }
            registerCleanup(e) {
              const t = [];
              for (const e of this.extensionRunners)
                t.push(
                  new Promise(t => {
                    e.registerCleanup(t);
                  })
                );
              Promise.all(t).then(e, e);
            }
            async exit() {
              const e = [];
              for (const t of this.extensionRunners) e.push(t.exit());
              await Promise.all(e);
            }
            handleReloadResults(e) {
              for (const { runnerName: t, reloadError: r, sourceDir: i } of e)
                if (r instanceof Error) {
                  let e = "Error occurred while reloading";
                  i && (e += ` "${i}" `),
                    (e += `on "${t}" - ${r.message}`),
                    console.log(`\n${e}`),
                    console.log(r.stack),
                    this.desktopNotifications({ title: "web-ext run: extension reload error", message: e });
                }
            }
          }
          function v({
            reloadExtension: e,
            sourceDir: t,
            watchFile: r,
            watchIgnored: i,
            artifactsDir: n,
            ignoreFiles: o,
            onSourceChange: s = w.Z,
            createFileFilter: a = g.k8,
          }) {
            const c = a({ sourceDir: t, artifactsDir: n, ignoreFiles: o });
            return s({
              sourceDir: t,
              watchFile: r,
              watchIgnored: i,
              artifactsDir: n,
              onChange: () => e(t),
              shouldWatchFile: e => c.wantFile(e),
            });
          }
          function D(
            {
              artifactsDir: e,
              extensionRunner: t,
              ignoreFiles: r,
              noInput: i = !1,
              sourceDir: n,
              watchFile: o,
              watchIgnored: s,
            },
            { createWatcher: a = v, stdin: c = process.stdin, kill: d = process.kill } = {}
          ) {
            const l = !i;
            l || console.log("Input has been disabled because of noInput==true");
            const u = a({
              reloadExtension: e => {
                t.reloadExtensionBySourceDir(e);
              },
              sourceDir: n,
              watchFile: o,
              watchIgnored: s,
              artifactsDir: e,
              ignoreFiles: r,
            });
            if (
              (t.registerCleanup(() => {
                u.close(), l && c.pause();
              }),
              l && (0, m._)(c))
            ) {
              p().emitKeypressEvents(c), (0, m.k)(c, !0);
              const e = "Press R to reload (and Ctrl-C to quit)";
              Promise.resolve().then(async function () {
                console.log(e);
                let r = !1;
                for (; !r; ) {
                  const i = await new Promise(e => {
                    c.once("keypress", (t, r) => e(r));
                  });
                  i.ctrl && "c" === i.name
                    ? (r = !0)
                    : "z" === i.name
                    ? ((0, m.k)(c, !1),
                      console.log("\nweb-ext has been suspended on user request"),
                      d(process.pid, "SIGTSTP"),
                      console.log(`\nweb-ext has been resumed. ${e}`),
                      (0, m.k)(c, !0))
                    : "r" === i.name &&
                      (console.log("Reloading installed extensions on user request"),
                      await t.reloadAllExtensions().catch(e => {
                        console.log(`\nError reloading extension: ${e}`),
                          console.log(`Reloading extension error stack: ${e.stack}`);
                      }));
                }
                console.log("\nExiting web-ext on user request"), t.exit();
              });
            }
          }
          const P = (0, c.createLogger)("src/cmd/run.js");
          async function $(
            {
              artifactsDir: e,
              browserConsole: t = !1,
              pref: r,
              firefox: c,
              firefoxProfile: u,
              profileCreateIfMissing: f,
              keepProfileChanges: h = !1,
              ignoreFiles: p,
              noInput: g = !1,
              noReload: m = !1,
              preInstall: w = !1,
              sourceDir: b,
              watchFile: v,
              watchIgnored: $,
              startUrl: A,
              target: E,
              args: F,
              adbBin: k,
              adbHost: S,
              adbPort: C,
              adbDevice: O,
              adbDiscoveryTimeout: R,
              adbRemoveOldArtifacts: I,
              firefoxApk: _,
              firefoxApkComponent: T,
              chromiumBinary: N,
              chromiumProfile: j,
            },
            {
              buildExtension: q = n.default,
              desktopNotifications: U = o.w,
              firefoxApp: L = s,
              firefoxClient: M = a.w8,
              reloadStrategy: B = D,
              MultiExtensionRunner: W = x,
              getValidatedManifest: z = d.Z,
            } = {}
          ) {
            if (
              (console.log(`Running web extension from ${b}`),
              w && (console.log("Disabled auto-reloading because it's not possible with --pre-install"), (m = !0)),
              !(null == v || (Array.isArray(v) && v.every(e => "string" == typeof e))))
            )
              throw new l.Oi("Unexpected watchFile type");
            const J = r,
              K = await z(b),
              V = u || j;
            if (f) {
              if (!V) throw new l.Oi("--profile-create-if-missing requires --firefox-profile or --chromium-profile");
              i.fs.existsSync(V)
                ? console.log(`Profile directory ${V} already exists`)
                : (console.log(`Profile directory not found. Creating directory ${V}`), await i.fs.mkdir(V));
            }
            const Z = [],
              H = {
                extensions: [{ sourceDir: b, manifestData: K }],
                keepProfileChanges: h,
                startUrl: A,
                args: F,
                desktopNotifications: U,
              };
            if (!E || 0 === E.length || E.includes("firefox-desktop")) {
              const e = {
                  ...H,
                  firefoxBinary: c,
                  profilePath: u,
                  customPrefs: J,
                  browserConsole: t,
                  preInstall: w,
                  firefoxApp: L,
                  firefoxClient: M,
                },
                r = await y({ target: "firefox-desktop", params: e });
              Z.push(r);
            }
            if (E && E.includes("firefox-android")) {
              const e = {
                  ...H,
                  profilePath: u,
                  customPrefs: J,
                  browserConsole: t,
                  preInstall: w,
                  firefoxApk: _,
                  firefoxApkComponent: T,
                  adbDevice: O,
                  adbHost: S,
                  adbPort: C,
                  adbBin: k,
                  adbDiscoveryTimeout: R,
                  adbRemoveOldArtifacts: I,
                  firefoxApp: L,
                  firefoxClient: M,
                  desktopNotifications: o.w,
                  buildSourceDir: (e, t) =>
                    q({ sourceDir: e, ignoreFiles: p, asNeeded: !1, artifactsDir: t }, { showReadyMessage: !1 }),
                },
                r = await y({ target: "firefox-android", params: e });
              Z.push(r);
            }
            if (E && E.includes("chromium")) {
              const e = { ...H, chromiumBinary: N, chromiumProfile: j },
                t = await y({ target: "chromium", params: e });
              Z.push(t);
            }
            const G = new W({ desktopNotifications: U, runners: Z });
            return (
              await G.run(),
              m
                ? console.log("Automatic extension reloading has been disabled")
                : (console.log("The extension will reload if any source file changes"),
                  B({
                    extensionRunner: G,
                    sourceDir: b,
                    watchFile: v,
                    watchIgnored: $,
                    artifactsDir: e,
                    ignoreFiles: p,
                    noInput: g,
                  })),
              G
            );
          }
        },
        750: (e, t, r) => {
          r.r(t),
            r.d(t, {
              default: () => g,
              extensionIdFile: () => p,
              getIdFromSourceDir: () => m,
              saveIdToSourceDir: () => w,
            });
          var i = r(622),
            n = r.n(i),
            o = r(615);
          const s = require("sign-addon");
          var a = r(564),
            c = r(515),
            d = r(737),
            l = r(318),
            u = r(413);
          const f = (0, r(577).createLogger)("src/cmd/sign.js"),
            h = o.fs.readFile.bind(o.fs),
            p = ".web-extension-id";
          function g(
            {
              apiKey: e,
              apiProxy: t,
              apiSecret: r,
              apiUrlPrefix: i,
              artifactsDir: n,
              id: o,
              ignoreFiles: h = [],
              sourceDir: p,
              timeout: g,
              verbose: b,
              channel: y,
            },
            { build: x = a.default, preValidatedManifest: v, signAddon: D = s.signAddon } = {}
          ) {
            return (0, d._)(async function (s) {
              let a;
              await (0, u.C)(n), (a = v || (await (0, c.Z)(p)));
              const [d, P] = await Promise.all([
                  x(
                    { sourceDir: p, ignoreFiles: h, artifactsDir: s.path() },
                    { manifestData: a, showReadyMessage: !1 }
                  ),
                  m(p),
                ]),
                $ = (0, c.L)(a);
              if (o && $) throw new l.Oi(`Cannot set custom ID ${o} because manifest.json declares ID ${$}`);
              o && console.log(`Using custom ID declared as --id=${o}`),
                $ && (o = $),
                !o && P && (console.log(`Using previously auto-generated extension ID: ${P}`), (o = P)),
                o || console.log("No extension ID specified (it will be auto-generated)");
              const A = await D({
                apiKey: e,
                apiSecret: r,
                apiUrlPrefix: i,
                apiProxy: t,
                timeout: g,
                verbose: b,
                id: o,
                xpiPath: d.extensionPath,
                version: a.version,
                downloadDir: n,
                channel: y,
              });
              if ((A.id && (await w(p, A.id)), !A.success))
                throw (console.log("FAIL"), new l.ag("The extension could not be signed"));
              return console.log(`Extension ID: ${A.id}`), console.log("SUCCESS"), A;
            });
          }
          async function m(e, t = h) {
            const r = n().join(e, p);
            let i;
            try {
              i = await t(r);
            } catch (e) {
              if ((0, l.lP)("ENOENT", e)) return void console.log(`No ID file found at: ${r}`);
              throw e;
            }
            let o = i.toString().split("\n");
            o = o.filter(e => {
              if ((e = e.trim()) && !e.startsWith("#")) return e;
            });
            const s = o[0];
            if ((console.log(`Found extension ID ${s} in ${r}`), !s))
              throw new l.Oi(`No ID found in extension ID file ${r}`);
            return s;
          }
          async function w(e, t) {
            const r = n().join(e, p);
            await o.fs.writeFile(
              r,
              [
                "# This file was created by https://github.com/mozilla/web-ext",
                "# Your auto-generated extension ID for addons.mozilla.org is:",
                t.toString(),
              ].join("\n")
            ),
              console.log(`Saved auto-generated ID ${t} to ${r}`);
          }
        },
        318: (e, t, r) => {
          r.d(t, { uy: () => a, h2: () => d, PB: () => c, Oi: () => s, ag: () => o, lP: () => u, JV: () => l });
          const i = require("es6-error");
          var n = r.n(i);
          class o extends n() {
            constructor(e) {
              super(e);
            }
          }
          class s extends o {
            constructor(e) {
              super(e);
            }
          }
          class a extends s {
            constructor(e) {
              super(e);
            }
          }
          class c extends o {
            constructor(e) {
              super(e);
            }
          }
          class d extends o {
            constructor(e) {
              let t = "";
              for (const [r, i] of e) t += `\nError on extension loaded from ${r}: ${String(i)}\n`;
              super(`Reload errors: ${t}`), (this.errorsBySourceDir = e);
            }
          }
          function l(e, t) {
            return r => {
              let i = !0;
              if (
                (Array.isArray(e)
                  ? (-1 === e.indexOf(r.code) && -1 === e.indexOf(r.errno)) || (i = !1)
                  : (r.code !== e && r.errno !== e) || (i = !1),
                i)
              )
                throw r;
              return t(r);
            };
          }
          function u(e, t) {
            return !(!Array.isArray(e) || -1 === e.indexOf(t.code)) || t.code === e;
          }
        },
        192: (e, t, r) => {
          r.r(t), r.d(t, { ChromiumExtensionRunner: () => v, DEFAULT_CHROME_FLAGS: () => x });
          var i = r(12),
            n = r.n(i),
            o = r(622),
            s = r.n(o);
          const a = require("fs-extra");
          var c = r.n(a),
            d = r(841),
            l = r.n(d);
          const u = require("chrome-launcher"),
            f = require("ws");
          var h = r.n(f),
            p = r(577),
            g = r(737),
            m = r(506),
            w = r(282);
          const b = (0, p.createLogger)("src/extension-runners/chromium.js"),
            y = ["--disable-extensions", "--mute-audio"],
            x = u.Launcher.defaultFlags().filter(e => !y.includes(e));
          class v {
            constructor(e) {
              n()(this, "cleanupCallbacks", void 0),
                n()(this, "params", void 0),
                n()(this, "chromiumInstance", void 0),
                n()(this, "chromiumLaunch", void 0),
                n()(this, "reloadManagerExtension", void 0),
                n()(this, "wss", void 0),
                n()(this, "exiting", void 0),
                n()(this, "_promiseSetupDone", void 0);
              const { chromiumLaunch: t = u.launch } = e;
              (this.params = e), (this.chromiumLaunch = t), (this.cleanupCallbacks = new Set());
            }
            getName() {
              return "Chromium";
            }
            async run() {
              (this._promiseSetupDone = this.setupInstance()), await this._promiseSetupDone;
            }
            static async isUserDataDir(e) {
              const t = s().join(e, "Local State"),
                r = s().join(e, "Default");
              return (await (0, w.Z)(t)) && (await (0, m.Z)(r));
            }
            static async isProfileDir(e) {
              const t = s().join(e, "Secure Preferences");
              return await (0, w.Z)(t);
            }
            static async getProfilePaths(e) {
              if (!e) return { userDataDir: null, profileDirName: null };
              if ((await v.isProfileDir(e)) && !(await v.isUserDataDir(e))) {
                const { dir: t, base: r } = s().parse(e);
                return { userDataDir: t, profileDirName: r };
              }
              return { userDataDir: e, profileDirName: null };
            }
            async setupInstance() {
              (this.wss = await new Promise(e => {
                const t = new (h().Server)({ port: 0, host: "127.0.0.1" }, () => e(t));
              })),
                this.wss.on("connection", function (e) {
                  e.on("error", e => {
                    console.log(`websocket connection error: ${e}`);
                  });
                }),
                (this.reloadManagerExtension = await this.createReloadManagerExtension());
              const e = [this.reloadManagerExtension]
                  .concat(this.params.extensions.map(({ sourceDir: e }) => e))
                  .join(","),
                { chromiumBinary: t } = this.params;
              console.log("Starting Chromium instance..."), t && console.log(`(chromiumBinary: ${t})`);
              const r = [...x];
              r.push(`--load-extension=${e}`), this.params.args && r.push(...this.params.args);
              let i,
                { userDataDir: n, profileDirName: o } = await v.getProfilePaths(this.params.chromiumProfile);
              if (n && this.params.keepProfileChanges) {
                if (o && !(await v.isUserDataDir(n)))
                  throw new Error(
                    "The profile you provided is not in a user-data-dir. The changes cannot be kept. Please either remove --keep-profile-changes or use a profile in a user-data-dir directory"
                  );
              } else if (!this.params.keepProfileChanges) {
                const e = new g.W();
                await e.create();
                const t = e.path();
                n && o ? await c().copy(s().join(n, o), s().join(t, o)) : n && (await c().copy(n, t)), (n = t);
              }
              if ((o && r.push(`--profile-directory=${o}`), this.params.startUrl)) {
                const e = Array.isArray(this.params.startUrl) ? this.params.startUrl : [this.params.startUrl];
                (i = e.shift()), r.push(...e);
              }
              (this.chromiumInstance = await this.chromiumLaunch({
                enableExtensions: !0,
                chromePath: t,
                chromeFlags: r,
                startingUrl: i,
                userDataDir: n,
                ignoreDefaultFlags: !0,
              })),
                this.chromiumInstance.process.once("close", () => {
                  (this.chromiumInstance = null),
                    this.exiting || (console.log("Exiting on Chromium instance disconnected."), this.exit());
                });
            }
            async wssBroadcast(e) {
              return new Promise(t => {
                const r = this.wss ? new Set(this.wss.clients) : new Set();
                function i() {
                  const e = this;
                  e.removeEventListener("message", n), e.removeEventListener("close", i), r.delete(e);
                }
                const n = async e => {
                  if ("webExtReloadExtensionComplete" === JSON.parse(e.data).type) {
                    for (const e of r) i.call(e);
                    t();
                  }
                };
                for (const t of r)
                  t.readyState === h().OPEN
                    ? (t.addEventListener("message", n), t.addEventListener("close", i), t.send(JSON.stringify(e)))
                    : r.delete(t);
                0 === r.size && t();
              });
            }
            async createReloadManagerExtension() {
              const e = new g.W();
              await e.create(), this.registerCleanup(() => e.remove());
              const t = s().join(e.path(), `reload-manager-extension-${Date.now()}`);
              console.log(`Creating reload-manager-extension in ${t}`),
                await l()(t),
                await c().writeFile(
                  s().join(t, "manifest.json"),
                  JSON.stringify({
                    manifest_version: 2,
                    name: "web-ext Reload Manager Extension",
                    version: "1.0",
                    permissions: ["management", "tabs"],
                    background: { scripts: ["bg.js"] },
                  })
                );
              const r = this.wss.address(),
                i = `(function bgPage() {\n      async function getAllDevExtensions() {\n        const allExtensions = await new Promise(\n          r => chrome.management.getAll(r));\n\n        return allExtensions.filter((extension) => {\n          return extension.enabled &&\n            extension.installType === "development" &&\n            extension.id !== chrome.runtime.id;\n        });\n      }\n\n      const setEnabled = (extensionId, value) =>\n        chrome.runtime.id == extensionId ?\n        new Promise.resolve() :\n        new Promise(r => chrome.management.setEnabled(extensionId, value, r));\n\n      async function reloadExtension(extensionId) {\n        await setEnabled(extensionId, false);\n        await setEnabled(extensionId, true);\n      }\n\n      const ws = new window.WebSocket(\n        "ws://${r.address}:${r.port}");\n\n      ws.onmessage = async (evt) => {\n        const msg = JSON.parse(evt.data);\n        if (msg.type === 'webExtReloadAllExtensions') {\n          const devExtensions = await getAllDevExtensions();\n          await Promise.all(devExtensions.map(ext => reloadExtension(ext.id)));\n          ws.send(JSON.stringify({ type: 'webExtReloadExtensionComplete' }));\n        }\n      };\n    })()`;
              return await c().writeFile(s().join(t, "bg.js"), i), t;
            }
            async reloadAllExtensions() {
              const e = this.getName();
              return (
                await this.wssBroadcast({ type: "webExtReloadAllExtensions" }),
                process.stdout.write(`\rLast extension reload: ${new Date().toTimeString()}`),
                console.log("\n"),
                [{ runnerName: e }]
              );
            }
            async reloadExtensionBySourceDir(e) {
              return this.reloadAllExtensions();
            }
            registerCleanup(e) {
              this.cleanupCallbacks.add(e);
            }
            async exit() {
              (this.exiting = !0),
                this._promiseSetupDone &&
                  (await this._promiseSetupDone.catch(e => {
                    console.log(`ignored setup error on chromium runner shutdown: ${e}`);
                  })),
                this.chromiumInstance && (await this.chromiumInstance.kill(), (this.chromiumInstance = null)),
                this.wss && (await new Promise(e => (this.wss ? this.wss.close(e) : e())), (this.wss = null));
              for (const e of this.cleanupCallbacks)
                try {
                  e();
                } catch (e) {
                  console.log(e);
                }
            }
          }
        },
        766: (e, t, r) => {
          r.r(t), r.d(t, { FirefoxAndroidExtensionRunner: () => b });
          var i = r(12),
            n = r.n(i),
            o = r(622),
            s = r.n(o),
            a = r(58),
            c = r.n(a),
            d = r(737),
            l = r(466),
            u = (r(227), r(318)),
            f = (r(283), r(735)),
            h = r(577),
            p = r(61);
          const g = (0, h.createLogger)("src/extension-runners/firefox-android.js"),
            m = {
              profilePath: "--profile-path",
              keepProfileChanges: "--keep-profile-changes",
              browserConsole: "--browser-console",
              preInstall: "--pre-install",
              startUrl: "--start-url",
              args: "--args",
            },
            w = "127.0.0.1";
          class b {
            constructor(e) {
              n()(this, "params", void 0),
                n()(this, "adbUtils", void 0),
                n()(this, "exiting", void 0),
                n()(this, "selectedAdbDevice", void 0),
                n()(this, "selectedFirefoxApk", void 0),
                n()(this, "selectedArtifactsDir", void 0),
                n()(this, "selectedRDPSocketFile", void 0),
                n()(this, "selectedTCPPort", void 0),
                n()(this, "cleanupCallbacks", void 0),
                n()(this, "adbExtensionsPathBySourceDir", void 0),
                n()(this, "reloadableExtensions", void 0),
                n()(this, "remoteFirefox", void 0),
                (this.params = e),
                (this.cleanupCallbacks = new Set()),
                (this.adbExtensionsPathBySourceDir = new Map()),
                (this.reloadableExtensions = new Map()),
                this.printIgnoredParamsWarnings();
            }
            async run() {
              const { adbBin: e, adbHost: t = w, adbPort: r, ADBUtils: i = l.default } = this.params;
              (this.adbUtils = new i({ adbBin: e, adbHost: t, adbPort: r })),
                await this.adbDevicesDiscoveryAndSelect(),
                await this.apkPackagesDiscoveryAndSelect(),
                await this.adbCheckRuntimePermissions(),
                await this.adbForceStopSelectedPackage(),
                await this.adbPrepareProfileDir(),
                await Promise.all([
                  this.adbStartSelectedPackage(),
                  this.buildAndPushExtensions(),
                  this.adbDiscoveryAndForwardRDPUnixSocket(),
                ]),
                await this.rdpInstallExtensions();
            }
            getName() {
              return "Firefox Android";
            }
            async reloadAllExtensions() {
              const e = this.getName(),
                t = new Map();
              for (const { sourceDir: e } of this.params.extensions) {
                const [r] = await this.reloadExtensionBySourceDir(e);
                r.reloadError instanceof Error && t.set(e, r.reloadError);
              }
              return t.size > 0 ? [{ runnerName: e, reloadError: new u.h2(t) }] : [{ runnerName: e }];
            }
            async reloadExtensionBySourceDir(e) {
              const t = this.getName(),
                r = this.reloadableExtensions.get(e);
              if (!r)
                return [
                  {
                    sourceDir: e,
                    reloadError: new u.ag(`Extension not reloadable: no addonId has been mapped to "${e}"`),
                    runnerName: t,
                  },
                ];
              try {
                await this.buildAndPushExtension(e), await this.remoteFirefox.reloadAddon(r);
              } catch (r) {
                return [{ sourceDir: e, reloadError: r, runnerName: t }];
              }
              return [{ runnerName: t, sourceDir: e }];
            }
            registerCleanup(e) {
              this.cleanupCallbacks.add(e);
            }
            async exit() {
              const { adbUtils: e, selectedAdbDevice: t, selectedArtifactsDir: r } = this;
              (this.exiting = !0),
                await this.adbForceStopSelectedPackage(),
                r &&
                  (console.log("Cleaning up artifacts directory on the Android device..."),
                  await e.clearArtifactsDir(t));
              for (const e of this.cleanupCallbacks)
                try {
                  e();
                } catch (e) {
                  console.log(e);
                }
            }
            getDeviceProfileDir() {
              return `${this.selectedArtifactsDir}/profile`;
            }
            printIgnoredParamsWarnings() {
              Object.keys(m).forEach(e => {
                this.params[e] && console.log(`The Firefox for Android target does not support ${m[e]}`);
              });
            }
            async adbDevicesDiscoveryAndSelect() {
              const { adbUtils: e } = this,
                { adbDevice: t } = this.params;
              let r = [];
              if ((console.log("Listing android devices"), (r = await e.discoverDevices()), 0 === r.length))
                throw new u.Oi(
                  "No Android device found through ADB. Make sure the device is connected and USB debugging is enabled."
                );
              if (!t) {
                const e = r.map(e => ` - ${e}`).join("\n");
                throw (
                  (console.log(`\nAndroid devices found:\n${e}`),
                  new u.Oi("Select an android device using --android-device=<name>"))
                );
              }
              const i = r.filter(e => e === t);
              if (0 === i.length) {
                const e = JSON.stringify(r);
                throw new u.Oi(`Android device ${t} was not found in list: ${e}`);
              }
              (this.selectedAdbDevice = i[0]), console.log(`Selected ADB device: ${this.selectedAdbDevice}`);
            }
            async apkPackagesDiscoveryAndSelect() {
              const {
                  adbUtils: e,
                  selectedAdbDevice: t,
                  params: { firefoxApk: r },
                } = this,
                i = await e.discoverInstalledFirefoxAPKs(t, r);
              if (0 === i.length) throw new u.Oi("No Firefox packages were found on the selected Android device");
              const n = e => e.map(e => ` - ${e}`).join("\n");
              if (!r) {
                if ((console.log(`\nPackages found:\n${n(i)}`), i.length > 1))
                  throw new u.Oi("Select one of the packages using --firefox-apk");
                return (
                  (this.selectedFirefoxApk = i[0]),
                  void console.log(`Selected Firefox for Android APK: ${this.selectedFirefoxApk}`)
                );
              }
              const o = i.filter(e => e === r);
              if (0 === o.length) {
                const e = n(o);
                throw new u.Oi(`Package ${r} was not found in list: ${e}`);
              }
              (this.selectedFirefoxApk = o[0]),
                console.log(`Selected Firefox for Android APK: ${this.selectedFirefoxApk}`);
            }
            async adbForceStopSelectedPackage() {
              const { adbUtils: e, selectedAdbDevice: t, selectedFirefoxApk: r } = this;
              console.log(`Stopping existing instances of ${r}...`), await e.amForceStopAPK(t, r);
            }
            async adbCheckRuntimePermissions() {
              const { adbUtils: e, selectedAdbDevice: t, selectedFirefoxApk: r } = this;
              console.log(`Discovering Android version for ${t}...`);
              const i = await e.getAndroidVersionNumber(t);
              if ("number" != typeof i || Number.isNaN(i)) throw new u.ag(`Invalid Android version: ${i}`);
              console.log(`Detected Android version ${i}`),
                i < 23 ||
                  (console.log(`Checking read/write permissions needed for web-exton ${r}...`),
                  await e.ensureRequiredAPKRuntimePermissions(t, r, ["android.permission.READ_EXTERNAL_STORAGE"]));
            }
            async adbPrepareProfileDir() {
              const {
                adbUtils: e,
                selectedAdbDevice: t,
                selectedFirefoxApk: r,
                params: { customPrefs: i, firefoxApp: n, adbRemoveOldArtifacts: o },
              } = this;
              console.log(`Preparing a temporary profile for ${r}...`);
              const a = await n.createProfile({ app: "fennec", customPrefs: i });
              (await e.detectOrRemoveOldArtifacts(t, o)) &&
                (o
                  ? console.log(`Old web-ext artifacts have been found and removed from ${t} device`)
                  : console.log(
                      `Old artifacts directories have been found on ${t} device. Use --adb-remove-old-artifacts to remove them automatically.`
                    )),
                (this.selectedArtifactsDir = await e.getOrCreateArtifactsDir(t));
              const c = this.getDeviceProfileDir();
              await e.runShellCommand(t, ["mkdir", "-p", c]),
                await e.pushFile(t, s().join(a.profileDir, "user.js"), `${c}/user.js`),
                console.log(`Created temporary profile at ${c}.`);
            }
            async adbStartSelectedPackage() {
              const {
                  adbUtils: e,
                  selectedFirefoxApk: t,
                  selectedAdbDevice: r,
                  params: { firefoxApkComponent: i },
                } = this,
                n = this.getDeviceProfileDir();
              console.log(`Starting ${t}...`),
                console.log(`Using profile ${n} (ignored by Fenix)`),
                await e.startFirefoxAPK(r, t, i, n);
            }
            async buildAndPushExtension(e) {
              const {
                adbUtils: t,
                selectedAdbDevice: r,
                selectedArtifactsDir: i,
                params: { buildSourceDir: n },
              } = this;
              await (0, d._)(async o => {
                const { extensionPath: a } = await n(e, o.path()),
                  c = s().basename(a, ".zip");
                let d = this.adbExtensionsPathBySourceDir.get(e);
                d || (d = `${i}/${c}.xpi`),
                  console.log(`Uploading ${c} on the android device`),
                  await t.pushFile(r, a, d),
                  console.log(`Upload completed: ${d}`),
                  this.adbExtensionsPathBySourceDir.set(e, d);
              });
            }
            async buildAndPushExtensions() {
              for (const { sourceDir: e } of this.params.extensions) await this.buildAndPushExtension(e);
            }
            async adbDiscoveryAndForwardRDPUnixSocket() {
              const {
                  adbUtils: e,
                  selectedAdbDevice: t,
                  selectedFirefoxApk: r,
                  params: { adbDiscoveryTimeout: i },
                } = this,
                n = this.params.stdin || process.stdin,
                { unixSocketDiscoveryRetryInterval: o } = b;
              let { unixSocketDiscoveryMaxTime: s } = b;
              "number" == typeof i && (s = i);
              const a = (t, r) => {
                r.ctrl && "c" === r.name && e.setUserAbortDiscovery(!0);
              };
              (0, p._)(n) && (c().emitKeypressEvents(n), (0, p.k)(n, !0), n.on("keypress", a));
              try {
                this.selectedRDPSocketFile = await e.discoverRDPUnixSocket(t, r, {
                  maxDiscoveryTime: s,
                  retryInterval: o,
                });
              } finally {
                (0, p._)(n) && n.removeListener("keypress", a);
              }
              console.log(`RDP Socket File selected: ${this.selectedRDPSocketFile}`);
              const d = await (0, f.Ki)();
              console.log(`You can connect to this Android device on TCP port ${d}`);
              const l = this.selectedRDPSocketFile.startsWith("@")
                ? `localabstract:${this.selectedRDPSocketFile.substr(1)}`
                : `localfilesystem:${this.selectedRDPSocketFile}`;
              await e.setupForward(t, l, `tcp:${d}`), (this.selectedTCPPort = d);
            }
            async rdpInstallExtensions() {
              const {
                  selectedTCPPort: e,
                  params: { extensions: t, firefoxClient: r },
                } = this,
                i = (this.remoteFirefox = await r({ port: e }));
              i.client.on("end", () => {
                this.exiting ||
                  (console.log("Exiting the device because Firefox for Android disconnected"), this.exit());
              });
              for (const e of t) {
                const { sourceDir: t } = e,
                  r = this.adbExtensionsPathBySourceDir.get(t);
                if (!r) throw new u.ag(`ADB extension path for "${t}" was unexpectedly empty`);
                const n = await i.installTemporaryAddon(r).then(e => e.addon.id);
                if (!n) throw new u.ag(`Received an empty addonId from remoteFirefox.installTemporaryAddon("${r}")`);
                this.reloadableExtensions.set(e.sourceDir, n);
              }
            }
          }
          n()(b, "unixSocketDiscoveryRetryInterval", 3e3), n()(b, "unixSocketDiscoveryMaxTime", 18e4);
        },
        236: (e, t, r) => {
          r.r(t), r.d(t, { FirefoxDesktopExtensionRunner: () => a });
          var i = r(12),
            n = r.n(i),
            o = r(318);
          r(283), r(735);
          const s = (0, r(577).createLogger)("src/extension-runners/firefox-desktop.js");
          class a {
            constructor(e) {
              n()(this, "cleanupCallbacks", void 0),
                n()(this, "params", void 0),
                n()(this, "profile", void 0),
                n()(this, "reloadableExtensions", void 0),
                n()(this, "remoteFirefox", void 0),
                n()(this, "runningInfo", void 0),
                (this.params = e),
                (this.reloadableExtensions = new Map()),
                (this.cleanupCallbacks = new Set());
            }
            getName() {
              return "Firefox Desktop";
            }
            async run() {
              await this.setupProfileDir(), await this.startFirefoxInstance();
            }
            async reloadAllExtensions() {
              const e = this.getName(),
                t = new Map();
              for (const { sourceDir: e } of this.params.extensions) {
                const [r] = await this.reloadExtensionBySourceDir(e);
                r.reloadError instanceof Error && t.set(e, r.reloadError);
              }
              return t.size > 0 ? [{ runnerName: e, reloadError: new o.h2(t) }] : [{ runnerName: e }];
            }
            async reloadExtensionBySourceDir(e) {
              const t = this.getName(),
                r = this.reloadableExtensions.get(e);
              if (!r)
                return [
                  {
                    sourceDir: e,
                    reloadError: new o.ag(`Extension not reloadable: no addonId has been mapped to "${e}"`),
                    runnerName: t,
                  },
                ];
              try {
                await this.remoteFirefox.reloadAddon(r);
              } catch (r) {
                return [{ sourceDir: e, reloadError: r, runnerName: t }];
              }
              return [{ runnerName: t, sourceDir: e }];
            }
            registerCleanup(e) {
              this.cleanupCallbacks.add(e);
            }
            async exit() {
              if (!this.runningInfo || !this.runningInfo.firefox)
                throw new o.ag("No firefox instance is currently running");
              this.runningInfo.firefox.kill();
            }
            async setupProfileDir() {
              const {
                customPrefs: e,
                extensions: t,
                keepProfileChanges: r,
                preInstall: i,
                profilePath: n,
                firefoxApp: o,
              } = this.params;
              if (
                (n
                  ? r
                    ? (console.log(`Using Firefox profile from ${n}`),
                      (this.profile = await o.useProfile(n, { customPrefs: e })))
                    : (console.log(`Copying Firefox profile from ${n}`),
                      (this.profile = await o.copyProfile(n, { customPrefs: e })))
                  : (console.log("Creating new Firefox profile"),
                    (this.profile = await o.createProfile({ customPrefs: e }))),
                i)
              )
                for (const e of t)
                  await o.installExtension({
                    asProxy: !0,
                    extensionPath: e.sourceDir,
                    manifestData: e.manifestData,
                    profile: this.profile,
                  });
            }
            async startFirefoxInstance() {
              const {
                  browserConsole: e,
                  extensions: t,
                  firefoxBinary: r,
                  preInstall: i,
                  startUrl: n,
                  firefoxApp: a,
                  firefoxClient: c,
                  args: d,
                } = this.params,
                l = [];
              if ((e && l.push("-jsconsole"), n)) {
                const e = Array.isArray(n) ? n : [n];
                for (const t of e) l.push("--url", t);
              }
              if (
                (d && l.push(...d),
                (this.runningInfo = await a.run(this.profile, { firefoxBinary: r, binaryArgs: l })),
                this.runningInfo.firefox.on("close", () => {
                  for (const e of this.cleanupCallbacks)
                    try {
                      e();
                    } catch (e) {
                      console.log(`Exception on executing cleanup callback: ${e}`);
                    }
                }),
                !i)
              ) {
                const e = (this.remoteFirefox = await c({ port: this.runningInfo.debuggerPort }));
                for (const r of t)
                  try {
                    const t = await e.installTemporaryAddon(r.sourceDir).then(e => e.addon.id);
                    if (!t) throw new o.ag("Unexpected missing addonId in the installAsTemporaryAddon result");
                    this.reloadableExtensions.set(r.sourceDir, t);
                  } catch (e) {
                    throw e instanceof o.PB
                      ? (console.log(`Caught: ${e}`),
                        new o.ag(
                          "Temporary add-on installation is not supported in this version of Firefox (you need Firefox 49 or higher). For older Firefox versions, use --pre-install"
                        ))
                      : e;
                  }
              }
            }
          }
        },
        283: (e, t, r) => {
          r.r(t),
            r.d(t, {
              configureProfile: () => F,
              copyProfile: () => O,
              createProfile: () => C,
              defaultCreateProfileFinder: () => k,
              defaultFirefoxEnv: () => P,
              installExtension: () => R,
              isDefaultProfile: () => E,
              run: () => $,
              useProfile: () => S,
            });
          var i = r(747),
            n = r.n(i),
            o = r(622),
            s = r.n(o),
            a = r(669);
          const c = require("fx-runner");
          var d = r.n(c);
          const l = require("firefox-profile");
          var u = r.n(l),
            f = r(615),
            h = r(849),
            p = r.n(h),
            g = r(506),
            m = r(318),
            w = r(702),
            b = r(515),
            y = r(735);
          const x = (0, r(577).createLogger)("src/firefox/index.js"),
            v = f.fs.stat.bind(f.fs),
            D = u().copyFromUserProfile,
            P = { XPCOM_DEBUG_BREAK: "stack", NS_TRACE_MALLOC_DISABLE_STACKS: "1" };
          async function $(e, { fxRunner: t = d(), findRemotePort: r = y.Ki, firefoxBinary: i, binaryArgs: n } = {}) {
            console.log(`Running Firefox with profile at ${e.path()}`);
            const o = await r(),
              s = await t({
                binary: i,
                "binary-args": n,
                "no-remote": !0,
                listen: o,
                foreground: !0,
                profile: e.path(),
                env: { ...process.env, ...P },
                verbose: !0,
              }),
              a = s.process;
            return (
              console.log(`Executing Firefox binary: ${s.binary}`),
              console.log(`Firefox args: ${s.args.join(" ")}`),
              a.on("error", e => {
                throw (console.log(`Firefox error: ${e}`), e);
              }),
              console.log("Use --verbose or open Tools > Web Developer > Browser Console to see logging"),
              a.stderr.on("data", e => {
                console.log(`Firefox stderr: ${e.toString().trim()}`);
              }),
              a.stdout.on("data", e => {
                console.log(`Firefox stdout: ${e.toString().trim()}`);
              }),
              a.on("close", () => {
                console.log("Firefox closed");
              }),
              { firefox: a, debuggerPort: o }
            );
          }
          const A = ["default", "dev-edition-default"];
          async function E(e, t = u().Finder, r = f.fs.stat) {
            if (A.includes(e)) return !0;
            const i = t.locateUserDirectory(),
              n = s().join(i, "profiles.ini");
            try {
              await r(n);
            } catch (e) {
              if ((0, m.lP)("ENOENT", e)) return console.log(`profiles.ini not found: ${e}`), !1;
              throw e;
            }
            const o = new t(i),
              c = (0, a.promisify)((...e) => o.readProfiles(...e));
            await c();
            const d = s().normalize(s().join(s().resolve(e), s().sep));
            for (const t of o.profiles)
              if (A.includes(t.Name) || "1" === t.Default) {
                let r;
                if (t.Name === e) return !0;
                if (
                  ((r = "1" === t.IsRelative ? s().join(i, t.Path, s().sep) : s().join(t.Path, s().sep)),
                  s().normalize(r) === d)
                )
                  return !0;
              }
            return !1;
          }
          function F(e, { app: t = "firefox", getPrefs: r = w.Ft, customPrefs: i = {} } = {}) {
            const n = r(t);
            if (
              (Object.keys(n).forEach(t => {
                e.setPreference(t, n[t]);
              }),
              Object.keys(i).length > 0)
            ) {
              const t = JSON.stringify(i, null, 2);
              console.log(`Setting custom Firefox preferences: ${t}`),
                Object.keys(i).forEach(t => {
                  e.setPreference(t, i[t]);
                });
            }
            return e.updatePreferences(), Promise.resolve(e);
          }
          function k({ userDirectoryPath: e, FxProfile: t = u() } = {}) {
            const r = new t.Finder(e),
              i = (0, a.promisify)((...e) => r.readProfiles(...e)),
              n = (0, a.promisify)((...e) => r.getPath(...e));
            return async e => {
              try {
                if ((await i(), 0 !== r.profiles.filter(t => t.Name === e).length)) return await n(e);
              } catch (e) {
                if (!(0, m.lP)("ENOENT", e)) throw e;
                console.log("Unable to find Firefox profiles.ini");
              }
            };
          }
          async function S(
            e,
            {
              app: t,
              configureThisProfile: r = F,
              isFirefoxDefaultProfile: i = E,
              customPrefs: n = {},
              createProfileFinder: o = k,
            } = {}
          ) {
            if (await i(e))
              throw new m.Oi(
                `Cannot use --keep-profile-changes on a default profile ("${e}") because web-ext will make it insecure and unsuitable for daily use.\nSee https://github.com/mozilla/web-ext/issues/1005`
              );
            let s;
            const a = o();
            if (await (0, g.Z)(e)) console.log(`Using profile directory "${e}"`), (s = e);
            else if ((console.log(`Assuming ${e} is a named profile`), (s = await a(e)), !s))
              throw new m.Oi(`The request "${e}" profile name cannot be resolved to a profile path`);
            const c = new (u())({ destinationDirectory: s });
            return await r(c, { app: t, customPrefs: n });
          }
          async function C({ app: e, configureThisProfile: t = F, customPrefs: r = {} } = {}) {
            const i = new (u())();
            return await t(i, { app: e, customPrefs: r });
          }
          async function O(
            e,
            { app: t, configureThisProfile: r = F, copyFromUserProfile: i = D, customPrefs: n = {} } = {}
          ) {
            const o = (0, a.promisify)(u().copy),
              s = (0, a.promisify)(i);
            try {
              let i;
              return (
                (await (0, g.Z)(e))
                  ? (console.log(`Copying profile directory from "${e}"`), (i = await o({ profileDirectory: e })))
                  : (console.log(`Assuming ${e} is a named profile`), (i = await s({ name: e }))),
                r(i, { app: t, customPrefs: n })
              );
            } catch (t) {
              throw new m.ag(`Could not copy Firefox profile from ${e}: ${t}`);
            }
          }
          async function R({ asProxy: e = !1, manifestData: t, profile: r, extensionPath: i, asyncFsStat: o = v }) {
            if (!r.extensionsDir) throw new m.ag("profile.extensionsDir was unexpectedly empty");
            try {
              await o(r.extensionsDir);
            } catch (e) {
              if (!(0, m.lP)("ENOENT", e)) throw e;
              console.log(`Creating extensions directory: ${r.extensionsDir}`), await f.fs.mkdir(r.extensionsDir);
            }
            const a = (0, b.L)(t);
            if (!a)
              throw new m.Oi(
                "An explicit extension ID is required when installing to a profile (applications.gecko.id not found in manifest.json)"
              );
            if (e) {
              if ((console.log(`Installing as an extension proxy; source: ${i}`), !(await (0, g.Z)(i))))
                throw new m.ag(`proxy install: extensionPath must be the extension source directory; got: ${i}`);
              const e = s().join(r.extensionsDir, `${a}`),
                t = n().createWriteStream(e);
              return t.write(i), t.end(), await p()(t, "close");
            }
            {
              const e = n().createReadStream(i),
                t = s().join(r.extensionsDir, `${a}.xpi`),
                o = n().createWriteStream(t);
              return (
                console.log(`Installing extension from ${i} to ${t}`),
                e.pipe(o),
                await Promise.all([p()(e, "close"), p()(o, "close")])
              );
            }
          }
        },
        702: (e, t, r) => {
          r.d(t, { Ft: () => c, gO: () => d });
          var i = r(318);
          const n = (0, r(577).createLogger)("src/firefox/preferences.js"),
            o = [
              "devtools.debugger.remote-enabled",
              "devtools.debugger.prompt-connection",
              "xpinstall.signatures.required",
            ],
            s = {
              "browser.dom.window.dump.enabled": !0,
              "datareporting.policy.dataSubmissionEnabled": !1,
              "devtools.debugger.remote-enabled": !0,
              "devtools.debugger.prompt-connection": !1,
              "devtools.browserconsole.contentMessages": !0,
              "extensions.logging.enabled": !1,
              "extensions.checkCompatibility.nightly": !1,
              "extensions.update.enabled": !1,
              "extensions.update.notifyUser": !1,
              "extensions.enabledScopes": 5,
              "extensions.getAddons.cache.enabled": !1,
              "extensions.installDistroAddons": !1,
              "extensions.autoDisableScopes": 10,
              "app.update.enabled": !1,
              "xpinstall.signatures.required": !1,
              "browser.link.open_newwindow": 3,
            },
            a = {
              common: s,
              fennec: {
                "browser.console.showInPanel": !0,
                "browser.firstrun.show.uidiscovery": !1,
                "devtools.remote.usb.enabled": !0,
              },
              firefox: {
                "browser.startup.homepage": "about:blank",
                "startup.homepage_welcome_url": "about:blank",
                "startup.homepage_welcome_url.additional": "",
                "devtools.errorconsole.enabled": !0,
                "devtools.chrome.enabled": !0,
                "urlclassifier.updateinterval": 172800,
                "browser.safebrowsing.provider.0.gethashURL": "http://localhost/safebrowsing-dummy/gethash",
                "browser.safebrowsing.provider.0.keyURL": "http://localhost/safebrowsing-dummy/newkey",
                "browser.safebrowsing.provider.0.updateURL": "http://localhost/safebrowsing-dummy/update",
                "browser.selfsupport.url": "https://localhost/selfrepair",
                "browser.reader.detectedFirstArticle": !0,
                "datareporting.policy.firstRunURL": "",
              },
            };
          function c(e = "firefox") {
            const t = a[e];
            if (!t) throw new i.ag(`Unsupported application: ${e}`);
            return { ...s, ...t };
          }
          function d(e) {
            const t = {};
            for (const r of e) {
              const e = r.split("=");
              if (e.length < 2)
                throw new i.Oi(`Incomplete custom preference: "${r}". Syntax expected: "prefname=prefvalue".`);
              const s = e[0];
              let a = e.slice(1).join("=");
              if (/[^\w{@}.-]/.test(s)) throw new i.Oi(`Invalid custom preference name: ${s}`);
              a === `${parseInt(a)}` ? (a = parseInt(a, 10)) : ("true" !== a && "false" !== a) || (a = "true" === a),
                o.includes(s) ? console.log(`'${s}' preference cannot be customized.`) : (t[`${s}`] = a);
            }
            return t;
          }
        },
        735: (e, t, r) => {
          r.d(t, { w8: () => x, Ki: () => v });
          var i = r(12),
            n = r.n(i);
          const o = require("net");
          var s = r.n(o);
          const a = require("events");
          var c = r.n(a);
          const d = require("domain");
          var l = r.n(d);
          const u = new Set([
            "tabNavigated",
            "styleApplied",
            "propertyChange",
            "networkEventUpdate",
            "networkEvent",
            "propertyChange",
            "newMutations",
            "frameUpdate",
            "tabListChanged",
          ]);
          function f(e) {
            const t = new h();
            return t.connect(e).then(() => t);
          }
          class h extends c() {
            constructor() {
              super(),
                n()(this, "_incoming", void 0),
                n()(this, "_pending", void 0),
                n()(this, "_active", void 0),
                n()(this, "_rdpConnection", void 0),
                n()(this, "_onData", void 0),
                n()(this, "_onError", void 0),
                n()(this, "_onEnd", void 0),
                n()(this, "_onTimeout", void 0),
                (this._incoming = Buffer.alloc(0)),
                (this._pending = []),
                (this._active = new Map()),
                (this._onData = (...e) => this.onData(...e)),
                (this._onError = (...e) => this.onError(...e)),
                (this._onEnd = (...e) => this.onEnd(...e)),
                (this._onTimeout = (...e) => this.onTimeout(...e));
            }
            connect(e) {
              return new Promise((t, r) => {
                const i = l().create();
                i.once("error", r),
                  i.run(() => {
                    const i = s().createConnection({ port: e, host: "127.0.0.1" });
                    (this._rdpConnection = i),
                      i.on("data", this._onData),
                      i.on("error", this._onError),
                      i.on("end", this._onEnd),
                      i.on("timeout", this._onTimeout),
                      this._expectReply("root", { resolve: t, reject: r });
                  });
              });
            }
            disconnect() {
              if (!this._rdpConnection) return;
              const e = this._rdpConnection;
              e.off("data", this._onData),
                e.off("error", this._onError),
                e.off("end", this._onEnd),
                e.off("timeout", this._onTimeout),
                e.end(),
                this._rejectAllRequests(new Error("RDP connection closed"));
            }
            _rejectAllRequests(e) {
              for (const t of this._active.values()) t.reject(e);
              this._active.clear();
              for (const { deferred: t } of this._pending) t.reject(e);
              this._pending = [];
            }
            async request(e) {
              let t;
              if (((t = "string" == typeof e ? { to: "root", type: e } : e), null == t.to))
                throw new Error(`Unexpected RDP request without target actor: ${t.type}`);
              return new Promise((e, r) => {
                const i = { resolve: e, reject: r };
                this._pending.push({ request: t, deferred: i }), this._flushPendingRequests();
              });
            }
            _flushPendingRequests() {
              this._pending = this._pending.filter(({ request: e, deferred: t }) => {
                if (this._active.has(e.to)) return !0;
                const r = this._rdpConnection;
                if (!r) throw new Error("RDP connection closed");
                try {
                  let i = JSON.stringify(e);
                  (i = `${Buffer.from(i).length}:${i}`), r.write(i), this._expectReply(e.to, t);
                } catch (e) {
                  t.reject(e);
                }
                return !1;
              });
            }
            _expectReply(e, t) {
              if (this._active.has(e)) throw new Error(`${e} does already have an active request`);
              this._active.set(e, t);
            }
            _handleMessage(e) {
              if (null == e.from)
                return e.error
                  ? void this.emit("rdp-error", e)
                  : void this.emit(
                      "error",
                      new Error(`Received an RDP message without a sender actor: ${JSON.stringify(e)}`)
                    );
              if (u.has(e.type)) this.emit("unsolicited-event", e);
              else {
                if (this._active.has(e.from)) {
                  const t = this._active.get(e.from);
                  return (
                    this._active.delete(e.from),
                    e.error ? null == t || t.reject(e) : null == t || t.resolve(e),
                    void this._flushPendingRequests()
                  );
                }
                this.emit("error", new Error(`Unexpected RDP message received: ${JSON.stringify(e)}`));
              }
            }
            _readMessage() {
              const {
                data: e,
                rdpMessage: t,
                error: r,
                fatal: i,
              } = (function (e) {
                const t = e.toString(),
                  r = t.indexOf(":");
                if (r < 1) return { data: e };
                const i = parseInt(t.slice(0, r));
                if (isNaN(i)) return { data: e, error: new Error("Error parsing RDP message length"), fatal: !0 };
                if (e.length - (r + 1) < i) return { data: e };
                const n = (e = e.slice(r + 1)).slice(0, i);
                e = e.slice(i);
                try {
                  return { data: e, rdpMessage: JSON.parse(n.toString()) };
                } catch (t) {
                  return { data: e, error: t, fatal: !1 };
                }
              })(this._incoming);
              return (
                (this._incoming = e),
                r
                  ? (this.emit("error", new Error(`Error parsing RDP packet: ${String(r)}`)),
                    i && this.disconnect(),
                    !i)
                  : !!t && (this._handleMessage(t), !0)
              );
            }
            onData(e) {
              for (this._incoming = Buffer.concat([this._incoming, e]); this._readMessage(); );
            }
            onError(e) {
              this.emit("error", e);
            }
            onEnd() {
              this.emit("end");
            }
            onTimeout() {
              this.emit("timeout");
            }
          }
          var p = r(577),
            g = r(318);
          const m = (0, p.createLogger)("src/firefox/remote.js");
          function w(e) {
            return e instanceof Error ? String(e) : `${e.error}: ${e.message}`;
          }
          class b {
            constructor(e) {
              n()(this, "client", void 0),
                n()(this, "checkedForAddonReloading", void 0),
                (this.client = e),
                (this.checkedForAddonReloading = !1),
                e.on("disconnect", () => {
                  console.log('Received "disconnect" from Firefox client');
                }),
                e.on("end", () => {
                  console.log('Received "end" from Firefox client');
                }),
                e.on("unsolicited-event", e => {
                  console.log(`Received message from client: ${JSON.stringify(e)}`);
                }),
                e.on("rdp-error", e => {
                  console.log(`Received error from client: ${JSON.stringify(e)}`);
                }),
                e.on("error", e => {
                  console.log(`Received error from client: ${String(e)}`);
                });
            }
            disconnect() {
              this.client.disconnect();
            }
            async addonRequest(e, t) {
              try {
                return await this.client.request({ to: e.actor, type: t });
              } catch (e) {
                console.log(`Client responded to '${t}' request with error:`, e);
                const r = w(e);
                throw new g.ag(`Remote Firefox: addonRequest() error: ${r}`);
              }
            }
            async getAddonsActor() {
              try {
                const e = await this.client.request("getRoot");
                return null == e.addonsActor
                  ? Promise.reject(
                      new g.PB("This version of Firefox does not provide an add-ons actor for remote installation.")
                    )
                  : e.addonsActor;
              } catch (e) {
                console.log("Falling back to listTabs because getRoot failed", e);
              }
              try {
                const e = await this.client.request("listTabs");
                return null == e.addonsActor
                  ? (console.log(`listTabs returned a falsey addonsActor: ${JSON.stringify(e)}`),
                    Promise.reject(
                      new g.PB(
                        "This is an older version of Firefox that does not provide an add-ons actor for remote installation. Try Firefox 49 or higher."
                      )
                    ))
                  : e.addonsActor;
              } catch (e) {
                console.log("listTabs error", e);
                const t = w(e);
                throw new g.ag(`Remote Firefox: listTabs() error: ${t}`);
              }
            }
            async installTemporaryAddon(e) {
              const t = await this.getAddonsActor();
              try {
                const r = await this.client.request({ to: t, type: "installTemporaryAddon", addonPath: e });
                return (
                  console.log(`installTemporaryAddon: ${JSON.stringify(r)}`),
                  console.log(`Installed ${e} as a temporary add-on`),
                  r
                );
              } catch (e) {
                const t = w(e);
                throw new g.ag(`installTemporaryAddon: Error: ${t}`);
              }
            }
            async getInstalledAddon(e) {
              try {
                const t = await this.client.request("listAddons");
                for (const r of t.addons) if (r.id === e) return r;
                return (
                  console.log(`Remote Firefox has these addons: ${t.addons.map(e => e.id)}`),
                  Promise.reject(new g.ag("The remote Firefox does not have your extension installed"))
                );
              } catch (e) {
                const t = w(e);
                throw new g.ag(`Remote Firefox: listAddons() error: ${t}`);
              }
            }
            async checkForAddonReloading(e) {
              if (this.checkedForAddonReloading) return e;
              {
                const t = await this.addonRequest(e, "requestTypes");
                if (-1 === t.requestTypes.indexOf("reload")) {
                  const e = JSON.stringify(t.requestTypes);
                  throw (
                    (console.log(`Remote Firefox only supports: ${e}`),
                    new g.Oi("This Firefox version does not support add-on reloading. Re-run with --no-reload"))
                  );
                }
                return (this.checkedForAddonReloading = !0), e;
              }
            }
            async reloadAddon(e) {
              const t = await this.getInstalledAddon(e);
              await this.checkForAddonReloading(t),
                await this.addonRequest(t, "reload"),
                process.stdout.write(`\rLast extension reload: ${new Date().toTimeString()}`),
                console.log("\n");
            }
          }
          async function y(e, { connectToFirefox: t = f } = {}) {
            console.log(`Connecting to Firefox on port ${e}`);
            const r = await t(e);
            return console.log(`Connected to the remote Firefox debugger on port ${e}`), new b(r);
          }
          async function x({ maxRetries: e = 250, retryInterval: t = 120, port: r }, { connectToFirefox: i = y } = {}) {
            return (
              console.log("Connecting to the remote Firefox debugger"),
              (async function () {
                var n;
                for (let o = 0; o <= e; o++)
                  try {
                    return await i(r);
                  } catch (e) {
                    if (!(0, g.lP)("ECONNREFUSED", e)) throw (console.log(e.stack), e);
                    await new Promise(e => {
                      setTimeout(e, t);
                    }),
                      (n = e),
                      console.log(`Retrying Firefox (${o}); connection error: ${e}`);
                  }
                throw (console.log("Connect to Firefox debugger: too many retries"), n);
              })()
            );
          }
          function v() {
            return new Promise(e => {
              const t = s().createServer();
              t.listen(0, "127.0.0.1", () => {
                const r = t.address().port;
                t.close(() => e(r));
              });
            });
          }
        },
        466: (e, t, r) => {
          r.r(t),
            r.d(t, {
              ARTIFACTS_DIR_PREFIX: () => f,
              DEVICE_DIR_BASE: () => u,
              default: () => g,
              listADBDevices: () => m,
              listADBFirefoxAPKs: () => w,
            });
          var i = r(12),
            n = r.n(i);
          const o = require("@devicefarmer/adbkit");
          var s = r.n(o),
            a = r(318),
            c = r(577);
          const d = [
              "org.mozilla.fennec",
              "org.mozilla.fenix",
              "org.mozilla.geckoview_example",
              "org.mozilla.geckoview",
              "org.mozilla.firefox",
              "org.mozilla.reference.browser",
            ],
            l = { "org.mozilla.reference.browser": ".BrowserActivity" },
            u = "/data/local/tmp/",
            f = "web-ext-artifacts-",
            h = (0, c.createLogger)("src/util/adb.js");
          async function p(e) {
            try {
              return await e();
            } catch (e) {
              if ((0, a.lP)("ENOENT", e) && e.message.includes("spawn adb"))
                throw new a.Oi(
                  "No adb executable has been found. You can Use --adb-bin, --adb-host/--adb-port to configure it manually if needed."
                );
              throw e;
            }
          }
          class g {
            constructor(e) {
              n()(this, "params", void 0),
                n()(this, "adb", void 0),
                n()(this, "adbClient", void 0),
                n()(this, "artifactsDirMap", void 0),
                n()(this, "userAbortDiscovery", void 0),
                (this.params = e);
              const { adb: t, adbBin: r, adbHost: i, adbPort: o } = e;
              (this.adb = t || s()),
                (this.adbClient = this.adb.createClient({ bin: r, host: i, port: o })),
                (this.artifactsDirMap = new Map()),
                (this.userAbortDiscovery = !1);
            }
            runShellCommand(e, t) {
              const { adb: r, adbClient: i } = this;
              return (
                console.log(`Run adb shell command on ${e}: ${JSON.stringify(t)}`),
                p(async () => await i.shell(e, t).then(r.util.readAll)).then(e => e.toString())
              );
            }
            async discoverDevices() {
              const { adbClient: e } = this;
              let t = [];
              return (
                console.log("Listing android devices"), (t = await p(async () => e.listDevices())), t.map(e => e.id)
              );
            }
            async discoverInstalledFirefoxAPKs(e, t) {
              return (
                console.log(`Listing installed Firefox APKs on ${e}`),
                (await this.runShellCommand(e, ["pm", "list", "packages"]))
                  .split("\n")
                  .map(e => e.replace("package:", "").trim())
                  .filter(e => {
                    if (t) return e === t;
                    for (const t of d) if (e.startsWith(t)) return !0;
                    return !1;
                  })
              );
            }
            async getAndroidVersionNumber(e) {
              const t = (await this.runShellCommand(e, ["getprop", "ro.build.version.sdk"])).trim(),
                r = parseInt(t);
              if (isNaN(r)) throw new a.ag(`Unable to discovery android version on ${e}: ${t}`);
              return r;
            }
            async ensureRequiredAPKRuntimePermissions(e, t, r) {
              const i = {};
              for (const e of r) i[e] = !1;
              const n = (await this.runShellCommand(e, ["pm", "dump", t])).split("\n");
              for (const e of n)
                for (const t of r)
                  (e.includes(`${t}: granted=true`) || e.includes(`${t}, granted=true`)) && (i[t] = !0);
              for (const e of r)
                if (!i[e])
                  throw new a.Oi(
                    `Required ${e} has not be granted for ${t}. Please grant them using the Android Settings or using the following adb command:\n\t adb shell pm grant ${t} ${e}\n`
                  );
            }
            async amForceStopAPK(e, t) {
              await this.runShellCommand(e, ["am", "force-stop", t]);
            }
            async getOrCreateArtifactsDir(e) {
              let t = this.artifactsDirMap.get(e);
              if (t) return t;
              if (
                ((t = `${u}${f}${Date.now()}`),
                "1" !== (await this.runShellCommand(e, `test -d ${t} ; echo $?`)).trim())
              )
                throw new a.ag(`Cannot create artifacts directory ${t} because it exists on ${e}.`);
              return await this.runShellCommand(e, ["mkdir", "-p", t]), this.artifactsDirMap.set(e, t), t;
            }
            async detectOrRemoveOldArtifacts(e, t = !1) {
              const { adbClient: r } = this;
              return (
                console.log("Checking adb device for existing web-ext artifacts dirs"),
                p(async () => {
                  const i = await r.readdir(e, u);
                  let n = !1;
                  for (const r of i) {
                    if (!r.isDirectory() || !r.name.startsWith(f)) continue;
                    if (!t) return !0;
                    n = !0;
                    const i = `${u}${r.name}`;
                    console.log(`Removing artifacts directory ${i} from device ${e}`),
                      await this.runShellCommand(e, ["rm", "-rf", i]);
                  }
                  return n;
                })
              );
            }
            async clearArtifactsDir(e) {
              const t = this.artifactsDirMap.get(e);
              t &&
                (this.artifactsDirMap.delete(e),
                console.log(`Removing ${t} artifacts directory on ${e} device`),
                await this.runShellCommand(e, ["rm", "-rf", t]));
            }
            async pushFile(e, t, r) {
              const { adbClient: i } = this;
              console.log(`Pushing ${t} to ${r} on ${e}`),
                await p(async () => {
                  await i.push(e, t, r).then(function (e) {
                    return new Promise(t => {
                      e.on("end", t);
                    });
                  });
                });
            }
            async startFirefoxAPK(e, t, r, i) {
              const { adbClient: n } = this;
              console.log(`Starting ${t} on ${e}`);
              const o = [{ key: "args", value: `-profile ${i}` }];
              if ((r ? r.includes(".") || (r = `.${r}`) : ((r = ".App"), l[t] && (r = l[t])), r.startsWith(".")))
                for (const e of d) (t === e || t.startsWith(`${e}.`)) && (r = e + r);
              const s = `${t}/${r}`;
              await p(async () => {
                await n.startActivity(e, { wait: !0, action: "android.activity.MAIN", component: s, extras: o });
              });
            }
            setUserAbortDiscovery(e) {
              this.userAbortDiscovery = e;
            }
            async discoverRDPUnixSocket(e, t, { maxDiscoveryTime: r, retryInterval: i } = {}) {
              let n = [];
              const o = Date.now(),
                s = `Waiting for ${t} Remote Debugging Server...\nMake sure to enable "Remote Debugging via USB" from Settings -> Developer Tools if it is not yet enabled.`;
              for (; 0 === n.length; ) {
                if ((console.log(s), this.userAbortDiscovery))
                  throw new a.Oi("Exiting Firefox Remote Debugging socket discovery on user request");
                if (Date.now() - o > r) throw new a.ag("Timeout while waiting for the Android Firefox Debugger Socket");
                (n = (await this.runShellCommand(e, ["cat", "/proc/net/unix"]))
                  .split("\n")
                  .filter(e => e.trim().endsWith(`${t}/firefox-debugger-socket`))),
                  0 === n.length && (await new Promise(e => setTimeout(e, i)));
              }
              if (((n = n.map(e => e.trim().split(/\s/).pop())), n.length > 1))
                throw new a.ag(`Unexpected multiple RDP sockets: ${JSON.stringify(n)}`);
              return n[0];
            }
            async setupForward(e, t, r) {
              const { adbClient: i } = this;
              console.log(`Configuring ADB forward for ${e}: ${t} -> ${r}`),
                await p(async () => {
                  await i.forward(e, r, t);
                });
            }
          }
          async function m(e) {
            return new g({ adbBin: e }).discoverDevices();
          }
          async function w(e, t) {
            return new g({ adbBin: t }).discoverInstalledFirefoxAPKs(e);
          }
        },
        413: (e, t, r) => {
          r.d(t, { C: () => d });
          var i = r(615),
            n = r(841),
            o = r.n(n),
            s = r(318);
          const a = (0, r(577).createLogger)("src/util/artifacts.js"),
            c = i.fs.access.bind(i.fs);
          async function d(e, { asyncMkdirp: t = o(), asyncFsAccess: r = c } = {}) {
            try {
              if (!(await i.fs.stat(e)).isDirectory())
                throw new s.Oi(`--artifacts-dir="${e}" exists but it is not a directory.`);
              try {
                await r(e, i.fs.W_OK);
              } catch (t) {
                throw (0, s.lP)("EACCES", t)
                  ? new s.Oi(`--artifacts-dir="${e}" exists but the user lacks permissions on it.`)
                  : t;
              }
            } catch (r) {
              if ((0, s.lP)("EACCES", r))
                throw new s.Oi(`Cannot access --artifacts-dir="${e}" because the user lacks permissions: ${r}`);
              if (!(0, s.lP)("ENOENT", r)) throw r;
              try {
                console.log(`Creating artifacts directory: ${e}`), await t(e);
              } catch (t) {
                throw (0, s.lP)("EACCES", t)
                  ? new s.Oi(`Cannot create --artifacts-dir="${e}" because the user lacks permissions: ${t}`)
                  : t;
              }
            }
            return e;
          }
        },
        227: (e, t, r) => {
          r.d(t, { w: () => s });
          const i = require("node-notifier");
          var n = r.n(i);
          const o = (0, r(577).createLogger)("src/util/desktop-notifier.js");
          function s({ title: e, message: t, icon: r }, { notifier: i = n(), log: s = o } = {}) {
            return new Promise((n, o) => {
              i.notify({ title: e, message: t, icon: r }, (e, t) => {
                e ? (console.log(`Desktop notifier error: ${e.message}, response: ${t}`), o(e)) : n();
              });
            });
          }
        },
        282: (e, t, r) => {
          r.d(t, { Z: () => o });
          var i = r(615),
            n = r(318);
          async function o(e, { fileIsReadable: t = e => i.fs.access(e, i.fs.constants.R_OK) } = {}) {
            try {
              return await t(e), (await i.fs.stat(e)).isFile();
            } catch (e) {
              if ((0, n.lP)(["EACCES", "ENOENT"], e)) return !1;
              throw e;
            }
          }
        },
        883: (e, t, r) => {
          r.d(t, { k8: () => u });
          var i = r(12),
            n = r.n(i),
            o = r(622),
            s = r.n(o);
          const a = require("multimatch");
          var c = r.n(a);
          const d = (0, r(577).createLogger)("src/util/file-filter.js");
          class l {
            constructor({
              baseIgnoredPatterns: e = [
                "**/*.xpi",
                "**/*.zip",
                "**/.*",
                "**/.*/**/*",
                "**/node_modules",
                "**/node_modules/**/*",
              ],
              ignoreFiles: t = [],
              sourceDir: r,
              artifactsDir: i,
            } = {}) {
              n()(this, "filesToIgnore", void 0),
                n()(this, "sourceDir", void 0),
                (r = s().resolve(r)),
                (this.filesToIgnore = []),
                (this.sourceDir = r),
                this.addToIgnoreList(e),
                t && this.addToIgnoreList(t),
                i &&
                  ((e, t) => {
                    const r = s().relative(e, t);
                    return !!r && ".." !== r && !r.startsWith(`..${s().sep}`);
                  })(r, i) &&
                  ((i = s().resolve(i)),
                  console.log(`Ignoring artifacts directory "${i}" and all its subdirectories`),
                  this.addToIgnoreList([i, s().join(i, "**", "*")]));
            }
            resolveWithSourceDir(e) {
              const t = s().resolve(this.sourceDir, e);
              return console.log(`Resolved path ${e} with sourceDir ${this.sourceDir} to ${t}`), t;
            }
            addToIgnoreList(e) {
              for (const t of e)
                if ("!" === t.charAt(0)) {
                  const e = this.resolveWithSourceDir(t.substr(1));
                  this.filesToIgnore.push(`!${e}`);
                } else this.filesToIgnore.push(this.resolveWithSourceDir(t));
            }
            wantFile(e) {
              const t = this.resolveWithSourceDir(e);
              return !(c()(t, this.filesToIgnore).length > 0 && (console.log(`FileFilter: ignoring file ${t}`), 1));
            }
          }
          const u = e => new l(e);
        },
        506: (e, t, r) => {
          r.d(t, { Z: () => o });
          var i = r(615),
            n = r(318);
          function o(e) {
            return i.fs
              .stat(e)
              .then(e => e.isDirectory())
              .catch((0, n.JV)(["ENOENT", "ENOTDIR"], () => !1));
          }
        },
        577: (e, t, r) => {
          r.r(t), r.d(t, { ConsoleStream: () => a, consoleStream: () => c, createLogger: () => d });
          var i = r(12),
            n = r.n(i);
          const o = require("bunyan");
          var s = r.n(o);
          class a {
            constructor({ verbose: e = !1 } = {}) {
              n()(this, "verbose", void 0),
                n()(this, "isCapturing", void 0),
                n()(this, "capturedMessages", void 0),
                (this.verbose = e),
                (this.isCapturing = !1),
                (this.capturedMessages = []);
            }
            format({ name: e, msg: t, level: r }) {
              return `${this.verbose ? `[${e}][${o.nameFromLevel[r]}] ` : ""}${t}\n`;
            }
            makeVerbose() {
              this.verbose = !0;
            }
            write(e, { localProcess: t = process } = {}) {
              const r = this.verbose ? s().TRACE : s().INFO;
              if (e.level >= r) {
                const r = this.format(e);
                this.isCapturing ? this.capturedMessages.push(r) : t.stdout.write(r);
              }
            }
            startCapturing() {
              this.isCapturing = !0;
            }
            stopCapturing() {
              (this.isCapturing = !1), (this.capturedMessages = []);
            }
            flushCapturedLogs({ localProcess: e = process } = {}) {
              for (const t of this.capturedMessages) e.stdout.write(t);
              this.capturedMessages = [];
            }
          }
          const c = new a();
          function d(e, { createBunyanLog: t = o.createLogger } = {}) {
            return t({ name: e.replace(/^src\//, ""), level: s().TRACE, streams: [{ type: "raw", stream: c }] });
          }
        },
        515: (e, t, r) => {
          r.d(t, { Z: () => p, L: () => g });
          var i = r(622),
            n = r.n(i),
            o = r(615),
            s = r(84),
            a = r.n(s),
            c = r(174),
            d = r.n(c),
            l = r(284),
            u = r.n(l),
            f = r(318);
          const h = (0, r(577).createLogger)("src/util/manifest.js");
          async function p(e) {
            const t = n().join(e, "manifest.json");
            let r, i;
            console.log(`Validating manifest at ${t}`);
            try {
              r = await o.fs.readFile(t, { encoding: "utf-8" });
            } catch (e) {
              throw new f.uy(`Could not read manifest.json file at ${t}: ${e}`);
            }
            r = d()(r);
            try {
              i = a()(u()(r));
            } catch (e) {
              throw new f.uy(`Error parsing manifest.json file at ${t}: ${e}`);
            }
            const s = [];
            if (
              (i.name || s.push('missing "name" property'),
              i.version || s.push('missing "version" property'),
              i.applications && !i.applications.gecko && s.push('missing "applications.gecko" property'),
              s.length)
            )
              throw new f.uy(`Manifest at ${t} is invalid: ${s.join("; ")}`);
            return i;
          }
          function g(e) {
            const t = [e.browser_specific_settings, e.applications];
            for (const e of t) if (null != e && e.gecko) return e.gecko.id;
          }
        },
        61: (e, t, r) => {
          function i(e) {
            return e.isTTY;
          }
          function n(e, t) {
            e.setRawMode(t);
          }
          r.d(t, { _: () => i, k: () => n });
        },
        737: (e, t, r) => {
          r.d(t, { W: () => p, _: () => h });
          var i = r(12),
            n = r.n(i),
            o = r(669);
          const s = require("tmp");
          var a = r.n(s),
            c = r(577);
          const d = o.promisify.custom,
            l = (0, c.createLogger)("src/util/temp-dir.js");
          var u;
          a().dir[d] =
            ((u = a().dir),
            (...e) =>
              new Promise((t, r) => {
                u(...e, (e, ...i) => {
                  e ? r(e) : t(i);
                });
              }));
          const f = (0, o.promisify)(a().dir);
          function h(e) {
            const t = new p();
            return t
              .create()
              .then(() => e(t))
              .catch(t.errorHandler())
              .then(t.successHandler());
          }
          class p {
            constructor() {
              n()(this, "_path", void 0),
                n()(this, "_removeTempDir", void 0),
                (this._path = void 0),
                (this._removeTempDir = void 0);
            }
            create() {
              return f({ prefix: "tmp-web-ext-", unsafeCleanup: !0 }).then(
                ([e, t]) => (
                  (this._path = e),
                  (this._removeTempDir = () =>
                    new Promise((e, r) => {
                      t(t => (t ? r(t) : e()));
                    })),
                  console.log(`Created temporary directory: ${this.path()}`),
                  this
                )
              );
            }
            path() {
              if (!this._path) throw new Error("You cannot access path() before calling create()");
              return this._path;
            }
            errorHandler() {
              return async e => {
                throw (await this.remove(), e);
              };
            }
            successHandler() {
              return async e => (await this.remove(), e);
            }
            remove() {
              if (this._removeTempDir)
                return (
                  console.log(`Removing temporary directory: ${this.path()}`),
                  this._removeTempDir && this._removeTempDir()
                );
            }
          }
        },
        799: (e, t, r) => {
          r.d(t, { Z: () => l });
          var i = r(615);
          const n = require("watchpack");
          var o = r.n(n);
          const s = require("debounce");
          var a = r.n(s),
            c = r(318);
          const d = (0, r(577).createLogger)("src/watcher.js");
          function l({
            sourceDir: e,
            watchFile: t,
            watchIgnored: r,
            artifactsDir: n,
            onChange: s,
            shouldWatchFile: l,
            debounceTime: u = 500,
          }) {
            const f = r && "win32" === process.platform ? r.map(e => e.replace(/\\/g, "/")) : r,
              h = f ? new (o())({ ignored: f }) : new (o())();
            (s = a()(s, u, !1)),
              h.on("change", e => {
                !(function ({ artifactsDir: e, onChange: t, filePath: r, shouldWatchFile: i }) {
                  0 !== r.indexOf(e) && i(r)
                    ? (console.log(`Changed: ${r}`),
                      console.log(`Last change detection: ${new Date().toTimeString()}`),
                      t())
                    : console.log(`Ignoring change to: ${r}`);
                })({ artifactsDir: n, onChange: s, filePath: e, shouldWatchFile: l });
              }),
              console.log(`Watching ${t ? t.join(",") : e} for changes`);
            const p = [],
              g = [];
            if (t)
              for (const e of t) {
                if (i.fs.existsSync(e) && !i.fs.lstatSync(e).isFile())
                  throw new c.Oi(`Invalid --watch-file value: "${e}" is not a file.`);
                g.push(e);
              }
            else p.push(e);
            return (
              h.watch({ files: g, directories: p, missing: [], startTime: Date.now() }),
              process.on("SIGINT", () => h.close()),
              h
            );
          }
        },
        12: e => {
          e.exports = require("@babel/runtime/helpers/defineProperty");
        },
        747: e => {
          e.exports = require("fs");
        },
        482: e => {
          e.exports = require("git-rev-sync");
        },
        841: e => {
          e.exports = require("mkdirp");
        },
        615: e => {
          e.exports = require("mz");
        },
        84: e => {
          e.exports = require("parse-json");
        },
        622: e => {
          e.exports = require("path");
        },
        849: e => {
          e.exports = require("promise-toolbox/fromEvent");
        },
        58: e => {
          e.exports = require("readline");
        },
        174: e => {
          e.exports = require("strip-bom");
        },
        284: e => {
          e.exports = require("strip-json-comments");
        },
        669: e => {
          e.exports = require("util");
        },
      },
      t = {};
    function r(i) {
      if (t[i]) return t[i].exports;
      var n = (t[i] = { exports: {} });
      return e[i](n, n.exports, r), n.exports;
    }
    (r.n = e => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return r.d(t, { a: t }), t;
    }),
      (r.d = (e, t) => {
        for (var i in t) r.o(t, i) && !r.o(e, i) && Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
      }),
      (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (r.r = e => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      });
    var i = {};
    (() => {
      r.d(i, { default: () => _ });
      var e = r(12),
        t = r.n(e);
      const n = require("os");
      var o = r.n(n),
        s = r(622),
        a = r.n(s),
        c = r(747);
      const d = require("camelcase");
      var l = r.n(d);
      const u = require("decamelize");
      var f = r.n(u);
      const h = require("yargs");
      var p = r.n(h);
      const g = require("yargs/helpers"),
        m = {
          build: async function (e, t) {
            const { default: i } = r(564);
            return i(e, t);
          },
          lint: async function (e, t) {
            const { default: i } = r(177);
            return i(e, t);
          },
          run: async function (e, t) {
            const { default: i } = r(111);
            return i(e, t);
          },
          sign: async function (e, t) {
            const { default: i } = r(750);
            return i(e, t);
          },
          docs: async function (e, t) {
            const { default: i } = r(966);
            return i(e, t);
          },
        };
      var w = r(318),
        b = r(577),
        y = r(702);
      const x = require("update-notifier");
      var v = r.n(x);
      function D({ version: e, updateNotifier: t = v() }) {
        t({ pkg: { name: "web-ext", version: e }, updateCheckInterval: 2592e5 }).notify();
      }
      const P = require("import-fresh");
      var $ = r.n(P),
        A = r(282);
      const E = (0, b.createLogger)("src/config.js");
      function F({ argv: e, argvFromCLI: t, configObject: r, options: i, configFileName: n }) {
        let o = { ...e };
        for (const e of Object.keys(r)) {
          if (l()(e) !== e) throw new w.Oi(`The config option "${e}" must be specified in camel case: "${l()(e)}"`);
          if (!Array.isArray(r[e]) && "object" == typeof i[e] && "object" == typeof r[e]) {
            o = F({ argv: o, argvFromCLI: t, configObject: r[e], options: i[e], configFileName: n });
            continue;
          }
          const s = f()(e, { separator: "-" });
          if ("object" != typeof i[s]) throw new w.Oi(`The config file at ${n} specified an unknown option: "${e}"`);
          if (void 0 === i[s].type) throw new w.ag(`Option: ${e} was defined without a type.`);
          const a = "count" === i[s].type ? "number" : i[s].type,
            c = Array.isArray(r[e]) ? "array" : typeof r[e];
          if (c !== a)
            throw new w.Oi(
              `The config file at ${n} specified the type of "${e}" incorrectly as "${c}" (expected type "${a}")`
            );
          let d;
          if (
            (i[s] && (void 0 !== i[s].default ? (d = i[s].default) : "boolean" === a && (d = !1)),
            void 0 !== t[e] && t[e] !== d)
          ) {
            console.log(`Favoring CLI: ${e}=${t[e]} over configuration: ${e}=${r[e]}`), (o[e] = t[e]);
            continue;
          }
          o[e] = r[e];
          const u = i[s].coerce;
          u && (console.log(`Calling coerce() on configured value for ${e}`), (o[e] = u(o[e]))), (o[s] = o[e]);
        }
        return o;
      }
      function k(e) {
        const t = a().resolve(e);
        let r;
        console.log(`Loading JS config file: "${e}" (resolved to "${t}")`);
        try {
          r = $()(t);
        } catch (e) {
          throw (console.log("Handling error:", e), new w.Oi(`Cannot read config file: ${t}\nError: ${e.message}`));
        }
        return (
          e.endsWith("package.json") &&
            (console.log("Looking for webExt key inside package.json file"), (r = r.webExt || {})),
          0 === Object.keys(r).length &&
            console.log(`Config file ${t} did not define any options. Did you set module.exports = {...}?`),
          r
        );
      }
      async function S({ getHomeDir: e = o().homedir } = {}) {
        const t = [
            a().join(e(), ".web-ext-config.js"),
            a().join(process.cwd(), "package.json"),
            a().join(process.cwd(), "web-ext-config.js"),
          ],
          r = await Promise.all(
            t.map(async e => {
              const t = a().resolve(e);
              return (await (0, A.Z)(t))
                ? t
                : void console.log(`Discovered config "${t}" does not exist or is not readable`);
            })
          ),
          i = [];
        return (
          r.forEach(e => {
            "string" == typeof e && i.push(e);
          }),
          i
        );
      }
      const C = (0, b.createLogger)("src/program.js"),
        O = "WEB_EXT";
      class R {
        constructor(e, { absolutePackageDir: r = process.cwd() } = {}) {
          t()(this, "absolutePackageDir", void 0),
            t()(this, "yargs", void 0),
            t()(this, "commands", void 0),
            t()(this, "shouldExitProgram", void 0),
            t()(this, "verboseEnabled", void 0),
            t()(this, "options", void 0),
            t()(this, "programArgv", void 0),
            (e = e || process.argv.slice(2)),
            (this.programArgv = e);
          const i = p()(e, r);
          (this.absolutePackageDir = r),
            (this.verboseEnabled = !1),
            (this.shouldExitProgram = !0),
            (this.yargs = i),
            this.yargs.parserConfiguration({ "boolean-negation": !0 }),
            this.yargs.strict(),
            this.yargs.wrap(this.yargs.terminalWidth()),
            (this.commands = {}),
            (this.options = {});
        }
        command(e, t, r, i = {}) {
          return (
            (this.options[l()(e)] = i),
            this.yargs.command(e, t, e => {
              if (i)
                return e
                  .demandCommand(0, 0, void 0, "This command does not take any arguments")
                  .strict()
                  .exitProcess(this.shouldExitProgram)
                  .env(O)
                  .options(i);
            }),
            (this.commands[e] = r),
            this
          );
        }
        setGlobalOptions(e) {
          return (
            (this.options = { ...this.options, ...e }),
            Object.keys(e).forEach(t => {
              (e[t].global = !0), void 0 === e[t].demandOption && (e[t].demandOption = !0);
            }),
            this.yargs.options(e),
            this
          );
        }
        enableVerboseMode(e, t) {
          this.verboseEnabled || (e.makeVerbose(), console.log("Version:", t), (this.verboseEnabled = !0));
        }
        getArguments() {
          const e = this.yargs.getValidationInstance(),
            { requiredArguments: t } = e;
          e.requiredArguments = () => {};
          const r = this.yargs.argv;
          if (
            ((e.requiredArguments = t),
            null != r.configDiscovery && (r.noConfigDiscovery = !r.configDiscovery),
            null != r.reload && (r.noReload = !r.reload),
            null != r.input && (r.noInput = !r.input),
            r.ignoreFiles && !r.ignoreFiles.length)
          )
            throw new w.Oi("Not enough arguments following: ignore-files");
          if (r.startUrl && !r.startUrl.length) throw new w.Oi("Not enough arguments following: start-url");
          return r;
        }
        checkRequiredArguments(e) {
          this.yargs.getValidationInstance().requiredArguments(e);
        }
        cleanupProcessEnvConfigs(e) {
          const t = (0, g.Parser)(this.programArgv)._[0],
            r = e.env || {};
          t &&
            Object.keys(r)
              .filter(e => e.startsWith(O))
              .forEach(e => {
                const i = (e => f()(l()(e.replace(O, "")), { separator: "-" }))(e),
                  n = this.options[i],
                  o = this.options[t] && this.options[t][i];
                n || o || (console.log(`Environment ${e} not supported by web-ext ${t}`), delete r[e]);
              });
        }
        async execute({
          checkForUpdates: e = D,
          systemProcess: t = process,
          logStream: r = b.consoleStream,
          getVersion: i = I,
          applyConfigToArgv: n = F,
          discoverConfigFiles: s = S,
          loadJSConfigFile: c = k,
          shouldExitProgram: d = !0,
          globalEnv: l = "production",
        } = {}) {
          (this.shouldExitProgram = d),
            this.yargs.exitProcess(this.shouldExitProgram),
            this.cleanupProcessEnvConfigs(t);
          const u = this.getArguments(),
            f = u._[0],
            h = i(this.absolutePackageDir),
            p = this.commands[f];
          u.verbose && this.enableVerboseMode(r, h);
          let g = { ...u };
          try {
            if (void 0 === f) throw new w.Oi("No sub-command was specified in the args");
            if (!p) throw new w.Oi(`Unknown command: ${f}`);
            "production" === l && e({ version: h });
            const t = [];
            if (u.configDiscovery) {
              console.log("Discovering config files. Set --no-config-discovery to disable");
              const e = await s();
              t.push(...e);
            } else console.log("Not discovering config files");
            if ((u.config && t.push(a().resolve(u.config)), t.length)) {
              const e = t
                .map(e => e.replace(process.cwd(), "."))
                .map(e => e.replace(o().homedir(), "~"))
                .join(", ");
              console.log("Applying config file" + (1 !== t.length ? "s" : "") + ": " + `${e}`);
            }
            t.forEach(e => {
              const t = c(e);
              g = n({ argv: g, argvFromCLI: u, configFileName: e, configObject: t, options: this.options });
            }),
              g.verbose && this.enableVerboseMode(r, h),
              this.checkRequiredArguments(g),
              await p(g, { shouldExitProgram: d });
          } catch (e) {
            if (
              (e instanceof w.Oi && !g.verbose ? console.log(`\n${e}\n`) : console.log(`\n${e.stack}\n`),
              e.code && console.log(`Error code: ${e.code}\n`),
              console.log(`Command executed: ${f}`),
              !this.shouldExitProgram)
            )
              throw e;
            t.exit(1);
          }
        }
      }
      function I(e, { globalEnv: t = "production" } = {}) {
        if ("production" === t) {
          console.log("Getting the version from package.json");
          const t = (0, c.readFileSync)(a().join(e, "package.json"));
          return JSON.parse(t).version;
        }
        {
          console.log("Getting version from the git revision");
          const t = r(482);
          return `${t.branch(e)}-${t.long(e)}`;
        }
      }
      const _ = {
        main: function (e, { getVersion: t = I, commands: r = m, argv: i, runOptions: n = {} } = {}) {
          const o = new R(i, { absolutePackageDir: e }),
            s = t(e);
          return (
            o.yargs
              .usage(
                "Usage: $0 [options] command\n\nOption values can also be set by declaring an environment variable prefixed\nwith $WEB_EXT_. For example: $WEB_EXT_SOURCE_DIR=/path is the same as\n--source-dir=/path.\n\nTo view specific help for any given command, add the command name.\nExample: $0 --help run.\n"
              )
              .help("help")
              .alias("h", "help")
              .env(O)
              .version(s)
              .demandCommand(1, "You must specify a command")
              .strict()
              .recommendCommands(),
            o.setGlobalOptions({
              "source-dir": {
                alias: "s",
                describe: "Web extension source directory.",
                default: process.cwd(),
                requiresArg: !0,
                type: "string",
                coerce: a().resolve,
              },
              "artifacts-dir": {
                alias: "a",
                describe: "Directory where artifacts will be saved.",
                default: a().join(process.cwd(), "web-ext-artifacts"),
                normalize: !0,
                requiresArg: !0,
                type: "string",
              },
              verbose: { alias: "v", describe: "Show verbose output", type: "boolean", demandOption: !1 },
              "ignore-files": {
                alias: "i",
                describe:
                  'A list of glob patterns to define which files should be ignored. (Example: --ignore-files=path/to/first.js path/to/second.js "**/*.log")',
                demandOption: !1,
                type: "array",
              },
              "no-input": {
                describe: "Disable all features that require standard input",
                type: "boolean",
                demandOption: !1,
              },
              input: { hidden: !0, type: "boolean", demandOption: !1 },
              config: {
                alias: "c",
                describe: "Path to a CommonJS config file to set option defaults",
                default: void 0,
                demandOption: !1,
                requiresArg: !0,
                type: "string",
              },
              "config-discovery": {
                describe:
                  "Discover config files in home directory and working directory. Disable with --no-config-discovery.",
                demandOption: !1,
                default: !0,
                type: "boolean",
              },
            }),
            o
              .command("build", "Create an extension package from source", r.build, {
                "as-needed": { describe: "Watch for file changes and re-build as needed", type: "boolean" },
                filename: {
                  alias: "n",
                  describe: "Name of the created extension package file.",
                  default: void 0,
                  normalize: !1,
                  demandOption: !1,
                  requiresArg: !0,
                  type: "string",
                  coerce:
                    ("Multiple --filename/-n option are not allowed",
                    e => {
                      if (Array.isArray(e)) throw new w.Oi("Multiple --filename/-n option are not allowed");
                      return e;
                    }),
                },
                "overwrite-dest": {
                  alias: "o",
                  describe: "Overwrite destination package if it exists.",
                  type: "boolean",
                },
              })
              .command("sign", "Sign the extension so it can be installed in Firefox", r.sign, {
                "api-key": {
                  describe: "API key (JWT issuer) from addons.mozilla.org",
                  demandOption: !0,
                  type: "string",
                },
                "api-secret": {
                  describe: "API secret (JWT secret) from addons.mozilla.org",
                  demandOption: !0,
                  type: "string",
                },
                "api-url-prefix": {
                  describe: "Signing API URL prefix",
                  default: "https://addons.mozilla.org/api/v4",
                  demandOption: !0,
                  type: "string",
                },
                "api-proxy": {
                  describe: "Use a proxy to access the signing API. Example: https://yourproxy:6000 ",
                  demandOption: !1,
                  type: "string",
                },
                id: {
                  describe:
                    "A custom ID for the extension. This has no effect if the extension already declares an explicit ID in its manifest.",
                  demandOption: !1,
                  type: "string",
                },
                timeout: { describe: "Number of milliseconds to wait before giving up", type: "number" },
                channel: {
                  describe: "The channel for which to sign the addon. Either 'listed' or 'unlisted'",
                  type: "string",
                },
              })
              .command("run", "Run the extension", r.run, {
                target: {
                  alias: "t",
                  describe:
                    "The extensions runners to enable. Specify this option multiple times to run against multiple targets.",
                  default: "firefox-desktop",
                  demandOption: !1,
                  type: "array",
                  choices: ["firefox-desktop", "firefox-android", "chromium"],
                },
                firefox: {
                  alias: ["f", "firefox-binary"],
                  describe:
                    "Path or alias to a Firefox executable such as firefox-bin or firefox.exe. If not specified, the default Firefox will be used. You can specify the following aliases in lieu of a path: firefox, beta, nightly, firefoxdeveloperedition.",
                  demandOption: !1,
                  type: "string",
                },
                "firefox-profile": {
                  alias: "p",
                  describe:
                    "Run Firefox using a copy of this profile. The profile can be specified as a directory or a name, such as one you would see in the Profile Manager. If not specified, a new temporary profile will be created.",
                  demandOption: !1,
                  type: "string",
                },
                "chromium-binary": {
                  describe:
                    "Path or alias to a Chromium executable such as google-chrome, google-chrome.exe or opera.exe etc. If not specified, the default Google Chrome will be used.",
                  demandOption: !1,
                  type: "string",
                },
                "chromium-profile": { describe: "Path to a custom Chromium profile", demandOption: !1, type: "string" },
                "profile-create-if-missing": {
                  describe: "Create the profile directory if it does not already exist",
                  demandOption: !1,
                  type: "boolean",
                },
                "keep-profile-changes": {
                  describe: "Run Firefox directly in custom profile. Any changes to the profile will be saved.",
                  demandOption: !1,
                  type: "boolean",
                },
                reload: {
                  describe: "Reload the extension when source files change.Disable with --no-reload.",
                  demandOption: !1,
                  default: !0,
                  type: "boolean",
                },
                "watch-file": {
                  alias: ["watch-files"],
                  describe:
                    "Reload the extension only when the contents of this file changes. This is useful if you use a custom build process for your extension",
                  demandOption: !1,
                  type: "array",
                },
                "watch-ignored": {
                  describe:
                    "Paths and globs patterns that should not be watched for changes. This is useful if you want to explicitly prevent web-ext from watching part of the extension directory tree, e.g. the node_modules folder.",
                  demandOption: !1,
                  type: "array",
                },
                "pre-install": {
                  describe:
                    "Pre-install the extension into the profile before startup. This is only needed to support older versions of Firefox.",
                  demandOption: !1,
                  type: "boolean",
                },
                pref: {
                  describe:
                    "Launch firefox with a custom preference (example: --pref=general.useragent.locale=fr-FR). You can repeat this option to set more than one preference.",
                  demandOption: !1,
                  requiresArg: !0,
                  type: "array",
                  coerce: y.gO,
                },
                "start-url": {
                  alias: ["u", "url"],
                  describe: "Launch firefox at specified page",
                  demandOption: !1,
                  type: "array",
                },
                "browser-console": {
                  alias: ["bc"],
                  describe: "Open the DevTools Browser Console.",
                  demandOption: !1,
                  type: "boolean",
                },
                args: {
                  alias: ["arg"],
                  describe: "Additional CLI options passed to the Browser binary",
                  demandOption: !1,
                  type: "array",
                },
                "adb-bin": {
                  describe: "Specify a custom path to the adb binary",
                  demandOption: !1,
                  type: "string",
                  requiresArg: !0,
                },
                "adb-host": {
                  describe: "Connect to adb on the specified host",
                  demandOption: !1,
                  type: "string",
                  requiresArg: !0,
                },
                "adb-port": {
                  describe: "Connect to adb on the specified port",
                  demandOption: !1,
                  type: "string",
                  requiresArg: !0,
                },
                "adb-device": {
                  alias: ["android-device"],
                  describe: "Connect to the specified adb device name",
                  demandOption: !1,
                  type: "string",
                  requiresArg: !0,
                },
                "adb-discovery-timeout": {
                  describe: "Number of milliseconds to wait before giving up",
                  demandOption: !1,
                  type: "number",
                  requiresArg: !0,
                },
                "adb-remove-old-artifacts": {
                  describe: "Remove old artifacts directories from the adb device",
                  demandOption: !1,
                  type: "boolean",
                },
                "firefox-apk": {
                  describe: "Run a specific Firefox for Android APK. Example: org.mozilla.fennec_aurora",
                  demandOption: !1,
                  type: "string",
                  requiresArg: !0,
                },
                "firefox-apk-component": {
                  describe: "Run a specific Android Component (defaults to <firefox-apk>/.App)",
                  demandOption: !1,
                  type: "string",
                  requiresArg: !0,
                },
              })
              .command("lint", "Validate the extension source", r.lint, {
                output: {
                  alias: "o",
                  describe: "The type of output to generate",
                  type: "string",
                  default: "text",
                  choices: ["json", "text"],
                },
                metadata: { describe: "Output only metadata as JSON", type: "boolean", default: !1 },
                "warnings-as-errors": {
                  describe: "Treat warnings as errors by exiting non-zero for warnings",
                  alias: "w",
                  type: "boolean",
                  default: !1,
                },
                pretty: { describe: "Prettify JSON output", type: "boolean", default: !1 },
                "self-hosted": {
                  describe:
                    "Your extension will be self-hosted. This disables messages related to hosting on addons.mozilla.org.",
                  type: "boolean",
                  default: !1,
                },
                boring: { describe: "Disables colorful shell output", type: "boolean", default: !1 },
              })
              .command("docs", "Open the web-ext documentation in a browser", r.docs, {}),
            o.execute({ getVersion: t, ...n })
          );
        },
        cmd: m,
        util: {
          logger: b,
          get adb() {
            const { listADBDevices: e, listADBFirefoxAPKs: t } = r(466);
            return { listADBDevices: e, listADBFirefoxAPKs: t };
          },
        },
      };
    })(),
      (module.exports = i.default);
  })();
//# sourceMappingURL=web-ext.js.map

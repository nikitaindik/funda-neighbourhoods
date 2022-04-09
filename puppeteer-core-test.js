const path = require("path");
const puppeteer = require("puppeteer-core");
const webExt = require("web-ext");
const child_process = require("child_process");
const { connectWithMaxRetries } = require("./copy-paste/remote");

const pathToExtension = path.resolve("./build/manifest.json");

(async () => {
  const cdpPort = 23232;

  // Doesn't click this way
  const extensionRunner = await webExt.cmd.run(
    {
      firefox: "/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox",
      sourceDir: path.resolve(__dirname, "./build"),
      args: ["--remote-debugging-port", cdpPort, "--start-maximized"],
    },
    { shouldExitProgram: false }
  );

  child_process.execSync("sleep 5");

  const browser = await puppeteer.connect({
    browserURL: `http://localhost:${cdpPort}`,
    product: "firefox",
  });

  const page = await browser.newPage();
  console.log("GOING");
  await page.goto("http://nikitaindik.com/");
  console.log("WENT");
  await page.waitForTimeout(3000 + 1000 * Math.random());
  await page.click("h3 a");
  await page.waitForTimeout(10000 + 1000 * Math.random());

  // const browser = await puppeteer.launch({
  //   headless: false,
  //   product: "firefox",
  //   executablePath: "/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox",
  //   args: ["--remote-debugging-port", cdpPort.toString(), "--start-maximized"],
  //   defaultViewport: null,
  // });

  // child_process.execSync("sleep 5");

  // const remoteFirefox = await connectWithMaxRetries({
  //   port: cdpPort,
  // });

  // console.log(remoteFirefox);

  // const browser2 = await puppeteer.connect({
  //   browserURL: `http://localhost:${cdpPort}`,
  //   product: "firefox",
  // });

  // const page = await browser2.newPage();
  // await page.goto("http://nikitaindik.com/");
  // await page.waitForTimeout(3000 + 1000 * Math.random());
  // await page.click("h3 a");
  // await page.waitForTimeout(10000 + 1000 * Math.random());

  // await browser.close();
})();

// #onetrust-pc-btn-handler
// .save-preference-btn-handler

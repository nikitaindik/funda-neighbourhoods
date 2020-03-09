const path = require("path");

const pathToExtension = path.resolve("./build");

module.exports = {
  launch: {
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ],
    /* "executablePath" - set by Docker container on CI, not used locally */
    executablePath: process.env.PUPPETEER_EXEC_PATH
  }
};

const path = require("path");

const pathToExtension = path.resolve("./build");

module.exports = {
  launch: {
    headless: false,
    executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  }
};

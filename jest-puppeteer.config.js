const path = require("path");

const pathToExtension = path.resolve("./build");

module.exports = {
  launch: {
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  }
};

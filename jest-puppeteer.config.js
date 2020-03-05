const path = require("path");

const pathToExtension = path.resolve("./build");
console.log(pathToExtension);

module.exports = {
  launch: {
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  }
};

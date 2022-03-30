const path = require("path");
const fs = require("fs");

const pathToExtension = path.resolve("./build");
fs.readdir(pathToExtension, (error, files) => {
  console.log(files);
});

module.exports = {
  launch: {
    headless: false,
    args: [`--disable-extensions-except=${pathToExtension}`, `--load-extension=${pathToExtension}`],
    /* "executablePath" - set by Docker container on CI, not used locally */
    executablePath: process.env.PUPPETEER_EXEC_PATH,
  },
};

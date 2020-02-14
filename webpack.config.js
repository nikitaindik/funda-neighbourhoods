const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    background: "./src/background.js",
    content: "./src/content.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new CopyPlugin([
      {
        from: "./src/manifest.json",
        to: "[path][name].[ext]"
      }
    ])
  ]
};

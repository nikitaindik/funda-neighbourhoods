const path = require("path");

const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = env => {
  return {
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
      new webpack.DefinePlugin({
        "process.env.API_PATH": JSON.stringify(env.API_PATH)
      }),
      new CopyPlugin([
        {
          from: "./src/manifest.json",
          to: "[path][name].[ext]"
        }
      ])
    ]
  };
};

const path = require("path");

const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const addVariablesToManifest = require("./src/chromeExtension/addVariablesToManifest");

module.exports = env => {
  const isDevMode = env.BUILD_MODE === "dev";
  const isTestMode = env.BUILD_MODE === "test";

  const zipCodeApiDomain =
    env.ZIPCODE_API_DOMAIN ||
    "https://gq4qc1c0fa.execute-api.eu-west-1.amazonaws.com";

  return {
    mode: isDevMode ? "development" : "production",
    watch: isDevMode,
    entry: {
      background: "./src/chromeExtension/background/background.js",
      content: "./src/chromeExtension/content/content.js",
      options: "./src/chromeExtension/options/options.js"
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "build")
    },
    plugins: [
      ...(isDevMode ? [] : [new CleanWebpackPlugin()]),
      new webpack.DefinePlugin({
        "process.env.ZIPCODE_API_DOMAIN": JSON.stringify(zipCodeApiDomain)
      }),
      new CopyPlugin([
        {
          from: "./src/chromeExtension/manifest.json",
          transform: addVariablesToManifest(zipCodeApiDomain, isTestMode)
        },
        {
          from: "./src/chromeExtension/content/content.css"
        },
        {
          from: "./src/chromeExtension/options/"
        },
        {
          from: "./src/chromeExtension/assets/"
        }
      ])
    ],
    devtool: isDevMode ? "inline-source-map" : false
  };
};

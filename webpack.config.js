const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const makeManifestTransformer = require("./src/addVariablesToManifest");

module.exports = env => {
  const isDevMode = env.BUILD_MODE === "dev";
  const isTestMode = env.BUILD_MODE === "test";

  return {
    mode: isDevMode ? "development" : "production",
    watch: isDevMode,
    entry: {
      background: "./src/background/background.js",
      content: "./src/content/content.js",
      options: "./src/options/options.js",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "build"),
    },
    plugins: [
      ...(isDevMode ? [] : [new CleanWebpackPlugin()]),
      new CopyPlugin([
        {
          from: "./src/manifest.json",
          transform: makeManifestTransformer(isTestMode),
        },
        {
          from: "./src/content/content.css",
        },
        {
          from: "./src/options/",
        },
        {
          from: "./src/assets/",
        },
      ]),
    ],
    devtool: isDevMode ? "inline-source-map" : false,
  };
};

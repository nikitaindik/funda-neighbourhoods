const path = require("path");

const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const addApiPathToManifest = require("./src/chromeExtension/addApiPathToManifest");

module.exports = env => {
  const isDevMode = env.IS_DEV_MODE === "true";

  return {
    mode: isDevMode ? "development" : "production",
    watch: isDevMode ? true : false,
    entry: {
      background: "./src/chromeExtension/background/background.js",
      content: "./src/chromeExtension/content/content.js",
      options: "./src/chromeExtension/options/options.js"
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "build")
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.ZIPCODE_API_DOMAIN": JSON.stringify(env.ZIPCODE_API_DOMAIN)
      }),
      new CopyPlugin([
        {
          from: "./src/chromeExtension/manifest.json",
          transform: addApiPathToManifest(env.ZIPCODE_API_DOMAIN)
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

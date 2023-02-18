/**
 * This file contains the common webpack configuration for both development
 * and production.
 */

const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
  entry: {
    background: path.join(srcDir, "background.ts"),
    popup: path.join(srcDir, "popup.ts"),
    saveItems: path.join(srcDir, "saveItems.ts"),
    content: path.join(srcDir, "content.ts"),
    spotlight: path.join(srcDir, "spotlight.ts"),
    deactivateSpotlight: path.join(srcDir, "deactivateSpotlight.ts"),
    deactivateShortcuts: path.join(srcDir, "deactivateShortcuts.ts"),
    deactivateGreenboard: path.join(srcDir, "deactivateGreenboard.ts"),
    greenboard: path.join(srcDir, "greenboard.ts"),
  },
  output: {
    path: path.join(__dirname, "../dist/js"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks(chunk) {
        return chunk.name !== "background";
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: "../", context: "public" }],
      options: {},
    }),
  ],
};

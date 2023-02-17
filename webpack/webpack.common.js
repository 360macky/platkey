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
      background: path.join(srcDir, 'background.ts'),
      popup: path.join(srcDir, 'popup.ts'),
      saveItems: path.join(srcDir, 'saveItems.js'),
      content: path.join(srcDir, 'content.js'),
      spotlight: path.join(srcDir, 'spotlight.js'),
      deactivateSpotlight: path.join(srcDir, 'deactivateSpotlight.js'),
      deactivateShortcuts: path.join(srcDir, 'deactivateShortcuts.js'),
      deactivateGreenboard: path.join(srcDir, 'deactivateGreenboard.js'),
      greenboard: path.join(srcDir, 'greenboard.js'),
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
              return chunk.name !== 'background';
            }
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

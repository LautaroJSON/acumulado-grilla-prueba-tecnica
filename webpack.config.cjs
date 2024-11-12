const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

const babelLoader = {
  rules: [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            ["@babel/preset-react", { runtime: "automatic" }],
            "@babel/preset-typescript",
          ],
        },
      },
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [MiniCssExtractPlugin.loader, , "css-loader"],
    },
  ],
};

const resolve = {
  extensions: [".tsx", ".ts", ".js"],
};

const serverConfig = {
  target: "node",
  mode: "development",
  entry: "./src/server/server.tsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "server.bundle.cjs",
  },
  module: babelLoader,
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: "server.css", // Generar un archivo CSS separado
    }),
  ],
  resolve,
};

const clientConfig = {
  target: "web",
  mode: "development",
  entry: "./src/client/index.tsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "client.bundle.js",
    publicPath: "/static",
  },
  module: babelLoader,
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "client.css",
    }),
  ],
  resolve,
};

module.exports = [serverConfig, clientConfig];

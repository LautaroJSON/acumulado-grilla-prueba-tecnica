const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const babelLoaderClient = {
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

const babelLoaderServer = {
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
      use: ["css-loader"],
    },
  ],
};

const resolve = {
  extensions: [".tsx", ".ts", ".js"],
};

const serverConfig = {
  target: "node",
  mode: "production",
  entry: "./src/server/server.tsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "server.bundle.cjs",
  },
  module: babelLoaderServer,
  plugins: [new Dotenv()],
  resolve,
};

const clientConfig = {
  target: "web",
  mode: "production",
  entry: "./src/client/index.tsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "client.bundle.js",
    publicPath: "/static",
  },
  module: babelLoaderClient,
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  resolve,
};

module.exports = [serverConfig, clientConfig];

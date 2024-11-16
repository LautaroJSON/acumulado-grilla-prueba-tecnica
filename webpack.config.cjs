const path = require("path");
// const glob = require("glob");
// const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const PATHS = {
  dist: path.join(__dirname, "/dist"),
  src: path.join(__dirname, "/src"),
};

const RULES = {
  babelTSX: {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
    },
  },
  cssForCliente: {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [MiniCssExtractPlugin.loader, "css-loader"],
  },
  cssForServer: {
    test: /\.css$/,
    exclude: /node_modules/,
    use: ["css-loader"],
  },
};

const babelLoaderClient = {
  rules: [RULES.babelTSX, RULES.cssForCliente],
};

const babelLoaderServer = {
  rules: [RULES.babelTSX, RULES.cssForServer],
};

const resolve = {
  extensions: [".tsx", ".ts", ".js"],
};

const serverConfig = {
  target: "node",
  mode: "production",
  entry: "./src/server/server.ts",
  output: {
    path: PATHS.dist,
    filename: "server.bundle.cjs",
  },
  module: babelLoaderServer,
  plugins: [new Dotenv()],
  resolve,
  externals: {
    sharp: "commonjs sharp",
  },
};

const clientConfig = {
  target: "web",
  mode: "production",
  entry: "./src/client/index.tsx",
  output: {
    path: PATHS.dist,
    filename: "client.bundle.js",
    publicPath: "/static",
  },
  module: babelLoaderClient,
  plugins: [
    // new PurgeCSSPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*.{js,jsx,ts,tsx,html}`, { nodir: true }),
    //   safelist: ['[class*=" lay"]', "[class^=lay]", /@media/, /^lay-/],
    //   whitelistPatterns: [/lay-.*/],
    // }),
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
  externals: {
    sharp: "commonjs sharp",
  },
};

module.exports = [serverConfig, clientConfig];

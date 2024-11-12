const path = require("path");
const nodeExternals = require("webpack-node-externals");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/server/server.tsx",
  target: "node",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.server.js",
    libraryTarget: "commonjs2",
  },
  plugins: [new Dotenv()],
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
  },
};

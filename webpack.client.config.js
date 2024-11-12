const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    "webpack-hot-middleware/client?reload=true", // Habilita el hot reload
    "./src/client/index.tsx",
  ],
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist/public"),
    filename: "bundle.client.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".tsx"],
  },
};

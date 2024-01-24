const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: ["./src/index.tsx"],
  },
  output: {
    path: path.resolve(__dirname, "/static"),
    hashDigestLength: 5,
    filename: "[name].min.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  devServer: {
    host: "0.0.0.0",
    port: 9999,
    static: {
      directory: path.resolve(__dirname, "./"),
    },
  },
};

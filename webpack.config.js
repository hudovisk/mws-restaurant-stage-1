const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: [
    path.resolve(__dirname, "js/main.js"),
    path.resolve(__dirname, "sass/index.scss")
  ],
  output: {
    path: path.resolve(__dirname, "build/"),
    publicPath: "/",
    filename: "js/[name].js"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "build/"),
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /restaurants\.json$/,
        type: "javascript/auto",
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].[ext]" }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["build"]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html")
    })
  ]
};

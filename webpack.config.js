const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    polyfill: "@babel/polyfill",
    main: [
      path.resolve(__dirname, "src/sass/index.scss"),
      path.resolve(__dirname, "src/js/pages/main/index.js")
    ],
    restaurant: [
      path.resolve(__dirname, "src/sass/index.scss"),
      path.resolve(__dirname, "src/js/pages/restaurant/index.js")
    ]
  },
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
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              disable: true // webpack@2.x and newer
            }
          }
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
  resolve: {
    modules: [__dirname, "node_modules"]
  },
  plugins: [
    new CleanWebpackPlugin(["build"]),
    new HtmlWebpackPlugin({
      chunks: ["polyfill", "css", "main"],
      template: path.resolve(__dirname, "src/index.html")
    }),
    new HtmlWebpackPlugin({
      chunks: ["polyfill", "css", "restaurant"],
      template: path.resolve(__dirname, "src/restaurant.html"),
      filename: "restaurant.html"
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ]
};

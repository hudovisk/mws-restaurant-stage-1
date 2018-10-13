const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: {
    shared: [
      "@babel/polyfill",
      path.resolve(__dirname, "src/js/pages/shared.js"),
      path.resolve(__dirname, "src/sass/index.scss")
    ],
    main: path.resolve(__dirname, "src/js/pages/main/index.js"),
    restaurant: path.resolve(__dirname, "src/js/pages/restaurant/index.js")
  },
  output: {
    path: path.resolve(__dirname, "build/"),
    publicPath: "/"
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
          {
            loader: "file-loader",
            options: {
              name: "img/[hash].[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              disable: process.env.NODE_ENV != "production"
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
            options: { name: "data/[name].[ext]" }
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
      chunks: ["shared", "main"],
      template: path.resolve(__dirname, "src/index.html")
    }),
    new HtmlWebpackPlugin({
      chunks: ["shared", "restaurant"],
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

var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './client/src/outputs/Embeddable-Chat-Service.js',
  output: {
    filename: 'chat-service.js',
    path: DIST_DIR,
    publicPath: '/',
    library: 'EmbeddableChatService',
    libraryExport: 'default',
    libraryTarget: 'window',
  },
   plugins: [
    new MinifyPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
           presets: [["es2015", { "modules": false }], "react"],
        }
      },
      {
        test: /\.(png|jpg|gif|json|xml|ico|svg)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
};

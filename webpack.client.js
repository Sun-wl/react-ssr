const path = require("path");
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  context: path.resolve(__dirname, 'client'),
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "client/.build/js"),
    filename: "bundle.js"
  },
  optimization: {
    moduleIds: 'named',
    emitOnErrors: false,
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    client: {
      logging: 'info',
      overlay: false
    },
    static: {
      directory: path.join(__dirname, 'client/.build'),
    },
    allowedHosts: ['localhost'],
    host: 'localhost',
    hot: true,
    port: process.env.CLIENT_PORT || 7975,
  }
};

module.exports = merge(baseConfig, config);

const path = require("path");
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  entry: "./client/index.js",
  output: {
    path: path.join(__dirname, ".build/js"),
    filename: "bundle.js"
  }
};

module.exports = merge(baseConfig, config);

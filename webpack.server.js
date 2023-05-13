const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const nodeExternals = require('webpack-node-externals');

const config = {
  context: path.resolve(__dirname, 'server'),
  target: 'node',
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'server/.build'),
    filename: 'bundle.js'
  },
  optimization: {
    moduleIds: 'named',
    emitOnErrors: false,
  },
  externals: [nodeExternals()]
}

module.exports = merge(baseConfig, config);
const path = require('path');
const { removeEmpty } = require('webpack-config-utils');
const PostCompileWebpackPlugin = require('post-compile-webpack-plugin')
const nodeExternals = require('webpack-node-externals');
const rimraf = require('rimraf')
const cpy = require('cpy')
const { ifProd, fromRoot } = require('./scripts/utils');

const serverBuildPath = 'dist'
module.exports = removeEmpty({
  mode: ifProd('production', 'development'),
  context: path.resolve(__dirname, 'server'),
  target: 'node',
  externals: [nodeExternals()],
  entry: "./index.js",
  output: {
    path: path.join(__dirname, serverBuildPath),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|tsx|ts)$/,
            include: fromRoot('server'),
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              ...(require(fromRoot('.babelrc.js')))
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new PostCompileWebpackPlugin(() => {
      const viewOutput = fromRoot('dist/views')
      // 递归地删除文件和目录
      rimraf.sync(viewOutput)
      // 编译完成后将 views copy 到 dist/views 下
      cpy(['**/*'], viewOutput, {
        parents: true,
        cwd: fromRoot('server/views'),
        nodir: true,
      }).catch(error => {
        console.error(error)
        process.exit(1)
      })
    })
  ],
  
})
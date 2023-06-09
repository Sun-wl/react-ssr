const { fromRoot, fromConfig } = require('../../utils')

// 编译server下的文件
require('@babel/register')({
  extensions: ['.tsx', '.ts', '.js'],
  ignore: [/node_modules/, /.build/],
  only: [/server/],
  ...require(fromConfig('.babelrc.js')),
})

// 执行server/index.js
require(fromRoot('server/index.js'))

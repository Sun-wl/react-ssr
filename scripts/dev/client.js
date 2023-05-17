const spawn = require('cross-spawn')
const { fromRoot } = require('../utils')

/**
 * spawn.sync 执行命令
 * webpack serve --config webpack.config.js
 */
const result = spawn.sync('webpack', ['serve', '--config', fromRoot('webpack.config.js')], {
  stdio: 'inherit'
})

if (result.status !== 0) {
  console.error('client start error...')
}

process.exit(result.status)
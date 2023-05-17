const spawn = require('cross-spawn')
const { fromRoot } = require('../utils')

/**
 * spawn.sync 执行命令
 * webpack-cli --config webpack.server.js
 */
const result = spawn.sync('webpack-cli', ['--config', fromRoot('webpack.server.js')], {
  stdio: 'inherit',
  env: {
    WEBPACK: true,
    NODE_ENV: 'production'
  }
})
if (result.status !== 0) {
  console.error('server build error...')
}

process.exit(result.status)
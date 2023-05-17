const spawn = require('cross-spawn')
const { fromRoot } = require('../utils')

/**
 * spawn.sync 执行命令
 * webpack-cli --config webpack.config.js
 */
const result = spawn.sync('webpack-cli', ['--config', fromRoot('webpack.config.js')], {
  stdio: 'inherit',
  env: {
    WEBPACK: true,
    NODE_ENV: 'production'
  }
})

if (result.status !== 0) {
  console.error('client build error...')
}

process.exit(result.status)

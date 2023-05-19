const spawn = require('cross-spawn')
const { fromConfig } = require('../../utils')

/**
 * spawn.sync 执行命令
 * webpack serve --config webpack.client.js
 */
const result = spawn.sync(
  'webpack',
  ['serve', '--config', fromConfig('webpack.client.js')],
  {
    stdio: 'inherit',
  },
)

if (result.status !== 0) {
  console.error('client start error...')
}

process.exit(result.status)

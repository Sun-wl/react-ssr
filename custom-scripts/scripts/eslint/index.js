const spawn = require('cross-spawn')
const { fromConfig, fromRoot } = require('../../utils')

/**
 * spawn.sync 执行命令
 */
const args = [
  '--ext',
  '.js,.ts,.tsx',
  '--config',
  fromConfig('.eslintrc.js'),
  '--ignore-path',
  fromConfig('.eslintignore'),
  '--cache',
  '--cache-location',
  'node_modules/.cache/eslint/cache',
  fromRoot('client/'),
  fromRoot('server/'),
  '--fix',
]
const result = spawn.sync('eslint', args, {
  stdio: 'inherit',
})

if (result.status !== 0) {
  console.error('eslint start error...')
}

process.exit(result.status)

const spawn = require('cross-spawn')
const { fromConfig } = require('../../utils')

/**
 * spawn.sync 执行命令
 */
const args = [
  '--config',
  fromConfig('.prettierrc.js'),
  '--ignore-path',
  fromConfig('prettierignore'),
  '--write',
  '**/*.+(js|ts|tsx|json|less|css|md|mdx|html|graphql)',
]
const result = spawn.sync('prettier', args, {
  stdio: 'inherit',
})

if (result.status !== 0) {
  console.error('eslint start error...')
}

process.exit(result.status)

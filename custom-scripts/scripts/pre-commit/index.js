const spawn = require('cross-spawn')
const { fromConfig } = require('../../utils')

/**
 * spawn.sync 执行命令
 */
const lintStageResult = spawn.sync(
  'lint-staged',
  ['--config', fromConfig('lintstagedrc.js')],
  {
    stdio: 'inherit',
  },
)

if (lintStageResult.status !== 0) {
  process.exit(lintStageResult.status)
}

const validateResult = spawn.sync('node', [require.resolve('./validate')], {
  stdio: 'inherit',
})

if (validateResult.status !== 0) {
  process.exit(validateResult.status)
}

// concurrently --kill-others-on-fail --handle-input --prefix [{name}] --names build,lint,test --prefix-colors bgBlue.bold.reset,bgGreen.bold.reset,bgMagenta.bold.reset "npm run build --silent" "npm run lint --silent" "npm run test --silent -- --coverage"
const spawn = require('cross-spawn')
const { fromConfig } = require('../../utils')

/**
 * spawn.sync 执行命令
 */
const args = [
  '--kill-others-on-fail',
  '--handle-input',
  '--prefix',
  '[{name}]',
  '--names',
  'build,lint',
  // 'build,lint,test',
  '--prefix-colors',
  'bgBlue.bold.reset,bgGreen.bold.reset,bgMagenta.bold.reset',
  `"npm run build --silent"`,
  `"npm run lint --silent"`,
  // `"npm run test --silent -- --coverage"`
]
const lintStageResult = spawn.sync('concurrently', args, {
  stdio: 'inherit',
})

if (lintStageResult.status !== 0) {
  process.exit(lintStageResult.status)
}

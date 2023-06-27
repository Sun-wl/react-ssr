const spawn = require('cross-spawn')
const { fromScripts } = require('../../utils')

const scripts = [
  '--kill-others-on-fail',
  '--handle-input',
  '--prefix', '[{name}]',
  '--names',
  'client,server',
  '--prefix-colors', 'bgBlue.bold.reset,bgGreen.bold.reset,bgMagenta.bold.reset',
  `node ${fromScripts('dev/client.js')}`,
  `node ${fromScripts('dev/server.js')}`,
]

/**
 * concurrently: 用来执行多个命令
 * spawn.sync 用来执行命令，支持多平台
 */
const result = spawn.sync('concurrently', scripts, {
  stdio: 'inherit',
  env: {
    NODE_ENV: 'development',
    CONCURRENTLY: true,
    ...process.env,
  }
})

// 命令执行完成或出现error 后退出
process.exit(result.status)

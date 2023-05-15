const spawn = require('cross-spawn')
const { fromRoot } = require('./scripts/utils')

const scripts = [
  `node ${fromRoot('scripts/dev/client.js')}`,
  `node ${fromRoot('scripts/dev/server.js')}`
]

/**
 * concurrently: 用来执行多个命令
 * concurrently "node ${fromRoot('scripts/dev/client.js')}" "node ${fromRoot('scripts/dev/server.js')}"
 * spawn.sync 用来执行命令，支持多平台
 */
const result = spawn.sync('concurrently', scripts, {
  stdio: 'inherit'
})

// 命令执行完成或出现error 后退出
process.exit(result.status)
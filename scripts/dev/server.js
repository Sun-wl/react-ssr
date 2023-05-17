const spawn = require('cross-spawn')
const { fromRoot } = require('../utils')

/**
 * spawn.sync 执行命令
 * nodemon --inspect --config nodemon.json scripts/dev/server.run.js
 * 
 * --inspect 用于启用调试器。
 * 当你在运行 Node.js 应用程序时使用 --inspect 参数，
 * Node.js 将会在指定的端口上启动一个调试服务器，
 * 以便你可以使用调试工具连接到该服务器进行调试。
 */
const result = spawn.sync('nodemon',['--inspect','--config', fromRoot('nodemon.json'), require.resolve('./server.run')], {
  stdio: 'inherit'
})

if(result.status !== 0){
  console.error('server start error...')
}

// 执行完成或出错时推出
process.exit(result.status)
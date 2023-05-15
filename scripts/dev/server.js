const spawn = require('cross-spawn')
const { fromRoot } = require('../utils')

/**
 * spawn.sync 执行命令
 * nodemon --config nodemon.json scripts/dev/server.run.js
 */
const result = spawn.sync('nodemon',['--config', fromRoot('nodemon.json'), require.resolve('./server.run')], {
  stdio: 'inherit'
})

if(result.status !== 0){
  console.error('server start error...')
}

// 执行完成或出错时推出
process.exit(result.status)
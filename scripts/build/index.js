const spawn = require('cross-spawn')

// 先 build client 端， 因为需要将 client 下的文件 client-asset-manifest.json copy 到 server/config 下
const result = spawn.sync('node', [require.resolve('./client')], {
  stdio: 'inherit'
})

if (result.status !== 0) {
  console.error('client build error ...')
} else if (result.status === 0) {
  // client 端 build 成功， 开始 build server 端
  const serverResult = spawn.sync('node', [require.resolve('./server')], {
    stdio: 'inherit',
  })
  process.exit(serverResult.status)

} else {
  process.exit(result.status)
}
const spawn = require('cross-spawn')
const { fromRoot } = require('../utils')

/**
 * spawn.sync 执行命令
 * webpack serve --config webpack.config.js
 */
const result = spawn.sync('webpack', ['serve', '--config', fromRoot('webpack.config.js')], {
  stdio: 'inherit'
})

if (result.status !== 0) {
  console.error('client start error...')
}




// TODO 编译完成后执行
//   const clientManifest = 'client/.build/js/asset-manifest.json'
//   const copyToServerManifest = 'server/config/client-asset-manifest.json'
//   console.log('hasFile(clientManifest)', hasFile(clientManifest))
//   if (!hasFile(clientManifest)) {
//     return
//   }
//   let changed = true
//   if (hasFile(copyToServerManifest)) {
//     const exitingManifest = require(fromRoot(copyToServerManifest))
//     const newManifest = require(fromRoot(clientManifest))
//     changed = !isEqual(exitingManifest, newManifest)
//   }
//   if (changed) {
//     fse.ensureDirSync(fromRoot('server/config'))
//     fse.copySync(
//       fromRoot(clientManifest),
//       fromRoot(copyToServerManifest)
//     )
//   }

process.exit(result.status)
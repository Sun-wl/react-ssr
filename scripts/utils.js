const path = require('path')
const fs = require('fs')
const { getIfUtils } = require('webpack-config-utils')

const { ifProduction: ifProd, ifDevelopment: ifDev } = getIfUtils(process.env.NODE_ENV || 'development', [
  'production',
  'development'
])

const cwd = process.cwd()

const fromRoot = (...p) => path.join(cwd, ...p)

const hasFile = (...p) => fs.existsSync(fromRoot(...p))

module.exports = {
  ifProd,
  ifDev,
  cwd,
  fromRoot,
  hasFile,
}
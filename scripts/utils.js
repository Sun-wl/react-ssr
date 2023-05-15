const path = require('path')


const cwd = process.cwd()

const fromRoot = (...p) => path.join(cwd, ...p)

module.exports = {
  cwd,
  fromRoot
}
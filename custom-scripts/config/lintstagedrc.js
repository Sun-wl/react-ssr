const { removeEmpty } = require('webpack-config-utils')
const { fromScripts } = require('../utils')

module.exports = removeEmpty({
  '**/*.+(js|ts|tsx)': [
    `node ${fromScripts('pre-commit/format')}`,
    `npm run lint`,
    'git add',
  ].filter(Boolean),
  '**/*.+(json|less|css|html|graphql)': [
    `node ${fromScripts('pre-commit/format')}`,
    'git add',
  ].filter(Boolean),
})

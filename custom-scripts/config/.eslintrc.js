const path = require('path')
const semver = require('semver')
const { fromRoot, cwd, fromConfig } = require('../utils')

const baseRules = {
  'no-unused-vars': [
    'error',
    { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
  ],

  'no-console': 'warn', // At least warn, to remind you to remove it if you forgot.
  'no-var': 'error', // let/const, FTW!
  strict: ['error', 'never'], // es6 modules have implicit strict

  'object-shorthand': 'error',

  // possible errors
  'no-cond-assign': 'error',
  'no-constant-condition': 'error',
  'no-control-regex': 'error',
  'no-debugger': 'error',
  'no-dupe-keys': 'error',
  'no-empty': 'error',
  'no-empty-character-class': 'error',
  'no-ex-assign': 'error',
  'no-extra-boolean-cast': 'error',
  'no-func-assign': 'error',
  'no-invalid-regexp': 'error',
  'no-negated-in-lhs': 'error',
  'no-obj-calls': 'error',
  'no-regex-spaces': 'error',
  'no-sparse-arrays': 'error',
  'no-unreachable': 'error',
  'use-isnan': 'error',
  'valid-typeof': 'error',

  // best practices
  'block-scoped-var': 'error',
  complexity: ['error', 16],
  'consistent-return': 'error',
  'default-case': 'error',
  'dot-notation': 'error',
  eqeqeq: 'error',
  'no-alert': 'error',
  'no-caller': 'error',
  'no-div-regex': 'error',
  'no-else-return': 'error',
  'no-eq-null': 'error',
  'no-eval': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-throw-literal': 'error',
  'no-fallthrough': 'error',
  'no-implied-eval': 'error',
  'no-labels': 'error',
  'no-iterator': 'error',
  'no-lone-blocks': 'error',
  'no-loop-func': 'error',
  'no-multi-str': 'error',
  'no-native-reassign': 'error',
  'no-new': 'error',
  'no-new-func': 'error',
  'no-new-wrappers': 'error',
  'no-octal': 'error',
  'no-octal-escape': 'error',
  'no-proto': 'error',
  'no-redeclare': 'error',
  'no-return-assign': 'error',
  'no-script-url': 'error',
  'no-self-compare': 'error',
  'no-sequences': 'error',
  'no-unused-expressions': 'error',
  'no-void': 'error',
  'no-with': 'error',
  radix: 'error',
  yoda: 'error',

  // variables
  'no-catch-shadow': 'error',
  'no-delete-var': 'error',
  'no-label-var': 'error',
  'no-shadow': 'error',
  'no-shadow-restricted-names': 'error',
  'no-undef': 'error',
  'no-undef-init': 'error',
  'no-use-before-define': ['error', { functions: false }],

  // node.js
  'handle-callback-err': 'error',
  'no-new-require': 'error',
  'no-path-concat': 'error',
  'no-process-exit': 'error',
  'no-restricted-modules': [1, 'nconf', 'underscore'],
  'no-sync': 'error',
  'callback-return': 'error',

  // stylistic issues
  'consistent-this': ['error', 'self'],
  'new-cap': 'error',
  'no-array-constructor': 'error',
  'no-lonely-if': 'error',
  'no-nested-ternary': 'error',
  'no-new-object': 'error',

  'max-depth': ['error', 8], // bring this down eventually
  'max-params': ['warn', 5],
  'max-statements': ['warn', 30],
  'no-bitwise': 'error',
}

const importRules = {
  'import/default': 'error',
  'import/dynamic-import-chunkname': 'off',
  'import/export': 'error',
  'import/exports-last': 'off', // it's my preference, but it would be annoying...
  'import/extensions': 'off',
  'import/first': 'error',
  'import/group-exports': 'off', // it's my preference, but it would annoy people to enforce.
  'import/max-dependencies': ['error', { max: 30 }], // I mean... the max should be 13 or something, but...
  'import/named': 'error',
  'import/namespace': 'error',
  'import/newline-after-import': 'off', // my preference but...
  'import/no-absolute-path': 'error',
  'import/no-amd': 'error',
  'import/no-anonymous-default-export': 'off',
  'import/no-commonjs': 'warn',
  'import/no-cycle': 'error',
  'import/no-default-export': 'off',
  'import/no-deprecated': 'off', // it's a WIP rule and sounds like an interesting "warn"
  'import/no-duplicates': 'error',
  'import/no-dynamic-require': 'off', // the only time we use require is for scripts, and we do dynamic stuff with scripts all over the place (not a problem)...
  'import/no-extraneous-dependencies': 'error',
  'import/no-internal-modules': 'off',
  'import/no-mutable-exports': 'error',
  'import/no-named-as-default-member': 'error',
  'import/no-named-as-default': 'off',
  'import/no-named-default': 'off',
  'import/no-named-export': 'off',
  'import/no-namespace': 'off',
  'import/no-nodejs-modules': 'off',
  'import/no-relative-parent-imports': 'off',
  'import/no-restricted-paths': 'off',
  'import/no-self-import': 'error',
  'import/no-unassigned-import': 'off', // I mean, it's not a good idea generally, but there are reasons for doing it so...
  'import/no-unresolved': 'error',
  'import/no-useless-path-segments': 'warn',
  'import/no-webpack-loader-syntax': 'off',
  'import/order': 'off', // I have preferences here, but it'd be annoying to enforce.
  'import/prefer-default-export': 'off',
  'import/unambiguous': 'off',
}

const promiseRules = {
  'promise/always-return': 'warn',
  'promise/avoid-new': 'off',
  'promise/catch-or-return': ['warn', { allowThen: true }],
  'promise/no-callback-in-promise': 'off',
  'promise/no-native': 'off',
  'promise/no-nesting': 'warn',
  'promise/no-new-statics': 'error',
  'promise/no-promise-in-callback': 'off',
  'promise/no-return-in-finally': 'error',
  'promise/no-return-wrap': ['error', { allowReject: true }],
  'promise/param-names': 'warn',
  'promise/prefer-await-to-callbacks': 'off', // we're still using a lot of callback-based APIs...
  'promise/prefer-await-to-then': 'off', // I want to add a .catch for a promise I don't care about...
  'promise/valid-params': 'error',
}

const reactRules = {
  'react/display-name': ['error', { ignoreTranspilerName: false }],
  'react/forbid-component-props': 'off',
  'react/forbid-elements': 'off',
  'react/forbid-foreign-prop-types': 'error',
  'react/forbid-prop-types': 'off',
  'react/jsx-boolean-value': 'off',
  'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }],
  'react/jsx-handler-names': 'off',
  'react/jsx-key': 'error',
  'react/jsx-no-bind': 'off',
  'react/jsx-no-comment-textnodes': 'error',
  'react/jsx-no-duplicate-props': 'error',
  'react/jsx-no-literals': 'off',
  'react/jsx-no-target-blank': 'error',
  'react/jsx-no-undef': 'error',
  'react/jsx-pascal-case': 'error',
  'react/jsx-sort-props': 'off',
  'react/jsx-uses-react': 'error',
  'react/jsx-uses-vars': 'error',
  'react/no-array-index-key': 'off', // sometimes you don't care about the issues or they don't apply
  'react/no-children-prop': 'off',
  'react/no-danger': 'off',
  'react/no-danger-with-children': 'error',
  'react/no-deprecated': 'error',
  'react/no-did-mount-set-state': 'error',
  'react/no-did-update-set-state': 'error',
  'react/no-direct-mutation-state': 'error',
  'react/no-find-dom-node': 'error',
  'react/no-is-mounted': 'error',
  'react/no-multi-comp': 'off',
  'react/no-render-return-value': 'error',
  'react/no-set-state': 'off',
  'react/no-string-refs': 'error',
  'react/no-unescaped-entities': 'warn',
  'react/no-unknown-property': 'error',
  'react/no-unused-prop-types': 'error',
  'react/no-will-update-set-state': 'error',
  'react/prefer-es6-class': 'off',
  'react/prefer-stateless-function': 'off',
  'react/prop-types': 'warn',
  'react/react-in-jsx-scope': 'error',
  'react/require-default-props': 'off', // sometimes the default value is undefined so that's fine...
  'react/require-optimization': 'off',
  'react/require-render-return': 'error',
  'react/self-closing-comp': 'error',
  'react/sort-comp': 'off',
  'react/sort-prop-types': 'off',
  'react/style-prop-object': 'error',
  'react/void-dom-elements-no-children': 'error',
  'react/default-props-match-prop-types': 'error',
  'react/jsx-curly-brace-presence': [
    'warn',
    { props: 'never', children: 'ignore' },
  ],
  'react/no-access-state-in-setstate': 'error',
  'react/no-redundant-should-component-update': 'error',
  'react/no-this-in-sfc': 'error',
  'react/no-typos': 'error',
  'react/no-unsafe': 'warn', // if you need it there should be a comment explaining why
  'react/no-unused-state': 'error',

  'react/boolean-prop-naming': 'off',
  'react/button-has-type': 'off',
  'react/destructuring-assignment': 'off',
  'react/forbid-dom-props': 'off',
  'react/jsx-max-depth': 'off',
  'react/jsx-sort-default-props': 'off',
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
}

const typescriptRules = {
  'no-undef': 'off',
  'no-unused-vars': 'off',
}

let oldestSupportedReactVersion = '16.5.2'
try {
  const pkg = require(path.join(cwd, 'package.json'))
  // eslint-disable-next-line prefer-object-spread
  const allDeps = Object.assign(
    { react: '16.5.2' },
    pkg.peerDependencies,
    pkg.devDependencies,
    pkg.dependencies,
  )
  oldestSupportedReactVersion = semver
    .validRange(allDeps.react)
    .replace(/[>=<|]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .sort(semver.compare)[0]
} catch (error) {
  // ignore error
}

module.exports = {
  // 指定解析器
  parser: '@babel/eslint-parser',
  // 指定解析器选项
  parserOptions: {
    babelOptions: {
      configFile: fromConfig('.babelrc.js'),
    },
  },
  // 指定插件
  plugins: [
    // 在这里添加你需要使用的插件
    'eslint-plugin-import',
    'eslint-plugin-promise',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
  ],
  // 指定规则
  rules: {
    // 在这里定义你的规则
    ...baseRules,
    ...importRules,
    ...promiseRules,
    ...reactRules,
    ...typescriptRules,
  },
  // 指定环境
  env: {
    // 在这里指定你的项目所处的环境，例如 browser、node 等
    node: true,
    browser: true,
    es6: true,
    jest: false,
    mocha: false,
  },
  // 其他配置选项
  extends: [
    // 'eslint-config-prettier/react',
    // 格式化工具，放最后
    'eslint-config-prettier',
  ].filter(Boolean),
  overrides: [
    {
      files: ['*'],
      excludedFiles: ['**/client/**', '**/server/**'],
      rules: { 'import/no-commonjs': 'off' },
    },
    {
      files: ['**/*.+(ts|tsx)'],
      rules: typescriptRules,
    },
  ].filter(Boolean),
  settings: {
    react: {
      version: oldestSupportedReactVersion,
    },
  },
}

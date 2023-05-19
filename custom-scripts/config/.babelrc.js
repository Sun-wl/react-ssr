const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.6.5',
      },
    ],
    '@babel/preset-react',
    [
      '@emotion/babel-preset-css-prop',
      {
        autoLabel: 'dev-only',
        labelFormat: '[local]',
        useBuiltIns: false,
        throwIfNamespace: true,
      },
    ],
  ],
}

module.exports = babelConfig

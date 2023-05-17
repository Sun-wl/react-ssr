const babelConfig = {
  presets: [
    [
      "@babel/preset-env",
      { useBuiltIns: "usage" }
    ],
    "@babel/preset-react",
    [
      "@emotion/babel-preset-css-prop",
      {
        "autoLabel": "dev-only",
        "labelFormat": "[local]",
        "useBuiltIns": false,
        "throwIfNamespace": true
      }
    ]
  ]
}

module.exports = babelConfig
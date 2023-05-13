module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
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
        }
      },
    ]
  }
};

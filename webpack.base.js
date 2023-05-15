const { fromRoot } = require("./scripts/utils");


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
            cacheDirectory: true,
            ...(require(fromRoot('.babelrc.js')))
          }
        }
      },
    ]
  }
};

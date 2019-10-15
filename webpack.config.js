const path = require(`path`);

module.exports = {
  entry: path.join(__dirname, `src/index.js`),
  output: {
    path: path.join(__dirname, `public`),
    filename: `bundle.js`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`
        }
      }
    ]
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    port: 1337,
    open: true,
    compress: false
  }
};

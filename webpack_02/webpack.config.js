var webpack = require('webpack')

module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by landerqi')
  ],
  resolve: {
    alias: {
        extensions: ['', '.js', '.es6'],
        jquery: "./lib/jquery1.9.1.min.js"
    }
  }
}

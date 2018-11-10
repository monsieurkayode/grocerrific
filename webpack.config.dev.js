const webpack = require('webpack');
const { resolve } = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

common.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    resolve(__dirname, './client/src/index.js')
  ],
  devServer: {
    publicPath: '/',
    proxy: {
      '/api': 'http://localhost:5000',
      '/api/v1/': 'http://localhost:5000'
    },
    hot: true,
    historyApiFallback: true,
    compress: true,
  },
});

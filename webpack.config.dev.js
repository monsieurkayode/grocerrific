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
    hot: true,
    historyApiFallback: true,
    compress: true,
  },
});

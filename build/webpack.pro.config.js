'use strict';

const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.base.config')

module.exports = merge(commonConfig, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
});
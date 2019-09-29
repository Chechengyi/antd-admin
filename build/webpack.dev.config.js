'use strict';

/* eslint-disable */

const path = require('path');
const merge = require('webpack-merge');
const commenConfig = require('./webpack.base.config');
const webpack = require('webpack');
const mockUrlObj = require('../dev.mock');
const bodyParser = require('body-parser');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const port = 8080;

const devWebpackConfig = merge(commenConfig, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  plugins: [
    ...commenConfig.plugins,
    //开启HMR(热替换功能,替换更新部分,不重载页面！) 相当于在命令行加 --hot
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: port,
    open: true,
    proxy: {},  // 配置代理
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    publicPath: '/',
    before(app) {
      // 返回模拟请求数据
      Object.keys(mockUrlObj).forEach((key) => {
        const [type, url] = key.split(' ');
        app.use(url, bodyParser.json());
        if (type === 'GET') {
          app.get(url, mockUrlObj[key]);
        } else if (type === 'POST') {
          app.post(url, mockUrlObj[key]);
        }
      });
    },
    disableHostCheck: true,   // 解决内网穿透之后 invalid Header 问题
    quiet: true,   // 使用webpack-server 清除输出的打包信息
    // hot: true,
    // hotOnly:true
  }
});

module.exports = new Promise( (resolve, reject)=> {
  devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [`项目运行在${port}端口`]
      // clearConsole: true
    }
  }));
  resolve(devWebpackConfig)
});

/* eslint-disable no-new */

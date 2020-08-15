'use strict';
/* eslint-disable */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const themeColor = require('../theme');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts',
    vendor: [
      'react',
      'react-dom'
    ]
  },
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: '[name].js',
  //   publicPath: '/'
  // },
  module: {
    rules: [
      {
        test: /(\.tsx|\.ts)$/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.js|\.jsx?/, // 支持 js 和 jsx
        include: [
          path.resolve(__dirname, '../src'), // src 目录下的才需要经过 babel-loader 处理
        ],
        loader: 'babel-loader',
      },
      { // 正常网页中的样式处理
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            },
          }],
        exclude: /node_modules/,
      },
      // 正常网页中的less文件样式处理
      {
        test: /\.less$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true,
            },
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: themeColor
            },
          }],
        include: /node_modules/,
      }
    ],
  },

  // 代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, '../src')
    ],
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx", ".tsx", ".ts", ".d.ts"],
    alias: {
      "@models": path.resolve(__dirname, '../src/models'),
      "@components": path.resolve(__dirname, '../src/components'),
      "@services": path.resolve(__dirname, '../src/services'),
      "@hoc": path.resolve(__dirname, '../src/hoc'),
      "@hooks": path.resolve(__dirname, '../src/hooks'),
      "@utils": path.resolve(__dirname, '../src/utils'),
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html'
    }),
    new ExtractTextPlugin('index.css'),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
};

/* eslint-disable no-new */

'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mockUrlObj = require('./dev.mock');
const bodyParser = require('body-parser');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const themeColor = require('./theme');

const port = 3000;  // 项目运行的端口

const devWebpackConfig = {
  entry: {
    index: './src/index.ts',
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /(\.tsx|\.ts)$/, 
        // include: [
        //   path.resolve(__dirname, '../src'), // src 目录下的才需要经过 babel-loader 处理
        // ],
        // loader: 'babel-loader',
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.js|\.jsx?/, // 支持 js 和 jsx
        include: [
          path.resolve(__dirname, 'src'), // src 目录下的才需要经过 babel-loader 处理
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
        }],
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
              // sourceMap: true,
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
      path.resolve(__dirname, 'src')
    ],
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx", ".tsx", ".ts", ".d.ts"],
  },

  plugins: [
    // new UglifyPlugin(), 
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    }),
    new ExtractTextPlugin('index.css'),
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
  devServer: {
    host: '0.0.0.0',
    port: port,
    proxy: {},
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
    quiet: true   // 使用webpack-server 清除输出的打包信息
  }
};

module.exports = new Promise( (resolve, reject)=> {
  devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [`项目运行在${port}端口`]
      // clearConsole: true
    }
  }));
  resolve(devWebpackConfig)
});

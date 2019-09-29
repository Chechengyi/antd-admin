
/* eslint-disable */

process.env.NODE_ENV = 'production';
// "build": "webpack --config=webpack.pro.config --mode production"
const webpack = require('webpack');
const rm = require('rimraf');
const webpackConfig = require('./webpack.pro.config');

// 每次打包之前删除掉之前的打包输出文件
rm('../dist', function (err) {
  if (err) throw err;
  webpack(webpackConfig, function(err, stats){
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    if (stats.hasErrors()) {
      console.log('打包失败');
      process.exit(1)
    }
  })
});

/* eslint-disable no-new */

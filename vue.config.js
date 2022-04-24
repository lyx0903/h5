const path = require('path')
module.exports = {
  publicPath: './',
  productionSourceMap: false,
  // devServer: {
  //   port: 8080, // 端口号
  //   open: true, // 启动后自动打开页面
  //   proxy: {
  //     '/api': {
  //       target: 'http://192.168.0.103:3000',  // 后端地址
  //       pathRewrite: { '/api': '' },
  //       secure: false,
  //     },
  //   },
  // },
  // configureWebpack: {
  //   resolve: {
  //     // configuration options
  //     alias: {
  //       '@': path.resolve(__dirname, 'src'),
  //     },
  //   },
  // },
};
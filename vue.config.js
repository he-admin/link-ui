const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin,这样在组件中直接使用对应的样式变量，不需要引入文件
        prependData: `
          @import "@/assets/scss/variable.scss";
        `
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  pages: {
    index: path.join(__dirname, './examples/main.js'),
  },
  // configureWebpack: (config) => {
  //   config.resolve.alias['@'] = path.join(__dirname, './examples');
  //   config.output = {
  //     libraryExport: 'default'
  //   }
  // }, // 修改webpack的打包路径，默认为src，改为examples
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/src')
      .end()
      .use('babel')
      .loader('babel-loader')
  }
}

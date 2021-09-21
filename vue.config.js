const path = require('path');

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: ["./src/styles/colors/index.less", "./src/styles/sizes/index.less"] //引入全局less文件
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

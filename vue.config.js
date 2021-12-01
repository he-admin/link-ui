const path = require('path');

module.exports = {
  productionSourceMap: false,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: ["./src/styles/colors/index.less", "./src/styles/sizes/index.less", "./src/styles/mixins/index.less"] //引入全局less文件
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
      //.add('/src') // 表示添加src,所以虽然eslintignore忽略了无用
      .end()
      .use('babel')
      .loader('babel-loader');
    // config.module.rule('md')
    //   .test(/\.md$/)
    //   .use('vue-loader-v16')
    //   .loader('vue-loader-v16')
    //   .end()
    //   .use('@vant/markdown-loader')
    //   .loader('@vant/markdown-loader')
    //   .end()
    //
    // config.module
    //   .rule('eslint')
    //   .test(/\.(vue|(j|t)sx?)$/)
    //   .pre()
    //   .enforce('pre')
    //   .exclude
    //   // 避免 md 语法报错
    //   .add(/\.md/)


    // config.module
    //   .rule('md')
    //   .test(/\.md/)
    //   .use('vue-loader-v16')
    //   .loader('vue-loader-v16')
    //   .options({
    //     compiler: require('@vue/compiler-sfc'),
    //   })
    //   .end()
    //   .use(path.resolve(__dirname,'./build/md-loader/index.js'))
    //   .loader(path.resolve(__dirname,'./build/md-loader/index.js'))

    // config.module
    //   .rule('md')
    //   .test(/\.md$/)
    //   .use('vue-loader-v16')
    //   .loader('vue-loader-v16')
    //   .tap(() => ({
    //     compilerOptions: {
    //       preserveWhitespace: false,
    //     },
    //   }))
    //   .end()
    //   .use('md-loader')
    //   .loader(path.resolve(__dirname, './build/md-loader/index.js'))
    //   .end();

    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader-v16')
      .loader('vue-loader-v16')
      .options({
        compiler: require('@vue/compiler-sfc'),
      })
      .end()
      .use(path.resolve('./build/md-loader/index.js'))
      .loader(path.resolve('./build/md-loader/index.js'))
  }
}

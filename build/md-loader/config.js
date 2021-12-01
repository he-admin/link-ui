const Config = require('markdown-it-chain')
const anchorPlugin = require('markdown-it-anchor')
const slugify = require('transliteration').slugify

//const hljs = require('highlight.js')
const {getLanguage,highlight} = require('highlight.js')

const containers = require('./containers')
const overWriteFenceRule = require('./fence')

const config = new Config()

// 配置markdown-it常规代码高亮，相关文档：https://markdown-it.github.io/markdown-it/#MarkdownIt.new
const highlightHtml = (str, lang) => {
  if (!lang || !getLanguage(lang)) {
    return '<pre><code class="hljs">' + str + '</code></pre>'
  }
  const html = highlight(lang, str, true, undefined).value
  return `<pre><code class="hljs language-${lang}">${html}</code></pre>`
}

config.options
  .html(true)
  .highlight(highlightHtml)
  .end()

  .plugin('containers')
  .use(containers)
  .end()

  .plugin('anchor')
  .use(anchorPlugin, [{
    level: 2,
    slugify: slugify,
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: ''
  }])
  .end()

const md = config.toMd()
overWriteFenceRule(md)

module.exports = md

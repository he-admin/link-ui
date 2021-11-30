(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22636a"],{e867:function(t,e,n){"use strict";n.r(e);var l=n("7a23"),d={class:"market-doc-container"},a=Object(l["j"])("h2",{id:"buttonan-niu"},[Object(l["j"])("a",{class:"header-anchor",href:"#buttonan-niu"}),Object(l["l"])(" Button按钮")],-1),o=Object(l["j"])("h3",{id:"ji-ben-shi-yong"},[Object(l["j"])("a",{class:"header-anchor",href:"#ji-ben-shi-yong"}),Object(l["l"])(" 基本使用")],-1),u=Object(l["j"])("pre",null,[Object(l["j"])("code",{class:"html"},'<template>\n  <div style="display: flex">\n  <lku-button type="primary">primary</lku-button>\n    <lku-button>default</lku-button>\n    <lku-button type="danger">danger</lku-button>\n    <lku-button type="dashed">dashed</lku-button>\n    <lku-button type="link" href="http://www.baidu.com" target="_blank">Link Button</lku-button>\n</div>\n</template>\n')],-1),i=Object(l["j"])("h3",{id:"sizean-niu-chi-cun"},[Object(l["j"])("a",{class:"header-anchor",href:"#sizean-niu-chi-cun"}),Object(l["l"])(" Size按钮尺寸")],-1),r=Object(l["j"])("pre",null,[Object(l["j"])("code",{class:"html"},'<template>\n  <div style="display: flex">\n  <lku-button size="small">small</lku-button>\n<lku-button>medium</lku-button>\n<lku-button size="large" >large</lku-button>\n</div>\n</template>\n')],-1),c=Object(l["j"])("h3",{id:"icontu-biao-he-loadingzhuang-tai"},[Object(l["j"])("a",{class:"header-anchor",href:"#icontu-biao-he-loadingzhuang-tai"}),Object(l["l"])(" Icon图标和Loading状态")],-1),f=Object(l["j"])("pre",null,[Object(l["j"])("code",{class:"html"},'<template>\n <div style="display: flex">\n <lku-button type="primary" icon="search">搜索</lku-button>\n<lku-button type="danger" icon="delete">删除</lku-button>\n<lku-button loading>加载中</lku-button>\n<lku-button icon="download" :loading="loading" @click="handleClick">{{loading?\'下载中\':\'下载\'}}</lku-button>\n</div>\n</template>\n<script>\nimport {ref} from \'vue\'\n\nexport default {\n  setup() {\n    const loading = ref(false);\n    const handleClick = () => {\n      loading.value = true;\n      setTimeout(() => {\n        loading.value = false;\n      }, 2000)\n    }\n    return {loading, handleClick}\n  }\n}\n<\/script>\n')],-1),s=Object(l["j"])("h3",{id:"jin-yong-zhuang-tai"},[Object(l["j"])("a",{class:"header-anchor",href:"#jin-yong-zhuang-tai"}),Object(l["l"])(" 禁用状态")],-1),b=Object(l["j"])("pre",null,[Object(l["j"])("code",{class:"html"},'<template>\n  <div style="display: flex">\n  <lku-button type="primary" disabled>primary</lku-button>\n    <lku-button disabled>default</lku-button>\n    <lku-button type="danger" disabled>danger</lku-button>\n    <lku-button type="dashed" disabled>dashed</lku-button>\n    <lku-button type="link" disabled href="http://www.baidu.com" target="_blank">Link Button</lku-button>\n</div>\n</template>\n')],-1),h=Object(l["j"])("h3",{id:"blockkuai-ji-an-niu"},[Object(l["j"])("a",{class:"header-anchor",href:"#blockkuai-ji-an-niu"}),Object(l["l"])(" Block块级按钮")],-1),y=Object(l["j"])("pre",null,[Object(l["j"])("code",{class:"html"},'<template>\n  <lku-button type="primary" block>primary</lku-button>\n  <lku-button block>default</lku-button>\n  <lku-button type="danger" block>danger</lku-button>\n  <lku-button type="dashed" block>dashed</lku-button>\n  <lku-button type="link" href="http://www.baidu.com" target="_blank" block>Link Button</lku-button>\n</template>\n')],-1),g=Object(l["k"])('<h3 id="button-attributes"><a class="header-anchor" href="#button-attributes"></a> Button Attributes</h3><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:left;">说明</th><th style="text-align:left;">类型</th><th style="text-align:left;">可选值</th><th style="text-align:left;">默认值</th><th style="text-align:left;">示例</th></tr></thead><tbody><tr><td style="text-align:left;">type</td><td style="text-align:left;">按钮类型</td><td style="text-align:left;">String</td><td style="text-align:left;"><code>primary</code>、<code>default</code>、<code>dashed</code>、<code>danger</code>、<code>link</code></td><td style="text-align:left;"><code>default</code></td><td style="text-align:left;"><code>danger</code></td></tr><tr><td style="text-align:left;">block</td><td style="text-align:left;">是否成为块级按钮，会自适应铺满父容器</td><td style="text-align:left;">Boolean</td><td style="text-align:left;"><code>true</code>、<code>false</code></td><td style="text-align:left;"><code>false</code></td><td style="text-align:left;"><code>true</code></td></tr><tr><td style="text-align:left;">size</td><td style="text-align:left;">按钮尺寸</td><td style="text-align:left;">String</td><td style="text-align:left;"><code>large</code>、<code>default</code>、<code>small</code></td><td style="text-align:left;"><code>default</code></td><td style="text-align:left;">20</td></tr><tr><td style="text-align:left;">icon</td><td style="text-align:left;">按钮图标</td><td style="text-align:left;">String</td><td style="text-align:left;">所有组件库支持的icon</td><td style="text-align:left;">-</td><td style="text-align:left;"><code>search</code></td></tr><tr><td style="text-align:left;">loading</td><td style="text-align:left;">loading状态，加载过程中禁止重复点击</td><td style="text-align:left;">Boolean</td><td style="text-align:left;"><code>true</code>、<code>false</code></td><td style="text-align:left;"><code>false</code></td><td style="text-align:left;"><code>true</code></td></tr><tr><td style="text-align:left;">disabled</td><td style="text-align:left;">是否禁用</td><td style="text-align:left;">Boolean</td><td style="text-align:left;"><code>true</code>、<code>false</code></td><td style="text-align:left;"><code>false</code></td><td style="text-align:left;"><code>true</code></td></tr><tr><td style="text-align:left;">href</td><td style="text-align:left;">按钮作为链接跳转，功能类似于a标签的href属性</td><td style="text-align:left;">String</td><td style="text-align:left;">-</td><td style="text-align:left;">-</td><td style="text-align:left;"><code>https://www.baidu.com</code></td></tr><tr><td style="text-align:left;">target</td><td style="text-align:left;">按钮作为链接跳转的方式，类似于a标签的target属性</td><td style="text-align:left;">String</td><td style="text-align:left;"><code>_blank</code> 、<code>_parent</code> 、<code>_self</code> 、<code>_top</code> 、其他自定义的name字符串；</td><td style="text-align:left;"><code>_blank</code></td><td style="text-align:left;"><code>_self</code></td></tr></tbody></table><h3 id="button-events"><a class="header-anchor" href="#button-events"></a> Button Events</h3><table><thead><tr><th style="text-align:left;">事件名</th><th style="text-align:left;">说明</th><th style="text-align:left;">回调函数参数</th></tr></thead><tbody><tr><td style="text-align:left;">click</td><td style="text-align:left;">点击按钮时触发</td><td style="text-align:left;">-</td></tr></tbody></table>',4);function k(t,e,n,k,p,m){var j=Object(l["J"])("element-demo0"),x=Object(l["J"])("demo-block"),O=Object(l["J"])("element-demo1"),v=Object(l["J"])("element-demo2"),_=Object(l["J"])("element-demo3"),w=Object(l["J"])("element-demo4");return Object(l["A"])(),Object(l["i"])("section",d,[a,o,Object(l["m"])(x,null,{source:Object(l["R"])((function(){return[Object(l["m"])(j)]})),highlight:Object(l["R"])((function(){return[u]})),_:1}),i,Object(l["m"])(x,null,{source:Object(l["R"])((function(){return[Object(l["m"])(O)]})),highlight:Object(l["R"])((function(){return[r]})),_:1}),c,Object(l["m"])(x,null,{source:Object(l["R"])((function(){return[Object(l["m"])(v)]})),highlight:Object(l["R"])((function(){return[f]})),_:1}),s,Object(l["m"])(x,null,{source:Object(l["R"])((function(){return[Object(l["m"])(_)]})),highlight:Object(l["R"])((function(){return[b]})),_:1}),h,Object(l["m"])(x,null,{source:Object(l["R"])((function(){return[Object(l["m"])(w)]})),highlight:Object(l["R"])((function(){return[y]})),_:1}),g])}var p=n("5530"),m=n("1487"),j=n.n(m),x={name:"component-doc",components:{"element-demo0":function(){var t=l["l"],e=l["J"],n=l["R"],d=l["m"],a=l["A"],o=l["i"];function u(l,u){var i=e("lku-button");return a(),o("div",{style:{display:"flex"}},[d(i,{type:"primary"},{default:n((function(){return[t("primary")]})),_:1}),d(i,null,{default:n((function(){return[t("default")]})),_:1}),d(i,{type:"danger"},{default:n((function(){return[t("danger")]})),_:1}),d(i,{type:"dashed"},{default:n((function(){return[t("dashed")]})),_:1}),d(i,{type:"link",href:"http://www.baidu.com",target:"_blank"},{default:n((function(){return[t("Link Button")]})),_:1})])}var i={};return Object(p["a"])({mounted:function(){this.$nextTick((function(){var t=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(t,j.a.highlightBlock)}))},render:u},i)}(),"element-demo1":function(){var t=l["l"],e=l["J"],n=l["R"],d=l["m"],a=l["A"],o=l["i"];function u(l,u){var i=e("lku-button");return a(),o("div",{style:{display:"flex"}},[d(i,{size:"small"},{default:n((function(){return[t("small")]})),_:1}),d(i,null,{default:n((function(){return[t("medium")]})),_:1}),d(i,{size:"large"},{default:n((function(){return[t("large")]})),_:1})])}var i={};return Object(p["a"])({mounted:function(){this.$nextTick((function(){var t=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(t,j.a.highlightBlock)}))},render:u},i)}(),"element-demo2":function(){var t=l["l"],e=l["J"],n=l["R"],d=l["m"],a=l["M"],o=l["A"],u=l["i"];function i(l,i){var r=e("lku-button");return o(),u("div",{style:{display:"flex"}},[d(r,{type:"primary",icon:"search"},{default:n((function(){return[t("搜索")]})),_:1}),d(r,{type:"danger",icon:"delete"},{default:n((function(){return[t("删除")]})),_:1}),d(r,{loading:""},{default:n((function(){return[t("加载中")]})),_:1}),d(r,{icon:"download",loading:l.loading,onClick:l.handleClick},{default:n((function(){return[t(a(l.loading?"下载中":"下载"),1)]})),_:1},8,["loading","onClick"])])}var r=l["F"],c={setup:function(){var t=r(!1),e=function(){t.value=!0,setTimeout((function(){t.value=!1}),2e3)};return{loading:t,handleClick:e}}};return Object(p["a"])({mounted:function(){this.$nextTick((function(){var t=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(t,j.a.highlightBlock)}))},render:i},c)}(),"element-demo3":function(){var t=l["l"],e=l["J"],n=l["R"],d=l["m"],a=l["A"],o=l["i"];function u(l,u){var i=e("lku-button");return a(),o("div",{style:{display:"flex"}},[d(i,{type:"primary",disabled:""},{default:n((function(){return[t("primary")]})),_:1}),d(i,{disabled:""},{default:n((function(){return[t("default")]})),_:1}),d(i,{type:"danger",disabled:""},{default:n((function(){return[t("danger")]})),_:1}),d(i,{type:"dashed",disabled:""},{default:n((function(){return[t("dashed")]})),_:1}),d(i,{type:"link",disabled:"",href:"http://www.baidu.com",target:"_blank"},{default:n((function(){return[t("Link Button")]})),_:1})])}var i={};return Object(p["a"])({mounted:function(){this.$nextTick((function(){var t=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(t,j.a.highlightBlock)}))},render:u},i)}(),"element-demo4":function(){var t=l["l"],e=l["J"],n=l["R"],d=l["m"],a=l["a"],o=l["A"],u=l["i"];function i(l,i){var r=e("lku-button");return o(),u(a,null,[d(r,{type:"primary",block:""},{default:n((function(){return[t("primary")]})),_:1}),d(r,{block:""},{default:n((function(){return[t("default")]})),_:1}),d(r,{type:"danger",block:""},{default:n((function(){return[t("danger")]})),_:1}),d(r,{type:"dashed",block:""},{default:n((function(){return[t("dashed")]})),_:1}),d(r,{type:"link",href:"http://www.baidu.com",target:"_blank",block:""},{default:n((function(){return[t("Link Button")]})),_:1})],64)}var r={};return Object(p["a"])({mounted:function(){this.$nextTick((function(){var t=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(t,j.a.highlightBlock)}))},render:i},r)}()}};x.render=k;e["default"]=x}}]);
//# sourceMappingURL=chunk-2d22636a.1785ef8d.js.map
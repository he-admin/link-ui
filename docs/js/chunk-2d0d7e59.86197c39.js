(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d7e59"],{7989:function(e,t,l){"use strict";l.r(t);var n=l("7a23"),a={class:"market-doc-container"},u=Object(n["k"])('<h2 id="selectxuan-ze-qi"><a class="header-anchor" href="#selectxuan-ze-qi"></a> Select选择器</h2><h3 id="ji-ben-shi-yong"><a class="header-anchor" href="#ji-ben-shi-yong"></a> 基本使用</h3><h5 id="zhi-chi-dan-xuan-duo-xuan"><a class="header-anchor" href="#zhi-chi-dan-xuan-duo-xuan"></a> 支持单选、多选</h5>',3),i=Object(n["j"])("pre",null,[Object(n["j"])("code",{class:"html"},'<template>\n  <div class="doc-select" style="display: flex;align-items: center">\n    <lku-select v-model="value1">\n      <lku-option v-for="item in languageList" :key="item.value" :value="item.value">\n        {{ item.name }}\n      </lku-option>\n    </lku-select>\n    <lku-select v-model="value2" multiple>\n      <lku-option v-for="item in multipleList" :key="item.value" :value="item.value">\n        {{ item.name }}\n      </lku-option>\n    </lku-select>\n    <span>选中的值：{{value2}}</span>\n  </div>\n</template>\n\n<script>\nimport {ref} from \'vue\'\n\nexport default {\n  setup() {\n    const value1 = ref(1);\n    const languageList = ref([{name: \'JavaScript\', value: 1}, {name: \'Python\', value: 2}, {\n      name: \'NodeJs\',\n      value: 3\n    }, {name: \'GoLang\', value: 4}]);\n    const multipleList = ref([{name: \'苹果\', value: 5}, {name: \'香蕉\', value: 6}, {name: \'哈密瓜\', value: 7}, {\n      name: \'西瓜\',\n      value: 8\n    }])\n    const value2 = ref([5, 6])\n    return {languageList, value1, multipleList, value2}\n  }\n}\n<\/script>\n')],-1),o=Object(n["j"])("h3",{id:"jin-yong"},[Object(n["j"])("a",{class:"header-anchor",href:"#jin-yong"}),Object(n["l"])(" 禁用")],-1),r=Object(n["j"])("h5",{id:"zhi-chi-jin-yong-selectzheng-ge-xia-la-kuang-he-optionxuan-xiang"},[Object(n["j"])("a",{class:"header-anchor",href:"#zhi-chi-jin-yong-selectzheng-ge-xia-la-kuang-he-optionxuan-xiang"}),Object(n["l"])(" 支持禁用select整个下拉框和option选项")],-1),d=Object(n["j"])("pre",null,[Object(n["j"])("code",{class:"html"},'<template>\n  <div class="doc-select" style="display: flex;align-items: center">\n    <lku-select v-model="value1" disabled placeholder="select被禁用">\n      <lku-option v-for="item in languageList" :key="item.value" :value="item.value">\n        {{ item.name }}\n      </lku-option>\n    </lku-select>\n    <lku-select v-model="value2" multiple>\n      <lku-option v-for="item in multipleList" :key="item.value" :value="item.value" :disabled="item.disabled">\n        {{ item.name }}\n      </lku-option>\n    </lku-select>\n  </div>\n</template>\n\n<script>\nimport {ref} from \'vue\'\n\nexport default {\n  setup() {\n    const value1 = ref(1);\n    const languageList = ref([{name: \'JavaScript\', value: 1}, {name: \'Python\', value: 2}, {\n      name: \'NodeJs\',\n      value: 3\n    }, {name: \'GoLang\', value: 4}]);\n    const multipleList = ref([{name: \'苹果\', value: 5,disabled:true}, {name: \'香蕉\', value: 6,disabled: true}, {name: \'哈密瓜\', value: 7}, {\n      name: \'西瓜\',\n      value: 8\n    }])\n    const value2 = ref([7])\n    return {languageList, value1, multipleList, value2}\n  }\n}\n<\/script>\n\n')],-1),s=Object(n["j"])("h3",{id:"fen-zu"},[Object(n["j"])("a",{class:"header-anchor",href:"#fen-zu"}),Object(n["l"])(" 分组")],-1),c=Object(n["j"])("pre",null,[Object(n["j"])("code",{class:"html"},"<template>\n  <lku-select placeholder=\"请选择\" multiple v-model=\"value\">\n    <lku-options-group v-for=\"(group,index) in list\" :label=\"group.label\" :key=\"index\">\n      <lku-option v-for=\"option in group.list\" :value=\"option.value\" :key=\"option.value\">\n        {{ option.name }}\n      </lku-option>\n    </lku-options-group>\n  </lku-select>\n</template>\n<script>\nimport {ref} from 'vue'\n\nexport default {\n  setup() {\n    const value = ref([1, 3, 5]);\n    const list = ref([{\n      label: '水果',\n      list: [{name: '苹果', value: 1}, {name: '香蕉', value: 2}, {name: '火龙果', value: 3}, {name: '哈密瓜', value: 4}]\n    }, {\n      label: '肉类',\n      list: [{name: '肌肉', value: 5}, {name: '猪肉', value: 6}, {name: '牛肉', value: 7}, {name: '肥肉', value: 8}]\n    }])\n    return {\n      value, list\n    }\n  }\n}\n<\/script>\n")],-1),m=Object(n["j"])("h3",{id:"qing-chu"},[Object(n["j"])("a",{class:"header-anchor",href:"#qing-chu"}),Object(n["l"])(" 清除")],-1),f=Object(n["j"])("pre",null,[Object(n["j"])("code",{class:"html"},'<template>\n  <div class="doc-select" style="display: flex;align-items: center">\n    <lku-select v-model="value" clearable>\n      <lku-option v-for="item in languageList" :key="item.value" :value="item.value">\n        {{ item.name }}\n      </lku-option>\n    </lku-select>\n  </div>\n</template>\n\n<script>\nimport {ref} from \'vue\'\n\nexport default {\n  setup() {\n    const value = ref(1);\n    const languageList = ref([{name: \'JavaScript\', value: 1}, {name: \'Python\', value: 2}, {\n      name: \'NodeJs\', value: 3}, {name: \'GoLang\', value: 4}]);\n    return {value,languageList}\n  }\n}\n<\/script>\n\n')],-1),v=Object(n["k"])('<h3 id="select-attributes"><a class="header-anchor" href="#select-attributes"></a> Select Attributes</h3><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:left;">说明</th><th style="text-align:left;">类型</th><th style="text-align:left;">可选值</th><th style="text-align:left;">默认值</th><th style="text-align:left;">必填</th></tr></thead><tbody><tr><td style="text-align:left;">value</td><td style="text-align:left;">Select组件绑定的值，可使用v-model绑定</td><td style="text-align:left;">单选时： <code>String | Number</code>，多选时： Array</td><td style="text-align:left;">-</td><td style="text-align:left;">-</td><td style="text-align:left;">是</td></tr><tr><td style="text-align:left;">multiple</td><td style="text-align:left;">是否开启多选</td><td style="text-align:left;">Boolean</td><td style="text-align:left;"><code>true | false</code></td><td style="text-align:left;">false</td><td style="text-align:left;">否</td></tr><tr><td style="text-align:left;">placeholder</td><td style="text-align:left;">选择框默认填默认占位符内容</td><td style="text-align:left;">String</td><td style="text-align:left;">-</td><td style="text-align:left;">请选择</td><td style="text-align:left;">否</td></tr><tr><td style="text-align:left;">disabled</td><td style="text-align:left;">是否禁用select选择框</td><td style="text-align:left;">Boolean</td><td style="text-align:left;"><code>true | false</code></td><td style="text-align:left;">false</td><td style="text-align:left;">否</td></tr><tr><td style="text-align:left;">clearable</td><td style="text-align:left;">是否开启清除功能</td><td style="text-align:left;">Boolean</td><td style="text-align:left;"><code>true | false</code></td><td style="text-align:left;">false</td><td style="text-align:left;">否</td></tr></tbody></table><h3 id="select-events"><a class="header-anchor" href="#select-events"></a> Select Events</h3><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:left;">说明</th><th style="text-align:left;">回调函数参数</th></tr></thead><tbody><tr><td style="text-align:left;">change</td><td style="text-align:left;">选中项发生变化触发的回调函数</td><td style="text-align:left;">选中的值</td></tr><tr><td style="text-align:left;">clear</td><td style="text-align:left;">清空选项时触发</td><td style="text-align:left;">-</td></tr></tbody></table><h3 id="selectgroup-attributes"><a class="header-anchor" href="#selectgroup-attributes"></a> SelectGroup Attributes</h3><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:left;">说明</th><th style="text-align:left;">类型</th><th style="text-align:left;">可选值</th><th style="text-align:left;">默认值</th><th style="text-align:left;">必填</th></tr></thead><tbody><tr><td style="text-align:left;">label</td><td style="text-align:left;">每个select-group绑定的label</td><td style="text-align:left;">String</td><td style="text-align:left;">-</td><td style="text-align:left;">-</td><td style="text-align:left;">是</td></tr></tbody></table><h3 id="option-attributes"><a class="header-anchor" href="#option-attributes"></a> Option Attributes</h3><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:left;">说明</th><th style="text-align:left;">类型</th><th style="text-align:left;">可选值</th><th style="text-align:left;">默认值</th><th style="text-align:left;">必填</th></tr></thead><tbody><tr><td style="text-align:left;">disabled</td><td style="text-align:left;">是否禁用option选项</td><td style="text-align:left;">Boolean</td><td style="text-align:left;"><code>true | false</code></td><td style="text-align:left;">false</td><td style="text-align:left;">否</td></tr></tbody></table>',8);function h(e,t,l,h,g,p){var y=Object(n["J"])("element-demo0"),b=Object(n["J"])("demo-block"),x=Object(n["J"])("element-demo1"),j=Object(n["J"])("element-demo2"),k=Object(n["J"])("element-demo3");return Object(n["A"])(),Object(n["i"])("section",a,[u,Object(n["m"])(b,null,{source:Object(n["R"])((function(){return[Object(n["m"])(y)]})),highlight:Object(n["R"])((function(){return[i]})),_:1}),o,r,Object(n["m"])(b,null,{source:Object(n["R"])((function(){return[Object(n["m"])(x)]})),highlight:Object(n["R"])((function(){return[d]})),_:1}),s,Object(n["m"])(b,null,{source:Object(n["R"])((function(){return[Object(n["m"])(j)]})),highlight:Object(n["R"])((function(){return[c]})),_:1}),m,Object(n["m"])(b,null,{source:Object(n["R"])((function(){return[Object(n["m"])(k)]})),highlight:Object(n["R"])((function(){return[f]})),_:1}),v])}var g=l("5530"),p=(l("b0c0"),l("1487")),y=l.n(p),b={name:"component-doc",components:{"element-demo0":function(){var e=n["H"],t=n["a"],l=n["A"],a=n["i"],u=n["M"],i=n["l"],o=n["J"],r=n["R"],d=n["g"],s=n["m"],c=n["j"];function m(n,m){var f=o("lku-option"),v=o("lku-select");return l(),a("div",{class:"doc-select",style:{display:"flex","align-items":"center"}},[s(v,{modelValue:n.value1,"onUpdate:modelValue":function(e){return n.value1=e}},{default:r((function(){return[(l(!0),a(t,null,e(n.languageList,(function(e){return l(),d(f,{key:e.value,value:e.value},{default:r((function(){return[i(u(e.name),1)]})),_:2},1032,["value"])})),128))]})),_:1},8,["modelValue","onUpdate:modelValue"]),s(v,{modelValue:n.value2,"onUpdate:modelValue":function(e){return n.value2=e},multiple:""},{default:r((function(){return[(l(!0),a(t,null,e(n.multipleList,(function(e){return l(),d(f,{key:e.value,value:e.value},{default:r((function(){return[i(u(e.name),1)]})),_:2},1032,["value"])})),128))]})),_:1},8,["modelValue","onUpdate:modelValue"]),c("span",null,"选中的值："+u(n.value2),1)])}var f=n["F"],v={setup:function(){var e=f(1),t=f([{name:"JavaScript",value:1},{name:"Python",value:2},{name:"NodeJs",value:3},{name:"GoLang",value:4}]),l=f([{name:"苹果",value:5},{name:"香蕉",value:6},{name:"哈密瓜",value:7},{name:"西瓜",value:8}]),n=f([5,6]);return{languageList:t,value1:e,multipleList:l,value2:n}}};return Object(g["a"])({mounted:function(){this.$nextTick((function(){var e=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(e,y.a.highlightBlock)}))},render:m},v)}(),"element-demo1":function(){var e=n["H"],t=n["a"],l=n["A"],a=n["i"],u=n["M"],i=n["l"],o=n["J"],r=n["R"],d=n["g"],s=n["m"];function c(n,c){var m=o("lku-option"),f=o("lku-select");return l(),a("div",{class:"doc-select",style:{display:"flex","align-items":"center"}},[s(f,{modelValue:n.value1,"onUpdate:modelValue":function(e){return n.value1=e},disabled:"",placeholder:"select被禁用"},{default:r((function(){return[(l(!0),a(t,null,e(n.languageList,(function(e){return l(),d(m,{key:e.value,value:e.value},{default:r((function(){return[i(u(e.name),1)]})),_:2},1032,["value"])})),128))]})),_:1},8,["modelValue","onUpdate:modelValue"]),s(f,{modelValue:n.value2,"onUpdate:modelValue":function(e){return n.value2=e},multiple:""},{default:r((function(){return[(l(!0),a(t,null,e(n.multipleList,(function(e){return l(),d(m,{key:e.value,value:e.value,disabled:e.disabled},{default:r((function(){return[i(u(e.name),1)]})),_:2},1032,["value","disabled"])})),128))]})),_:1},8,["modelValue","onUpdate:modelValue"])])}var m=n["F"],f={setup:function(){var e=m(1),t=m([{name:"JavaScript",value:1},{name:"Python",value:2},{name:"NodeJs",value:3},{name:"GoLang",value:4}]),l=m([{name:"苹果",value:5,disabled:!0},{name:"香蕉",value:6,disabled:!0},{name:"哈密瓜",value:7},{name:"西瓜",value:8}]),n=m([7]);return{languageList:t,value1:e,multipleList:l,value2:n}}};return Object(g["a"])({mounted:function(){this.$nextTick((function(){var e=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(e,y.a.highlightBlock)}))},render:c},f)}(),"element-demo2":function(){var e=n["H"],t=n["a"],l=n["A"],a=n["i"],u=n["M"],i=n["l"],o=n["J"],r=n["R"],d=n["g"];function s(n,s){var c=o("lku-option"),m=o("lku-options-group"),f=o("lku-select");return l(),d(f,{placeholder:"请选择",multiple:"",modelValue:n.value,"onUpdate:modelValue":function(e){return n.value=e}},{default:r((function(){return[(l(!0),a(t,null,e(n.list,(function(n,o){return l(),d(m,{label:n.label,key:o},{default:r((function(){return[(l(!0),a(t,null,e(n.list,(function(e){return l(),d(c,{value:e.value,key:e.value},{default:r((function(){return[i(u(e.name),1)]})),_:2},1032,["value"])})),128))]})),_:2},1032,["label"])})),128))]})),_:1},8,["modelValue","onUpdate:modelValue"])}var c=n["F"],m={setup:function(){var e=c([1,3,5]),t=c([{label:"水果",list:[{name:"苹果",value:1},{name:"香蕉",value:2},{name:"火龙果",value:3},{name:"哈密瓜",value:4}]},{label:"肉类",list:[{name:"肌肉",value:5},{name:"猪肉",value:6},{name:"牛肉",value:7},{name:"肥肉",value:8}]}]);return{value:e,list:t}}};return Object(g["a"])({mounted:function(){this.$nextTick((function(){var e=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(e,y.a.highlightBlock)}))},render:s},m)}(),"element-demo3":function(){var e=n["H"],t=n["a"],l=n["A"],a=n["i"],u=n["M"],i=n["l"],o=n["J"],r=n["R"],d=n["g"],s=n["m"];function c(n,c){var m=o("lku-option"),f=o("lku-select");return l(),a("div",{class:"doc-select",style:{display:"flex","align-items":"center"}},[s(f,{modelValue:n.value,"onUpdate:modelValue":function(e){return n.value=e},clearable:""},{default:r((function(){return[(l(!0),a(t,null,e(n.languageList,(function(e){return l(),d(m,{key:e.value,value:e.value},{default:r((function(){return[i(u(e.name),1)]})),_:2},1032,["value"])})),128))]})),_:1},8,["modelValue","onUpdate:modelValue"])])}var m=n["F"],f={setup:function(){var e=m(1),t=m([{name:"JavaScript",value:1},{name:"Python",value:2},{name:"NodeJs",value:3},{name:"GoLang",value:4}]);return{value:e,languageList:t}}};return Object(g["a"])({mounted:function(){this.$nextTick((function(){var e=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(e,y.a.highlightBlock)}))},render:c},f)}()}};b.render=h;t["default"]=b}}]);
//# sourceMappingURL=chunk-2d0d7e59.86197c39.js.map
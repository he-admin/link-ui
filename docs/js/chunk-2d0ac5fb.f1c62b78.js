(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ac5fb"],{"18ec":function(t,e,l){"use strict";l.r(e);var n=l("7a23"),r={class:"market-doc-container"},o=Object(n["j"])("h2",{id:"formbiao-dan"},[Object(n["j"])("a",{class:"header-anchor",href:"#formbiao-dan"}),Object(n["l"])(" Form表单")],-1),a=Object(n["j"])("h3",{id:"zu-he-shi-yong"},[Object(n["j"])("a",{class:"header-anchor",href:"#zu-he-shi-yong"}),Object(n["l"])(" 组合使用")],-1),d=Object(n["j"])("pre",null,[Object(n["j"])("code",{class:"html"},'<template>\n  {{ form }}\n  <lku-form ref="lkuForm" :model="form" :rules="rules" :labelWidth="120" labelPosition="right">\n    <lku-form-item label="普通文本输入框" prop="text">\n      <lku-input v-model="form.text"></lku-input>\n    </lku-form-item>\n\n    <lku-form-item label="密码输入框" prop="password">\n      <lku-input v-model="form.password" type="password"></lku-input>\n    </lku-form-item>\n\n    <lku-form-item label="单选下拉框" prop="select">\n      <lku-select v-model="form.select" :width="200">\n        <lku-option :value="1">牛肉</lku-option>\n        <lku-option :value="2">鸡肉</lku-option>\n        <lku-option :value="3">猪肉</lku-option>\n      </lku-select>\n    </lku-form-item>\n\n    <lku-form-item label="多选下拉框" prop="mulSelect">\n      <lku-select v-model="form.mulSelect" :width="200" multiple>\n        <lku-option :value="1">苹果</lku-option>\n        <lku-option :value="2">香蕉</lku-option>\n      </lku-select>\n    </lku-form-item>\n\n    <lku-form-item label="开关" prop="switch">\n      <lku-switch v-model="form.switch" size="small"></lku-switch>\n    </lku-form-item>\n\n    <lku-form-item label="复选框" prop="checkbox">\n      <lku-checkbox-group v-model="form.checkbox">\n        <lku-checkbox label="1">JavaScript</lku-checkbox>\n        <lku-checkbox label="2">Python</lku-checkbox>\n        <lku-checkbox label="3">GoLang</lku-checkbox>\n        <lku-checkbox label="4">ASP.NET</lku-checkbox>\n      </lku-checkbox-group>\n    </lku-form-item>\n\n    <lku-form-item label="同意协议" prop="agree">\n      <lku-checkbox v-model="form.agree"></lku-checkbox>\n    </lku-form-item>\n\n    <lku-form-item label="单选按钮" prop="radio">\n      <lku-radio-group v-model="form.radio">\n        <lku-radio label="1">选项A</lku-radio>\n        <lku-radio label="2">选项B</lku-radio>\n        <lku-radio label="3">选项C</lku-radio>\n      </lku-radio-group>\n    </lku-form-item>\n\n    <lku-form-item label="文本输入框" prop="textarea">\n      <lku-input v-model="form.textarea" type="textarea" :width="360" :rows="4">\n      </lku-input>\n    </lku-form-item>\n  </lku-form>\n  <div style="display: flex;justify-content: center">\n   <lku-button @click="lkuForm.resetFields()">重置</lku-button>\n    <lku-button type="primary" @click="handleSubmit">提交</lku-button>\n</div>\n</template>\n<script>\nimport {ref, reactive} from \'vue\'\n\nexport default {\n  data() {\n    return {\n      form: {\n        text: \'初始值\',\n        password: \'\',\n        select: \'\',\n        mulSelect: [1],\n        radio: \'1\',\n        checkbox: [],\n        agree: true,\n        switch: true,\n        textarea: \'\'\n      }\n    }\n  },\n  setup() {\n    const handleSubmit = () => {\n      lkuForm.value.validate(res => {\n        console.log(res);\n      }, (error) => {\n        console.log(error)\n      })\n    }\n    const form2 = reactive({\n      text: \'初始值\',\n      password: \'\',\n      select: \'\',\n      radio: \'\',\n      checkbox: \'\'\n    });\n    const lkuForm = ref(null);\n    const rules = reactive({\n      text: [{required: true, message: \'text不能为空\', trigger: [\'blur\', \'change\']}],\n      password: [{\n        required: false, trigger: [\'blur\', \'change\'], min: 6, max: 32, message: \'密码长度为6-32位\'\n\n      }],\n      checkbox: [{type: \'array\', required: true, message: \'复选框至少选一个\', min: 1}],\n      agree: [{\n        type: \'boolean\', required: true, validator: (rule, value, callback) => {\n          if (value) {\n            callback()\n          } else {\n            callback(new Error(\'同意协议必填\'))\n          }\n        }\n      }],\n      select: [{type: \'number\', required: true, message: \'单选框必填\'}],\n      mulSelect: [{type: \'array\', required: true, message: \'至少选择两个\', min: 2}]\n    })\n    return {lkuForm, form2, rules, handleSubmit};\n  }\n\n}\n<\/script>\n')],-1),u=Object(n["k"])('<h3 id="form-attributes"><a class="header-anchor" href="#form-attributes"></a> Form Attributes</h3><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:left;">说明</th><th style="text-align:left;">类型</th><th style="text-align:left;">可选值</th><th style="text-align:left;">默认值</th><th style="text-align:left;">必填</th></tr></thead><tbody><tr><td style="text-align:left;">model</td><td style="text-align:left;">表单的对象</td><td style="text-align:left;">Object</td><td style="text-align:left;">-</td><td style="text-align:left;">{}</td><td style="text-align:left;">是</td></tr><tr><td style="text-align:left;">rules</td><td style="text-align:left;">表单的校验规则,参照<u><a href="https://github.com/yiminghe/async-validator">async-validator</a></u>规则</td><td style="text-align:left;">Object</td><td style="text-align:left;">-</td><td style="text-align:left;">{}</td><td style="text-align:left;">否</td></tr><tr><td style="text-align:left;">labelWidth</td><td style="text-align:left;">form-item的label宽度，所有form-item会继承</td><td style="text-align:left;">Number</td><td style="text-align:left;">—</td><td style="text-align:left;">100</td><td style="text-align:left;">否</td></tr><tr><td style="text-align:left;">show-message</td><td style="text-align:left;">是否展示校验失败的信息</td><td style="text-align:left;">Boolean</td><td style="text-align:left;"><code>true | false</code></td><td style="text-align:left;">true</td><td style="text-align:left;">否</td></tr></tbody></table><h3 id="form-methods"><a class="header-anchor" href="#form-methods"></a> Form Methods</h3><table><thead><tr><th style="text-align:left;">事件名</th><th style="text-align:left;">说明</th><th style="text-align:left;">回调函数参数</th></tr></thead><tbody><tr><td style="text-align:left;">validate</td><td style="text-align:left;">对整个表单进行验证</td><td style="text-align:left;">第一参数是验证完成的回调函数，该函数会回填一个<code>Boolean</code>参数表示是否通过验证;<br>第二个参数为验证发生错误的回调函数，会回填一个<code>error</code>对象（注意：不是验证失败，是发生错误）</td></tr><tr><td style="text-align:left;">validateField</td><td style="text-align:left;">对表单部分字段进行校验</td><td style="text-align:left;">第一参数是需要校验的字段<code>（String|Array&lt;string&gt;）</code><br>第二个参数和第三个参数同<code>validate</code>方法的参数</td></tr><tr><td style="text-align:left;">resetFields</td><td style="text-align:left;">移除表单的验证结果，并将数据恢复到初始状态</td><td style="text-align:left;">-</td></tr></tbody></table><h3 id="form-item-attributes"><a class="header-anchor" href="#form-item-attributes"></a> Form-Item Attributes</h3><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:left;">说明</th><th style="text-align:left;">类型</th><th style="text-align:left;">可选值</th><th style="text-align:left;">默认值</th><th style="text-align:left;">必填</th></tr></thead><tbody><tr><td style="text-align:left;">prop</td><td style="text-align:left;">对应model中的字段，用于指定验证和重置等方法时的字段</td><td style="text-align:left;"><code>String</code></td><td style="text-align:left;">-</td><td style="text-align:left;">-</td><td style="text-align:left;">否</td></tr><tr><td style="text-align:left;">label</td><td style="text-align:left;">标签的文本内容</td><td style="text-align:left;"><code>String</code></td><td style="text-align:left;">-</td><td style="text-align:left;">-</td><td style="text-align:left;">否</td></tr><tr><td style="text-align:left;">labelWidth</td><td style="text-align:left;">标签的宽度，优先级高于<code>Form</code>的该属性</td><td style="text-align:left;"><code>Number</code></td><td style="text-align:left;">-</td><td style="text-align:left;">-</td><td style="text-align:left;">否</td></tr><tr><td style="text-align:left;">labelPosition</td><td style="text-align:left;">标签的位置，优先级高于<code>Form</code>的该属性</td><td style="text-align:left;"><code>String</code></td><td style="text-align:left;"><code>left|top|right</code></td><td style="text-align:left;">-</td><td style="text-align:left;">否</td></tr><tr><td style="text-align:left;">showMessage</td><td style="text-align:left;">是否显示当前<code>FormItem</code>验证结果的错误信息，优先级高于<code>Form</code>的该属性</td><td style="text-align:left;"><code>String</code></td><td style="text-align:left;">-</td><td style="text-align:left;">-</td><td style="text-align:left;">否</td></tr></tbody></table>',6);function i(t,e,l,i,c,f){var s=Object(n["J"])("element-demo0"),m=Object(n["J"])("demo-block");return Object(n["A"])(),Object(n["i"])("section",r,[o,a,Object(n["m"])(m,null,{source:Object(n["R"])((function(){return[Object(n["m"])(s)]})),highlight:Object(n["R"])((function(){return[d]})),_:1}),u])}var c=l("5530"),f=l("1487"),s={name:"component-doc",components:{"element-demo0":function(){var t=n["M"],e=n["J"],l=n["m"],r=n["R"],o=n["l"],a=n["j"],d=n["a"],u=n["A"],i=n["i"];function s(n,c){var f=e("lku-input"),s=e("lku-form-item"),m=e("lku-option"),h=e("lku-select"),g=e("lku-switch"),b=e("lku-checkbox"),p=e("lku-checkbox-group"),x=e("lku-radio"),k=e("lku-radio-group"),y=e("lku-form"),v=e("lku-button");return u(),i(d,null,[o(t(n.form)+" ",1),l(y,{ref:"lkuForm",model:n.form,rules:n.rules,labelWidth:120,labelPosition:"right"},{default:r((function(){return[l(s,{label:"普通文本输入框",prop:"text"},{default:r((function(){return[l(f,{modelValue:n.form.text,"onUpdate:modelValue":function(t){return n.form.text=t}},null,8,["modelValue","onUpdate:modelValue"])]})),_:1}),l(s,{label:"密码输入框",prop:"password"},{default:r((function(){return[l(f,{modelValue:n.form.password,"onUpdate:modelValue":function(t){return n.form.password=t},type:"password"},null,8,["modelValue","onUpdate:modelValue"])]})),_:1}),l(s,{label:"单选下拉框",prop:"select"},{default:r((function(){return[l(h,{modelValue:n.form.select,"onUpdate:modelValue":function(t){return n.form.select=t},width:200},{default:r((function(){return[l(m,{value:1},{default:r((function(){return[o("牛肉")]})),_:1}),l(m,{value:2},{default:r((function(){return[o("鸡肉")]})),_:1}),l(m,{value:3},{default:r((function(){return[o("猪肉")]})),_:1})]})),_:1},8,["modelValue","onUpdate:modelValue"])]})),_:1}),l(s,{label:"多选下拉框",prop:"mulSelect"},{default:r((function(){return[l(h,{modelValue:n.form.mulSelect,"onUpdate:modelValue":function(t){return n.form.mulSelect=t},width:200,multiple:""},{default:r((function(){return[l(m,{value:1},{default:r((function(){return[o("苹果")]})),_:1}),l(m,{value:2},{default:r((function(){return[o("香蕉")]})),_:1})]})),_:1},8,["modelValue","onUpdate:modelValue"])]})),_:1}),l(s,{label:"开关",prop:"switch"},{default:r((function(){return[l(g,{modelValue:n.form.switch,"onUpdate:modelValue":function(t){return n.form.switch=t},size:"small"},null,8,["modelValue","onUpdate:modelValue"])]})),_:1}),l(s,{label:"复选框",prop:"checkbox"},{default:r((function(){return[l(p,{modelValue:n.form.checkbox,"onUpdate:modelValue":function(t){return n.form.checkbox=t}},{default:r((function(){return[l(b,{label:"1"},{default:r((function(){return[o("JavaScript")]})),_:1}),l(b,{label:"2"},{default:r((function(){return[o("Python")]})),_:1}),l(b,{label:"3"},{default:r((function(){return[o("GoLang")]})),_:1}),l(b,{label:"4"},{default:r((function(){return[o("ASP.NET")]})),_:1})]})),_:1},8,["modelValue","onUpdate:modelValue"])]})),_:1}),l(s,{label:"同意协议",prop:"agree"},{default:r((function(){return[l(b,{modelValue:n.form.agree,"onUpdate:modelValue":function(t){return n.form.agree=t}},null,8,["modelValue","onUpdate:modelValue"])]})),_:1}),l(s,{label:"单选按钮",prop:"radio"},{default:r((function(){return[l(k,{modelValue:n.form.radio,"onUpdate:modelValue":function(t){return n.form.radio=t}},{default:r((function(){return[l(x,{label:"1"},{default:r((function(){return[o("选项A")]})),_:1}),l(x,{label:"2"},{default:r((function(){return[o("选项B")]})),_:1}),l(x,{label:"3"},{default:r((function(){return[o("选项C")]})),_:1})]})),_:1},8,["modelValue","onUpdate:modelValue"])]})),_:1}),l(s,{label:"文本输入框",prop:"textarea"},{default:r((function(){return[l(f,{modelValue:n.form.textarea,"onUpdate:modelValue":function(t){return n.form.textarea=t},type:"textarea",width:360,rows:4},null,8,["modelValue","onUpdate:modelValue"])]})),_:1})]})),_:1},8,["model","rules"]),a("div",{style:{display:"flex","justify-content":"center"}},[l(v,{onClick:function(t){return n.lkuForm.resetFields()}},{default:r((function(){return[o("重置")]})),_:1},8,["onClick"]),l(v,{type:"primary",onClick:n.handleSubmit},{default:r((function(){return[o("提交")]})),_:1},8,["onClick"])])],64)}var m=n["F"],h=n["E"],g={data:function(){return{form:{text:"初始值",password:"",select:"",mulSelect:[1],radio:"1",checkbox:[],agree:!0,switch:!0,textarea:""}}},setup:function(){var t=function(){l.value.validate((function(t){console.log(t)}),(function(t){console.log(t)}))},e=h({text:"初始值",password:"",select:"",radio:"",checkbox:""}),l=m(null),n=h({text:[{required:!0,message:"text不能为空",trigger:["blur","change"]}],password:[{required:!1,trigger:["blur","change"],min:6,max:32,message:"密码长度为6-32位"}],checkbox:[{type:"array",required:!0,message:"复选框至少选一个",min:1}],agree:[{type:"boolean",required:!0,validator:function(t,e,l){e?l():l(new Error("同意协议必填"))}}],select:[{type:"number",required:!0,message:"单选框必填"}],mulSelect:[{type:"array",required:!0,message:"至少选择两个",min:2}]});return{lkuForm:l,form2:e,rules:n,handleSubmit:t}}};return Object(c["a"])({mounted:function(){this.$nextTick((function(){var t=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(t,f["highlightBlock"])}))},render:s},g)}()}};s.render=i;e["default"]=s}}]);
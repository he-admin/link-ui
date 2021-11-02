## 弹窗组件

### 基本使用
:::demo
```html
<template>
  {{ loading }}
  <lku-button @click="visible = true">点我打开弹窗1</lku-button>
  <lku-modal title="弹窗1"
             v-model:visible="visible"
             :width="740"
             :loading="loading"
             @on-ok="ok">
    <lku-form ref="lkuForm" :model="form" :rules="rules" :labelWidth="120" labelPosition="right">
      <div style="display: flex;flex-wrap:wrap">
        <lku-form-item label="普通文本输入框" prop="text">
          <lku-input v-model="form.text"></lku-input>
        </lku-form-item>

        <lku-form-item label="密码输入框" prop="password">
          <lku-input v-model="form.password" type="password"></lku-input>
        </lku-form-item>
        <lku-form-item label="单选下拉框" prop="select">
          <lku-select v-model="form.select" :width="200">
            <lku-option :value="1">牛肉</lku-option>
            <lku-option :value="2">鸡肉</lku-option>
            <lku-option :value="3">猪肉</lku-option>
          </lku-select>
        </lku-form-item>
      </div>


      <lku-form-item label="多选下拉框" prop="mulSelect">
        <lku-select v-model="form.mulSelect" :width="200" multiple>
          <lku-option :value="1">苹果</lku-option>
          <lku-option :value="2">香蕉</lku-option>
        </lku-select>
      </lku-form-item>

      <lku-form-item label="开关" prop="switch">
        <lku-switch v-model="form.switch" size="small"></lku-switch>
      </lku-form-item>

      <lku-form-item label="复选框" prop="checkbox">
        <lku-checkbox-group v-model="form.checkbox">
          <lku-checkbox label="1">JavaScript</lku-checkbox>
          <lku-checkbox label="2">Python</lku-checkbox>
          <lku-checkbox label="3">GoLang</lku-checkbox>
          <lku-checkbox label="4">ASP.NET</lku-checkbox>
        </lku-checkbox-group>
      </lku-form-item>

      <lku-form-item label="同意协议" prop="agree">
        <lku-checkbox v-model="form.agree"></lku-checkbox>
      </lku-form-item>

      <lku-form-item label="单选按钮" prop="radio">
        <lku-radio-group v-model="form.radio">
          <lku-radio label="1">选项A</lku-radio>
          <lku-radio label="2">选项B</lku-radio>
          <lku-radio label="3">选项C</lku-radio>
        </lku-radio-group>
      </lku-form-item>

      <lku-form-item label="文本输入框" prop="textarea">
        <lku-input v-model="form.textarea" type="textarea" :width="360" :rows="4">
        </lku-input>
      </lku-form-item>
    </lku-form>
  </lku-modal>
</template>
<script>
import {ref, reactive} from 'vue'

export default {
  data() {
    return {
      form: {
        text: '初始值',
        password: '',
        select: '',
        mulSelect: [1],
        radio: '1',
        checkbox: [],
        agree: true,
        switch: true,
        textarea: ''
      }
    }
  },
  setup() {
    let visible = ref(false);
    let loading = ref(false);
    const handleSubmit = () => {
      lkuForm.value.validate(res => {
        console.log(res);
      }, (error) => {
        console.log(error)
      })
    }
    const form2 = reactive({
      text: '初始值',
      password: '',
      select: '',
      radio: '',
      checkbox: ''
    });
    const lkuForm = ref(null);
    const rules = reactive({
      text: [{required: true, message: 'text不能为空', trigger: ['blur', 'change']}],
      password: [{
        required: false, trigger: ['blur', 'change'], min: 6, max: 32, message: '密码长度为6-32位'

      }],
      checkbox: [{type: 'array', required: true, message: '复选框至少选一个', min: 1}],
      agree: [{
        type: 'boolean', required: true, validator: (rule, value, callback) => {
          if (value) {
            callback()
          } else {
            callback(new Error('同意协议必填'))
          }
        }
      }],
      select: [{type: 'number', required: true, message: '单选框必填'}],
      mulSelect: [{type: 'array', required: true, message: '至少选择两个', min: 2}]
    })
    const ok = () => {
      lkuForm.value.validate(res => {
        if (res) {
          loading.value = true;
          setTimeout(() => {
            loading.value = false
          }, 2000)
        }
      })
    }
    return {visible, loading, lkuForm, form2, rules, handleSubmit, ok};
  }
}
</script>
```
:::

### 是否开启拖拽
:::demo
```html
<template>
  <lku-button @click="visible = true">打开可拖拽弹窗</lku-button>
  <lku-modal title="弹窗1"
             draggable
             v-model:visible="visible">
    我是可拖拽弹窗
  </lku-modal>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    let visible = ref(false);
    return {visible};
  }
}
</script>

```
:::


### 过渡动画方向
:::demo
```html
<template>
  {{direction}}
  <lku-radio-group v-model="direction" type="button">
  <lku-radio label="center">默认</lku-radio>
 <lku-radio label="left">向左</lku-radio>
 <lku-radio label="right">向右</lku-radio> 
<lku-radio label="top">向上</lku-radio>
 <lku-radio label="bottom">向下</lku-radio>
</lku-radio-group>
  <lku-button type="primary" style="margin-top:15px" @click="visible=true">打开</lku-button>
  <lku-modal title="弹窗1" :direction="direction"
             v-model:visible="visible">
    我是可拖拽弹窗
  </lku-modal>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const visible = ref(false);
    const direction = ref('center');
    return {visible,direction};
  }
}
</script>

```
:::

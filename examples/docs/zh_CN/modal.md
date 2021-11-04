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

### Modal Attributes
| 参数          | 说明                                                         |       类型        |            可选值             | 默认值  | 必填 |
| :------------ | :----------------------------------------------------------- | :---------------: | :---------------------------: | :------ | :--- |
| v-model:visible         | 是否显示，可使用`v-model`双向绑定                            |     `Boolean`     |               -               | -       | 否   |
| direction     | 弹出的起始方向                                                   |     `String`      | `left | top | right | bottom` | `right` | 否   |
| duration      | 动画执行时间，单位s。                                                 |     `Number`      |               -               | `0.3` | 否   |
| animation      | 动画类型                                                 |     `String`      |               -               | ease | 否   |
| title         | 标题                                                         |     `String`      |               -               | -       | 否   |
| width          | 弹窗大小尺寸，左右时为宽度，上下时为高度。支持如480px 480 20%写法                     | `String | Number` |               -               | `480px` | 否   |
| closable      | 是否显示关闭按钮                                             |     `Boolean`     |               -               | `true`  | 否   |
| mask          | 是否展示蒙层                                                 |     `Boolean`     |               -               | `true`  | 否   |
| mask-closable | 点击蒙层是否收起抽屉                                         |     `Boolean`     |               -               | `true`  | 否   |
| draggable     | 是否可以拖拽                                                 |     `Boolean`     |               -               | `false` | 否   |

### Drawer Events
| 事件名 | 说明                           | 回调函数参数             |
| :----- | :----------------------------- | :----------------------- |
| change | 组件显示隐藏状态发生变化时触发 | 当前状态：`true | false` |
| close  | 抽屉关闭时触发                 | -                        |
| drag   | 拖拽改变位置时触发             | 当前弹窗的位置，距离left与top的距离，{left:XXX,top:XXX}   |

### Drawer Slots
| name      | 说明               |
| :-------- | :----------------- |
| default   | 主体内容           |
| title     | 自定义title        |
| foot     | 自定义foot        |
| draggable | 自定义拖拽区的内容 |

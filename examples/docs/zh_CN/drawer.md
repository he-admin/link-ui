## Drawer 抽屉

### 基本使用
支持从上下左右四个方向弹出抽屉
:::demo
```html
<template>
  <div>
    <lku-radio-group type="button" v-model="direction">
      <lku-radio label="left">左侧弹出</lku-radio>
      <lku-radio label="top">顶部弹出</lku-radio>
      <lku-radio label="right">右侧弹出</lku-radio>
      <lku-radio label="bottom">底部弹出</lku-radio>
    </lku-radio-group>
    <lku-button
      type="primary"
      class="doc-mt20"
      style="margin-top:10px"
      @click="visible=true">
      点击打开抽屉
    </lku-button>

    <lku-drawer
      v-model:visible="visible"
      title="抽屉标题"
      size="50%"
      :direction="direction">
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
      <template v-slot:foot>
        <lku-button @click="visible=false">取消</lku-button>
        <lku-button @click="ok" :loading="loading" type="primary">确定</lku-button>
      </template>
    </lku-drawer>
  </div>
</template>
<script>
import {ref, reactive} from 'vue'

export default {
  setup() {
    const visible = ref(false);
    const direction = ref('right');
    let loading = ref(false);
    const handleSubmit = () => {
      lkuForm.value.validate(res => {
        console.log(res);
      }, (error) => {
        console.log(error)
      })
    }
    const form = reactive({
      text: '初始值',
      password: '',
      select: '',
      mulSelect: [1],
      radio: '1',
      checkbox: [],
      agree: true,
      switch: true,
      textarea: ''

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
            visible.value = false;
          }, 2000)
        }
      })
    }
    return {visible,direction, loading, lkuForm, form, rules, handleSubmit, ok};
  }
}
</script>
```
:::

### 自定义title
:::demo
```html
<template>
  <div>
    <lku-button type="primary" @click="visible = true">
      点击打开抽屉
    </lku-button>

    <lku-drawer v-model="visible">
      <div style="padding: 20px;">
        内容区域
      </div>
      <div slot="title">
        <lku-badge :value="8">
          消息面板
        </lku-badge>
      </div>
    </lku-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  }
}
</script>
```
:::

### 多级抽屉
:::demo
```html
<template>
  <div>
    <lku-button type="primary" @click="visible = true">
      点击打开抽屉
    </lku-button>

    <lku-drawer v-model="visible" :size="600" title="第1个抽屉">
      <div style="padding: 20px;">
        <lku-button type="primary" @click="visible2 = true">
          再打开一个抽屉
        </lku-button>
      </div>
    </lku-drawer>

    <lku-drawer v-model="visible2" title="第2个抽屉">
      <div style="padding: 20px;">
        Hello Drawer!
      </div>
    </lku-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      visible2: false
    }
  }
}
</script>
```
:::

### 拖拽宽度

:::demo
```html
<template>
  <div>
    <span>size: {{size}}, 单位px</span>
    <lku-button
      type="primary"
      @click="handleClick">
      可拖拽宽度的抽屉
    </lku-button>

    <lku-drawer
      v-model="visible"
      draggable
      title="可拖拽宽度的抽屉"
      :size.sync="size"
      :mask="true">
      <div style="padding: 20px;">
        通过给size属性的sync写法，可以在拖拽改变宽度时同步更新size值
      </div>
    </lku-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      size: 300
    }
  },
  methods: {
    handleClick () {
      this.visible = true
    }
  }
}
</script>
```
:::

### Drawer Attributes
| 参数          | 说明                                                         |       类型        |            可选值             | 默认值  | 必填 |
| :------------ | :----------------------------------------------------------- | :---------------: | :---------------------------: | :------ | :--- |
| value         | 是否显示，可使用`v-model`双向绑定                            |     `Boolean`     |               -               | -       | 否   |
| direction     | 弹出的方向                                                   |     `String`      | `left | top | right | bottom` | `right` | 否   |
| duration      | 动画执行时间                                                 |     `Number`      |               -               | `300ms` | 否   |
| title         | 标题                                                         |     `String`      |               -               | -       | 否   |
| size          | 抽屉大小尺寸，左右时为宽度，上下时为高度。可以使用`sync`语法 | `String | Number` |               -               | `300px` | 否   |
| closable      | 是否显示关闭按钮                                             |     `Boolean`     |               -               | `true`  | 否   |
| mask          | 是否展示蒙层                                                 |     `Boolean`     |               -               | `true`  | 否   |
| mask-closable | 点击蒙层是否收起抽屉                                         |     `Boolean`     |               -               | `true`  | 否   |
| draggable     | 是否可以拖拽                                                 |     `Boolean`     |               -               | `false` | 否   |

### Drawer Events
| 事件名 | 说明                           | 回调函数参数             |
| :----- | :----------------------------- | :----------------------- |
| change | 组件显示隐藏状态发生变化时触发 | 当前状态：`true | false` |
| close  | 抽屉关闭时触发                 | -                        |
| drag   | 拖拽改变大小时触发             | 当前的大小尺寸，单位px   |

### Drawer Slots
| name      | 说明               |
| :-------- | :----------------- |
| default   | 主体内容           |
| title     | 自定义title        |
| draggable | 自定义拖拽区的内容 |

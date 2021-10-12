## Form表单
### 组合使用
:::demo
```html
<template>
  {{ form }}
  <lku-form ref="lkuForm" :model="form" :rules="rules" :labelWidth="120" labelPosition="right">
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
  </lku-form>
  <button @click="lkuForm.resetFields()">重置</button>
  <button @click="handleSubmit">提交</button>
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
        switch: true
      }
    }
  },
  setup() {
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
      select: [{required: true, message: '单选框必填', min: 1}],
      mulSelect: [{type: 'array', required: true, message: '至少选择两个', min: 2}]
    })
    return {lkuForm, form2, rules, handleSubmit};
  }

}
</script>
```
:::

### Form Attributes

|  参数 |           说明 | 类型    | 可选值    |    默认值    | 必填
| :---  | :---         | :---| :--- | :---|:---|
| model | 表单的对象 | Object | -  | {} | 是
| rules | 表单的校验规则,参照<u>[async-validator](https://github.com/yiminghe/async-validator)</u>规则| Object | - | {} |否
| labelWidth | form-item的label宽度，所有form-item会继承 | Number| — | 100 | 否
| show-message | 是否展示校验失败的信息 | Boolean | `true | false` | true | 否

### Form Methods

 | 事件名        | 说明                                       | 回调函数参数                                                                                                                                                                |
 | :------------ | :----------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
 | validate      | 对整个表单进行验证                         | 第一参数是验证完成的回调函数，该函数会回填一个`Boolean`参数表示是否通过验证;<br>第二个参数为验证发生错误的回调函数，会回填一个`error`对象（注意：不是验证失败，是发生错误） |
 | validateField | 对表单部分字段进行校验                     | 第一参数是需要校验的字段`（String|Array<string>）`<br>第二个参数和第三个参数同`validate`方法的参数                                                                          |
 | resetFields   | 移除表单的验证结果，并将数据恢复到初始状态 | -                                                                                                                                                                           |

 ### Form-Item Attributes

| 参数  | 说明       | 类型    | 可选值 | 默认值 | 必填 |
| :---- | :--------- | :------ | :----- | :----- | :--- |
| prop | 对应model中的字段，用于指定验证和重置等方法时的字段 | `String` | -      | -  | 否   |
| label | 标签的文本内容 | `String` | -      | -  | 否   |
| labelWidth | 标签的宽度，优先级高于`Form`的该属性 | `Number` | -      | -  | 否   |
| labelPosition | 标签的位置，优先级高于`Form`的该属性 | `String` | `left|top|right`      | -  | 否   |
| showMessage | 是否显示当前`FormItem`验证结果的错误信息，优先级高于`Form`的该属性 | `String` | -      | -  | 否   |

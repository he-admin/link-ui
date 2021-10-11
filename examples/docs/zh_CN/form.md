## Form表单
### 基本使用
:::demo
```html
<template>
  {{form}}
 {{typeof form.text}}
  <lku-form :model="form" :rules="rules" :labelWidth="120" labelPosition="left">
    <lku-form-item label="普通文本输入框" prop="text">
      <lku-input v-model="form.text"></lku-input>
    </lku-form-item>
    <lku-form-item label="密码输入框" prop="password">
      <lku-input v-model="form.password" type="password"></lku-input>
    </lku-form-item>
  </lku-form>
</template>
<script>
import {reactive} from 'vue'

export default {
  setup() {
    const form = reactive({
      text: '',
      password: '',
      select: '',
      radio: '',
      checkbox: ''
    })
   const rules = reactive({
   text: [{required: true, message: 'text不能为空',trigger:['blur','change']}]
})
    return {form,rules};
  }

}
</script>

```
:::

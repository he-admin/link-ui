## Form表单
### 基本使用
:::demo
```html
<template>
  {{form}}
  <lku-form ref="lkuForm" :model="form" :rules="rules" :labelWidth="120" labelPosition="right">
    <lku-form-item label="普通文本输入框" prop="text">
      <lku-input v-model="form.text"></lku-input>
    </lku-form-item>
    <lku-form-item label="密码输入框" prop="password">
      <lku-input v-model="form.password" type="password"></lku-input>
    </lku-form-item>
     <lku-form-item label="下拉框" prop="select">
      <lku-select v-model="form.select" :width="200">
        <lku-option :value="1">苹果</lku-option>
       <lku-option :value="2">香蕉</lku-option>
      </lku-select>
       </lku-form-item>
  </lku-form>
   <button @click="lkuForm.resetFields()">重置</button>
</template>
<script>
import {ref,reactive} from 'vue'

export default {
  data(){
  
return {
   form:{text: '初始值',
               password: '',
               select: 1,
               radio: '',
               checkbox: ''}
}},
  setup() {
    const form2 = reactive({
      text: '初始值',
      password: '',
      select: '',
      radio: '',
      checkbox: ''
    });
  const lkuForm = ref(null);
   const rules = reactive({
   text: [{required: true, message: 'text不能为空',trigger:['blur','change']}],
   password: [{required: false,trigger:['blur','change'],
validator:(rule,value,callback)=> {
if(value.length<=10){
   callback(new Error('长度小于10位'))
}else{
callback();
}
}}],
   select: [{required: true,message: '至少选择一个'}]
})
    return {lkuForm,form2,rules};
  }

}
</script>

```
:::

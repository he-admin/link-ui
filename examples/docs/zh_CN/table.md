## Table表格

### 基本使用
:::demo
```html
<template>
  {{list}}
  <lku-table :data="list">
    <lku-table-column prop="name" label="名字"></lku-table-column>
    <lku-table-column  prop="age" label="年龄"></lku-table-column>
  </lku-table>
</template>
<script>
import {reactive} from 'vue'
export default {
  setup(){
    const list = reactive([{name:'张三11312555555555555512213333333333335555',age:18},{name: '李四',age:20}]);
    console.log(list);
    return {list}
  }
}
</script>

```
:::

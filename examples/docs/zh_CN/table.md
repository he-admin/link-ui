## Table表格

### 基本使用
:::demo
```html
<template>
  {{list}}
  <lku-table :data="list">
    <lku-table-column prop="name"></lku-table-column>
  </lku-table>
</template>
<script>
import {reactive} from 'vue'
export default {
  setup(){
    const list = reactive([{name:'张三',age:18}]);
    console.log(list);
    return {list}
  }
}
</script>

```
:::

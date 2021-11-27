## Table表格

### 基本使用
:::demo
```html
<template>
  {{list}}
  <lku-table>

  </lku-table>
</template>
<script>
import {reactive} from 'vue'
export default {
  setup(){
    const list = reactive([{name:'张三'}]);
    console.log(list);
    return {list}
  }
}
</script>

```
:::

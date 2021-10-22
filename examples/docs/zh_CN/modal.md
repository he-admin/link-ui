## 弹窗组件

:::demo
```html
<template>
  <lku-button @click="visible = true">点我打开弹窗</lku-button>
  <lku-modal title="弹窗1" v-model:visible="visible">
  
  </lku-modal>
</template>
<script>
import {ref} from 'vue'
export default {
   setup(){
    let visible = ref(false);
    return {visible}
}
}
</script>
```
:::

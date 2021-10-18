## Drawer抽屉组件

:::demo
```html
<template>
 <button @click="open">点我打开弹窗</button>
//考虑500  '500', '500px' '15%'的情况
<lku-drawer v-model:visible="visible" size="500">
<template v-slot:foot>
 <lku-button>取消</lku-button>
 <lku-button type="primary">确定</lku-button>
</template>
</lku-drawer>
</template>
<script>
import {ref} from 'vue';

export default {
setup(){
  const visible = ref(false);
   const open = ()=>{
   visible.value=true;
 // document.addEventListener('click',()=>{console.log('点击了我')})
}
return {visible,open}
}
}
</script>
```
:::

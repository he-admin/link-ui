## Drawer抽屉组件

:::demo
```html
<template>
 <lku-button @click="open" type="primary">点我打开弹窗</lku-button>
//考虑500  '500', '500px' '15%'的情况
<lku-drawer v-model:visible="visible" size="50%" title="抽屉1">
  <lku-button @click="visible2= true">点我</lku-button>
  <lku-drawer v-model:visible="visible2" size="30%" title="抽屉2">
<template v-slot:foot>
 <lku-button>取消</lku-button>
 <lku-button type="primary">确定</lku-button>
</template>
  </lku-drawer>
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
  const visible2 = ref(false);
   const open = ()=>{
   visible.value=true;
 // document.addEventListener('click',()=>{console.log('点击了我')})
}
return {visible,open,visible2}
}
}
</script>
```
:::

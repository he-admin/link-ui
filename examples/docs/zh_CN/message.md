## Message组件

### 基本使用
:::demo
```html
 <template>
   <div>
     <lku-button @click="openMessage('open')">普通通知</lku-button>
     <lku-button @click="openMessage('info')">info类型通知</lku-button>
     <lku-button @click="openMessage('error')">error类型通知</lku-button>
     <lku-button @click="openMessage('success')">success类型通知</lku-button>
     <lku-button @click="openMessage('warning')">warning类型通知</lku-button>
   </div>
 </template>
 <script>
 import {getCurrentInstance} from 'vue'
 
 export default {
   setup() {
     const instance = getCurrentInstance();
     const openMessage = (type) => {
const {$message} = instance.appContext.config.globalProperties;
       console.log($message.success({title:'这是一条success消息，默认1.5s之后隐藏'}));
     }
     return {openMessage}
   }
 }
 </script>
```

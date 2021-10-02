
:::demo
```html
 <template>
   <div>
     <div>{{ value1 }}</div>
     <lku-switch v-model="value1" active-color="#ff0000" inactive-color="#984747"></lku-switch>
 <lku-switch v-model="value1" size="large" ></lku-switch>
 <lku-switch v-model="value1" size="small"></lku-switch>
   </div>
 
 </template>
 <script>
 import {ref} from 'vue'
 
 export default {
   setup() {
     const value1 = ref(true);
     return {value1}
   }
 }
 </script>

```
:::

## Switch开关

### 基本使用
:::demo
```html
<template>
  <div>
    <lku-switch v-model="value" @change="handleChange">
    </lku-switch>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value = ref(true);
    const handleChange = (value)=>{
      console.log(value)
    }
    return {value,handleChange}
  }
}
</script>

```
:::

### 三种尺寸
:::demo
```html
<template>
  <lku-switch v-model="value" size="small"></lku-switch>
  <lku-switch v-model="value" size="medium"></lku-switch>
  <lku-switch v-model="value" size="large"></lku-switch>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value = ref(true);
    return {value}
  }
}
</script>

```
:::

### 自定义颜色
:::demo
```html
<template>
  <lku-switch active-color="#ff0000" inactive-color="#984747" v-model="value"/>
  <lku-switch active-color="#fdf000" inactive-color="#5a5823" v-model="value1"/>
  <lku-switch active-color="#1fd2ea" inactive-color="#89b7bd" v-model="value2"/>
  <lku-switch active-color="#ea1faf" inactive-color="#984781" v-model="value3"/>
</template>
<script>
import {ref} from 'vue';

export default {
  setup() {
    let value = ref(true);
    let value1 = ref(true);
    let value2 = ref(true);
    let value3 = ref(true);  
    return {value, value1, value2, value3}
  }
}
</script>
```
:::

### 自定义开启、关闭时的文案或图标
:::demo
```html
<template>
  <lku-switch v-model="value" size="small">
    <template v-slot:open>
      <span>开</span>
    </template>
    <template v-slot:close>
      <span>关</span>
    </template>
  </lku-switch>

  <lku-switch v-model="value1" size="medium">
    <template v-slot:open>
      <span>开</span>
    </template>
    <template v-slot:close>
      <span>关</span>
    </template>
  </lku-switch>

  <lku-switch v-model="value2" size="large">
    <template v-slot:open>
      <span>开</span>
    </template>
    <template v-slot:close>
      <span>关</span>
    </template>
  </lku-switch>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    let value = ref(true);
    let value1 = ref(true);
    let value2 = ref(true);
    return {value, value1, value2}
  }
}
</script>

```
:::

### 禁用状态
:::demo
```html
<template>
  <lku-switch v-model="value" size="small" disabled></lku-switch>
  <lku-switch v-model="value2" size="medium" disabled></lku-switch>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value = ref(true);
    const value2 = ref(false);
    return {value, value2}
  }
}
</script>
```
:::

### 自定义开启和关闭时v-model绑定值
:::demo
```html
<template>
  {{value1}}  
  <lku-switch v-model="value1" size="small"></lku-switch>
  {{value2}}
  <lku-switch v-model="value2" size="medium" :true-value="1" :false-value="0"></lku-switch>
  {{value3}}
  <lku-switch v-model="value3" size="large" true-value="yes" false-value="no"></lku-switch>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref(true);
    const value2 = ref(0);
    const value3 = ref('yes');
    return {value1, value2, value3}
  }
}
</script>
```
:::

### Loading状态
:::demo
```html
<template>
  <lku-switch v-model="value1" loading></lku-switch>
  <lku-switch v-model="value2" loading></lku-switch>
   <!-- loading与自定义true/false值结合使用,loading模式下需要根据业务逻辑手动设置v-model的值-->
  <lku-switch :model-value="value3"
              :loading="loading"
              true-value="1"
              false-value="0"
              @click="handleInput" 
              inactive-color="#2d8cf0" 
              @change="change"
              active-color="#f40"></lku-switch>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref(true);
    const value2 = ref(false);
    const value3 = ref('1');
    const loading = ref(false);
    const handleInput = () => {
       loading.value = true;
       console.log('handleInput');
      // 模拟接口请求
      setTimeout(() => {
        value3.value =  value3.value==='1'? '0': '1'
        loading.value = false
      }, 2000)
    } 
    const change =(val)=>{console.log(val)}
    return {value1, value2, value3, loading, handleInput,change}
  }
}
</script>
```
:::

### Switch Attributes

|  参数 |           说明 | 类型    | 可选值    |    默认值    | 必填
| :---  | :---         | :---| :--- | :---|:---|
| size|  尺寸大小(高度)  |  String | `small | medium | large` | medium | 否
| disabled| 是否禁用 | Boolean | `true | false` | false | 否
| activeColor | 自定义开启时样式 | String | - | #2d8cf0     | 否
| inactiveColor | 自定义关闭时样式 | String | - | #c5c8ce     | 否
| width        | 自定义宽度 | Number | -   | 50 | 否
| loading | 切换时是否显示loading，常用于请求接口,根据业务逻辑手动设置loading和v-model的值| Boolean | `true | false`  | false | 否
| trueValue | 自定义开启状态的true值| `Boolean | String | Number` | - | true | 否
| falseValue | 自定义开启状态的false值| `Boolean | String | Number` | - | false | 否

### Switch Events

|  事件名 |           说明 | 回调函数参数
| :---   | :---           | :---
| change | switch值发生变化时触发| 返回当前绑定的v-model值

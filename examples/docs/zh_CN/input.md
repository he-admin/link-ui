## input输入框
### 基本使用
:::demo
```html
<template>
  <lku-input v-model="value" placeholder="请输入用户名"></lku-input>
</template>

<script>
import {ref} from 'vue';

export default {
  setup() {
    const value = ref('');
    return {value}
  }
}
</script>
```
:::


### 大小尺寸
##### 默认大小为medium，可设置为small和large尺寸，也可以通过width设置指定宽度
:::demo
```html
<template>
  <lku-input v-model="value" placeholder="请输入用户名" size="small"></lku-input>
  <lku-input v-model="value" placeholder="请输入用户名"></lku-input>
  <lku-input v-model="value" placeholder="请输入用户名" size="large" :width="300"></lku-input>
</template>

<script>
import {ref} from 'vue';

export default {
  setup() {
    const value = ref('');
    return {value}
  }
}
</script>
```
:::


### 多行文本
##### 默认大小为medium，可设置为small和large尺寸，也可以通过width设置指定宽度
:::demo
```html
<template>
  <lku-input type="textarea" v-model="value" placeholder="请输入用户名" :rows="6" :width="300"></lku-input>
</template>

<script>
import {ref} from 'vue';

export default {
  setup() {
    const value = ref('');
    return {value}
  }
}
</script>
```
:::

### 禁用、可清除
:::demo
```html
<template>
  <lku-input v-model="value" placeholder="请输入用户名" disabled></lku-input>
  <lku-input v-model="value" placeholder="请输入用户名" clearable></lku-input>
</template>

<script>
import {ref} from 'vue';

export default {
  setup() {
    const value = ref('');
    return {value}
  }
}
</script>
```
:::

### Input Attributes
| 参数           | 说明                                       |       类型        |                          可选值                          |  默认值   | 必填  |
| :------------- | :----------------------------------------- | :---------------: | :------------------------------------------------------: | :-------: | :---: |
| type           | 输入框类型                                 |     `String`      | `text`、`password`、`textarea`等所有原生输入框支持的类型 |  `text`   |  否   |
| modelValue | 绑定的值，v-model可以进行双向数据绑定      | `String | Number` |                            -                             |     -     |   -   |
| size           | input尺寸，仅在非`textarea`下有效          |     `String`      |               `large`、`default`、`small`                | `default` |  否   |
| disabled       | 是否禁用                                   |     `Boolean`     |                            -                             |  `false`  |  否   |
| readonly       | 是否只读                                   |     `Boolean`     |                            -                             |  `false`  |  否   |
| placeholder    | 输入框类型                                 |     `Strimg`      |                            -                             |     -     |  否   |
| clearable      | 是否可以清除输入框，仅在非`textarea`下有效 |     `Boolean`     |                            -                             |  `false`  |  否   |                     -                             |  `false`  |  否   |
| rows           | textarea默认的行数                         |     `Boolean`     |                            -                             |  `false`  |  否   |
| autofocus      | 自动获取焦点                               |     `Boolean`     |                            -                             |  `false`  |  否   |

### Input Events
| 事件名 | 说明                                    | 回调函数参数  |
| :----- | :-------------------------------------- | :------------ |
| focus  | 组件获取焦点时触发                      | Event         |
| blur   | 组件失去焦点时触发                      | Event         |
| change | 组件值发生变化时触发                    | value         |
| clear  | 组件由clearable属性定义的按钮清空时触发 | -             |
| enter  | 按下回车时触发                          | event，当前值 |


### Input Methods
| 方法名 | 说明           | 回调函数参数 |
| :----- | :------------- | :----------- |
| focus  | 使组件获取焦点 | Event        |
| blur   | 使组件失去焦点 | Event        |

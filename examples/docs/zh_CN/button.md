## Button按钮
### 基本使用

:::demo
```html
<template>
  <div style="display: flex">
  <lku-button type="primary">primary</lku-button>
    <lku-button>default</lku-button>
    <lku-button type="danger">danger</lku-button>
    <lku-button type="dashed">dashed</lku-button>
    <lku-button type="link" href="http://www.baidu.com" target="_blank">Link Button</lku-button>
</div>
</template>
```
:::


### Size按钮尺寸
:::demo
```html
<template>
  <div style="display: flex">
  <lku-button size="small">small</lku-button>
<lku-button>medium</lku-button>
<lku-button size="large" >large</lku-button>
</div>
</template>
```
:::

### Icon图标和Loading状态
:::demo
```html
<template>
 <div style="display: flex">
 <lku-button type="primary" icon="search">搜索</lku-button>
<lku-button type="danger" icon="delete">删除</lku-button>
<lku-button loading>加载中</lku-button>
<lku-button icon="download" :loading="loading" @click="handleClick">{{loading?'下载中':'下载'}}</lku-button>
</div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const loading = ref(false);
    const handleClick = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 2000)
    }
    return {loading, handleClick}
  }
}
</script>
```
:::


### 禁用状态

:::demo
```html
<template>
  <div style="display: flex">
  <lku-button type="primary" disabled>primary</lku-button>
    <lku-button disabled>default</lku-button>
    <lku-button type="danger" disabled>danger</lku-button>
    <lku-button type="dashed" disabled>dashed</lku-button>
    <lku-button type="link" disabled href="http://www.baidu.com" target="_blank">Link Button</lku-button>
</div>
</template>
```
:::

### Block块级按钮

:::demo
```html
<template>
  <lku-button type="primary" block>primary</lku-button>
  <lku-button block>default</lku-button>
  <lku-button type="danger" block>danger</lku-button>
  <lku-button type="dashed" block>dashed</lku-button>
  <lku-button type="link" href="http://www.baidu.com" target="_blank" block>Link Button</lku-button>
</template>
```
:::

### Button Attributes

| 参数     | 说明                                            | 类型    | 可选值                                                             | 默认值    | 示例                    |
| :------- | :---------------------------------------------- | :------ | :----------------------------------------------------------------- | :-------- | :---------------------- |
| type     | 按钮类型                                        | String  | `primary`、`default`、`dashed`、`danger`、`link`                   | `default` | `danger`                |
| block    | 是否成为块级按钮，会自适应铺满父容器                 | Boolean | `true`、`false`                                                   | `false`   | `true`                  |
| size     | 按钮尺寸                                        | String  | `large`、`default`、`small`                                        | `default` | 20                      |
| icon     | 按钮图标                                        | String  | 所有组件库支持的icon                                                 | -         | `search`                |
| loading  | loading状态，加载过程中禁止重复点击                | Boolean | `true`、`false`                                                    | `false`   | `true`                  |
| disabled | 是否禁用                                        | Boolean | `true`、`false`                                                    | `false`   | `true`                  |
| href     | 按钮作为链接跳转，功能类似于a标签的href属性          | String  | -                                                                  | -         | `https://www.baidu.com` |
| target   | 按钮作为链接跳转的方式，类似于a标签的target属性      | String  | `_blank` 、`_parent` 、`_self` 、`_top` 、其他自定义的name字符串；      | `_blank`  | `_self`                 |

### Button Events

 | 事件名 | 说明           | 回调函数参数 |
 | :----- | :------------- | :----------- |
 | click  | 点击按钮时触发 | -            |

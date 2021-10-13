## Button按钮
### 基本使用

:::demo
```html
<template>
  <div style="display: flex">
  <lku-button type="primary" >primary</lku-button>
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

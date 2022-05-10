## Tree组件

### 基本使用

::: demo
```html
<template>
  <div>
    <lku-tree :data="list"></lku-tree>
  </div>
</template>
<script>
import {ref} from 'vue';

export default {
  setup() {
    const list = ref([
      {
        label: 'node1-1',
        children: [
          {
            label: 'node2-1',
            children: [
              {
                label: 'node3-1'
              }
            ]
          },
          {
            label: 'node2-2',
            children: [
              {
                label: 'node3-2'
              }
            ]
          }
        ]
      },
      {
        label: 'node1-2',
        children: [
          {
            label: 'node2-1'
          }
        ]
      }
    ])
return {list}
  }
}
</script>
```
:::
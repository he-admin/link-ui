## Checkbox复选框

### 基本使用
##### 可以使用v-model进行数据双向绑定
:::demo
```html
<template>
  <lku-checkbox v-model="value">
    同意用户协议
  </lku-checkbox>
  <p> checkbox选中的值: {{value}}</p>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value = ref(false);
    return {value}
  }
}
</script>

``` 
:::

### 禁用
:::demo
```html
<template>
  <lku-checkbox v-model="value1" disabled>
    禁用未选的复选框
  </lku-checkbox>
  <lku-checkbox v-model="value2" disabled>
    禁用已选的复选框
  </lku-checkbox>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref(false);
    const value2 = ref(true);
    return {value1, value2}
  }
}
</script>

``` 
:::

### 组合使用

:::demo
```html
<template>
  <lku-checkbox v-model="checkAll"
                :indeterminate="indeterminate"
                @change="handleCheckAllChange">全部
  </lku-checkbox>
  <div style="margin: 8px 0">半选状态：{{ indeterminate }}</div>
  <lku-checkbox-group v-model="list" @change="handleGroupChange">
    <lku-checkbox label="a">选项一</lku-checkbox>
    <lku-checkbox label="b">选项二</lku-checkbox>
    <lku-checkbox label="c">选项三</lku-checkbox>
    <lku-checkbox label="d">选项四</lku-checkbox>
  </lku-checkbox-group>
  <div style="margin-top:8px">选中的值{{list}}</div>
</template>
<script>
import {ref, computed} from 'vue'

export default {
  setup() {
    let checkAll = ref(false);
    let labelList = ['a', 'b', 'c', 'd'];
    const list = ref(['a', 'b']);
    let indeterminate = computed(() => {
      return list.value.length !== labelList.length && list.value.length !== 0
    })
    const handleCheckAllChange = (val) => {
      list.value = val ? [...labelList] : [];
    };
    const handleGroupChange = (selectedCheckbox) => {
      checkAll.value = selectedCheckbox.length === labelList.length;
    }
    return {checkAll, indeterminate, list, handleCheckAllChange, handleGroupChange}
  }
}
</script>


```
:::

## Checkbox复选框

### 基本使用
##### 可以使用v-model进行数据双向绑定
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
    <lku-checkbox label="a" disabled>选项一</lku-checkbox>
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

### Checkbox Attributes

|  参数 |           说明 | 类型    | 可选值    |    默认值    | 必填
| :---  | :---         | :---| :--- | :---|:---|
| modelValue| 复选框绑定的值，可以使用v-model进行双向数据绑定。仅单独使用时有效。  |  `Boolean| String | Number` | - | false | 否
| disabled| 是否禁用 | Boolean | `true | false` | false | 否
| label   | 当前选中的label作为value值，仅组合式有效| `Boolean | String | Number` | - | - | 否
| trueValue | 自定义开启状态的true值| `Boolean | String | Number` | - | true | 否
| falseValue | 自定义开启状态的false值| `Boolean | String | Number` | - | false | 否
| indeterminate| 是否开启半选状态，需要单独使用| Boolean | `true | false` | false |否
### Checkbox Events

|  事件名 |           说明 | 回调函数参数
| :---   | :---           | :---
| change | 复选框状态发生变化时触发|  `true | false`

### CheckboxGroup Attributes
|  参数 |           说明 | 类型    | 可选值    |    默认值    | 必填
| :---  | :---         | :---| :--- | :---|:---|
|modelValue | 设置选中的项 | Array | - | [] | 是

### CheckboxGroup Events
|  事件名 |           说明 | 回调函数参数
| :---   | :---           | :---
| change | checkbox-group绑定的值发生变化时触发|  所有选中的label集合

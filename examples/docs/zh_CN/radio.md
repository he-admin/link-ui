## radio单选框

### 基本使用

:::demo
```html
<template>
  <p style="margin-bottom: 10px">1、请根据题目选出正确的答案。</p>
  <lku-radio-group v-model="answer">
    <lku-radio label="1">选项1</lku-radio>
    <lku-radio label="2" disabled>选项2</lku-radio>
    <lku-radio label="3">选项3</lku-radio>
    <lku-radio label="4">选项3</lku-radio>
  </lku-radio-group>
  <p style="margin-top:8px">选中的值: {{ answer }}</p>
</template>
<script>
import {ref} from 'vue';

export default {
  setup() {
    const answer = ref('2')
    return {answer}
  }
}
</script>
```
:::

### 垂直排版
:::demo
```html
<template>
  <p style="margin-bottom: 10px">1、请根据题目选出正确的答案。</p>
  <lku-radio-group v-model="answer" mode="vertical">
    <lku-radio label="1">选项1</lku-radio>
    <lku-radio label="2" disabled>选项2</lku-radio>
    <lku-radio label="3">选项3</lku-radio>
    <lku-radio label="4">选项3</lku-radio>
  </lku-radio-group>
  <p style="margin-top:8px">选中的值: {{ answer }}</p>
</template>
<script>
import {ref} from 'vue';

export default {
  setup() {
    const answer = ref('2')
    return {answer}
  }
}
</script>
```
:::


### 作为button类型使用
:::demo
```html
<template>
  <lku-radio-group v-model="value1" type="button" size="small">
    <lku-radio label="1" disabled>JavaScript</lku-radio>
    <lku-radio label="2">Java</lku-radio>
    <lku-radio label="3">GoLang</lku-radio>
    <lku-radio label="4">Python</lku-radio>
  </lku-radio-group>
<lku-radio-group v-model="value2" type="button" buttonType="fill"  style="margin: 10px 0">
    <lku-radio label="5">Vue</lku-radio>
    <lku-radio label="6">React</lku-radio>
    <lku-radio label="7">Angular</lku-radio>
    <lku-radio label="8" disabled>Jquery</lku-radio>
  </lku-radio-group>
<lku-radio-group v-model="value3" type="button" size="large">
    <lku-radio label="9">工程化</lku-radio>
    <lku-radio label="10" disabled>模块化</lku-radio>
    <lku-radio label="11" disabled>组件化</lku-radio>
    <lku-radio label="12">可视化</lku-radio>
  </lku-radio-group>
</template>
<script>
import {ref} from 'vue';

export default {
  setup() {
    const value1 = ref('1');
    const value2 = ref('6');
    const  value3= ref('12');
    return {value1,value2,value3}
  }
}
</script>
```
:::


### Radio Attributes

| 参数     | 说明                                                           | 类型              | 可选值 | 默认值  |      |
| :------- | :------------------------------------------------------------- | :---------------- | :----- | :------ | :--- |
| label    | 指定当前radio项的`value`值，仅组合使用时有效                   | `String | Number` | -      | -       | 否   |
| disabled | 是否禁用当前radio项                                            | `Boolean`         | -      | `false` | 否   |

### Radio Events

 | 事件名 | 说明                                          | 回调函数参数   |
 | :----- | :-------------------------------------------- | :------------- |
 | change | 点击radio值发生变化时触发，仅在单独使用时有效 | radio的label值 |

### Radio-Group Attributes

| 参数  | 说明                                               | 类型              | 可选值                    | 默认值       |      |
| :---- | :------------------------------------------------- | :---------------- | :------------------------ | :----------- | :--- |
| modelValue | radio-group绑定的值，可用`v-model`进行双向数据绑定 | `String | Number` | -                         | -            | 否   |
| mode  | 指定radio是水平还是垂直排列，对button组合时无效    | `String`          | `horizontal | vertical`   | `horizontal` | 否   |
| type  | 指定是作为`radio-group`还是`button-group`使用      | `String`          | `radio | button`          | `radio`      | 否   |
| size  | 指定`radio-group`组合使用时的尺寸                  | `String`          | `large | medium | small` | `medium`    | 否   |

### Radio-Group Events

 | 事件名 | 说明                       | 回调函数参数        |
 | :----- | :------------------------- | :------------------ |
 | change | 在点击选中项发生变化时触发 | 返回选中项的label值 |

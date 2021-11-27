## Dropdown下拉菜单
### 基本使用
:::demo
```html
<template>
  <lku-dropdown trigger="hover">
   <lku-button type="primary">hover触发</lku-button>
   <template v-slot:menu>
     <lku-dropdown-item>苹果</lku-dropdown-item>
 <lku-dropdown-item>香蕉</lku-dropdown-item>
 <lku-dropdown-item>西瓜</lku-dropdown-item>
 <lku-dropdown-item>红心火龙果</lku-dropdown-item>
 <lku-dropdown-item disabled>哈密瓜12222222222</lku-dropdown-item>
   </template>
 </lku-dropdown>
 <lku-dropdown style="margin-left: 10px">
   <lku-button type="primary">click触发</lku-button>
   <template v-slot:menu>
      <lku-dropdown-item>苹果</lku-dropdown-item>
      <lku-dropdown-item>香蕉</lku-dropdown-item>
      <lku-dropdown-item>西瓜</lku-dropdown-item>
      <lku-dropdown-item>红心火龙果</lku-dropdown-item>
      <lku-dropdown-item>哈密瓜12222222222</lku-dropdown-item>
   </template>
 </lku-dropdown>
</template>
```
:::

### Dropdown Attributes
| 参数      | 说明               | 类型     | 可选值          | 默认值         | 必填 |
| :-------- | :----------------- | :------- | :-------------- | :------------- | :--- |
| trigger   | 触发方式           | `String` | `click | hover` | `click`        | 否   |
| placement | dropdown显示的位置 | `String` | 同`popper.js`   | `bottom-start` | 否   |
| offset | 弹出层相对于reference的x、y轴偏移量 [x,y] | `Array` | 同`popper.js`   | [0,10] | 否   | 

### Dropdown Events
| 事件名         | 说明                           | 回调函数参数              |
| :------------- | :----------------------------- | :------------------------ |
| click          | 点击dropdown-item时触发        | 当前dropdown-item的name值 |
| click-outside    | 点击空白区域关闭dropdown时触发 | -                         |
| visible-change | dropdown展开收起状态变化时触发 | 当前状态                  |

### Dropdown Slots
| name | 说明                                          |
| :--- | :-------------------------------------------- |
| menu | dropdown的下拉内容，一般使用dropdown-menu组件 |

### DropdownItem Attributes

| 参数     | 说明       | 类型              | 可选值 | 默认值  | 必填 |
| :------- | :--------- | :---------------- | :----- | :------ | :--- |
| name     | 当前项的值 | `String | Number` | -      | -       | 否   |
| disabled | 是否禁用   | `Boolean`         | -      | `false` | 否   |

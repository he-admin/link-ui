## 分页组件
### 基本使用
:::demo
```html
<template>
 <lku-pagination :total="55"></lku-pagination> <br/>
 <lku-pagination :total="77"></lku-pagination> <br/>
<lku-pagination :total="500"  @page-change="pageChange">

</lku-pagination> <br/>
</template>
<script>
export default {
setup(){
const pageChange = (page)=>{
console.log(page);
}
return {pageChange}
}
}

</script>
```
:::

### 简约类型
:::demo
```html
<template>
 <lku-pagination :total="55" type="simple"></lku-pagination> <br/>
 <lku-pagination :total="77" type="simple"></lku-pagination> <br/>
<lku-pagination :total="500" type="simple"></lku-pagination> <br/>
</template>
```
:::

### 连体类型
:::demo
```html
<template>
 <lku-pagination :total="55" type="conjoin"></lku-pagination> <br/>
 <lku-pagination :total="77" type="conjoin"></lku-pagination> <br/>
<lku-pagination :total="500" type="conjoin"></lku-pagination> <br/>
</template>
```
:::


### Pagination Attributes

| 参数           | 说明                              | 类型      | 可选值 | 默认值                       | 必选 |
| :------------- | :-------------------------------- | :-------- | :----- | :--------------------------- | :--- |
| total          | 数据总量                          | `Number`  | -      | 0                            | 是   |
| page-size      | 每页数据条数                      | `Number`  | -      | -                            | 否   |
| current-page   | 当前页数，支持`.sync`语法双向绑定 | `Number`  | -      | `1Í`                         | 否   |
| type           | 分页器的类型                      | `String`  | -      | `simple | default | conjoin` | 否   |
| size           | 分页器的尺寸                      | `String`  | -      | `small | default | large`    | 否   | Í |
| show-total     | 显示总数                          | `Boolean` | -      | `false`                      | 否   |
| show-jumper    | 显示快捷跳转控件                  | `Boolean` | -      | `false`                      | 否   |
| show-page-size | 显示每页展示条数控件              | `Boolean` | -      | `false`                      | 否   |
| page-size-options     | 每页展示条数控件的配置            | `Array`   | -      | `[10, 15, 20, 50, 100, 500]`  | 否        | 否   |

### Pagination Events

 | 事件名             | 说明                       | 回调函数参数 |
 | :----------------- | :------------------------- | :----------- |
 | page-change        | 点击当前页数发生变化时、点击上一页按钮时、点击下一页按钮时、切换每页展示条数时以上四个事件任一事件执行，都会触发该page-change事件|  当前{current,page-size  }
### Pagination Slots

 | 名称 | 说明               |
 | :--- | :----------------- |
 | prev | 自定义上一页的内容 |
 | next | 自定义下一页的内容 |

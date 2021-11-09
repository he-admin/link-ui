## Tooltip组件

### 基本使用
:::demo
```html
<template>
  <div class="tooltip-box" style="width: 400px">
   <div style="display: flex;justify-content: center">
<lku-tooltip placement="top-start" content="这是tooltip的文字提示">
 <lku-button>上左</lku-button>
</lku-tooltip>
    <lku-tooltip placement="top" content="这是tooltip的文字提示">
     <lku-button>上边</lku-button>
    </lku-tooltip>
<lku-tooltip placement="top-end" content="这是tooltip的文字提示">
 <lku-button>上右</lku-button>
</lku-tooltip>
   </div>
 <div style="display: flex;justify-content: space-between;">
<lku-tooltip placement="left-start" content="这是tooltip的文字提示">
  <lku-button>左上</lku-button>
</lku-tooltip>
   <lku-tooltip placement="right-start" content="这是tooltip的文字提示">
       <lku-button>右上</lku-button>
</lku-tooltip>
   </div>
<div style="display: flex;justify-content: space-between;margin: 10px 0">
<lku-tooltip placement="left" content="这是tooltip的文字提示">
  <lku-button>左中</lku-button>
</lku-tooltip>
   <lku-tooltip placement="right-end" content="这是tooltip的文字提示">
       <lku-button>右中</lku-button>
</lku-tooltip>
   </div>
<div style="display: flex;justify-content: space-between">
<lku-tooltip placement="left-end" content="这是tooltip的文字提示">
  <lku-button>左下</lku-button>
</lku-tooltip>
   <lku-tooltip placement="right-end" content="这是tooltip的文字提示">
       <lku-button>右下</lku-button>
</lku-tooltip>
   </div>
 <div style="display: flex;justify-content: center">
 <lku-tooltip placement="bottom-start" content="这是tooltip的文字提示">
       <lku-button>下左</lku-button>
</lku-tooltip>
<lku-tooltip placement="bottom" content="这是tooltip的文字提示">
       <lku-button>下中</lku-button>
</lku-tooltip>
<lku-tooltip placement="bottom-end" content="这是tooltip的文字提示">
       <lku-button>下右</lku-button>
</lku-tooltip>
   </div>
</div>
</template>
```
::::

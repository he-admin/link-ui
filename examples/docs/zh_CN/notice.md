## Notice组件

### 基本使用
:::demo
```html
<template>
  <div>
    <lku-button @click="openNotice('info')">info类型通知</lku-button>
    <lku-button @click="openNotice('error')">error类型通知</lku-button>
    <lku-button @click="openNotice('success')">success类型通知</lku-button>
    <lku-button @click="openNotice('warning')">warning类型通知</lku-button>
  </div>
</template>
<script>
import {getCurrentInstance} from 'vue'

export default {
  setup() {
    const instance = getCurrentInstance();
    const {$notice} = instance.appContext.config.globalProperties
    const openNotice = (type) => {
      $notice[type]({duration: 2000, title: `这是一条${type}消息，默认1.5s之后隐藏`, content:'这是notice组件的content内容',closeable: true});
    }

    return {openNotice}
  }
}
</script>

```

### 自定义显示时长
支持自定义显示时间，默认显示1.5s，支持其他时长或者永久显示
:::demo
```html
<template>
  <lku-button @click="message1">默认1.5s</lku-button>
  <lku-button @click="message2">设置显示时间为3s</lku-button>
  <lku-button @click="message3">不自动关闭，可以显示关闭按钮</lku-button>
</template>

<script>
import {getCurrentInstance} from 'vue';

export default {
  setup() {
    const instance = getCurrentInstance();
    const {$notice} = instance.appContext.config.globalProperties;
    const message1 = () => {
      $notice.success('这是一条默认的1.5s提示')
    };
    const message2 = () => {
      $notice.success({
        title: '这是一条3s后关闭的提示',
        duration: 3000
      })
    }
    const message3 = () => {
      $notice.success({
        title: '这是一条不会自动关闭的提示',
        duration: 0,
        closeable: true
      })
    }
    return {message1, message2, message3}
  }
}
</script>

```
:::


### 渲染html
支持自定义显示时间，默认显示1.5s，支持其他时长或者永久显示

::: mku-doc__warning
动态渲染HTML容易导致XSS攻击。应确保render的值是安全可靠的，禁止将用户提交的内容赋值给该属性。
:::

:::demo
```html
<template>
  <lku-button @click="message">自定义html</lku-button>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
  setup() {
    const instance = getCurrentInstance();
    const {$notice} = instance.appContext.config.globalProperties;
    const message = () => {
      const html = `本次共提交<i style="color: red;"> 666 </i>条数据`
      $notice.success({render: html})
    }
    return {message}
  }
}
</script>
```
:::

### Message Attributes

| 参数      | 说明                                                          | 类型     | 可选值 | 默认值 | 必填 |
| :-------- | :------------------------------------------------------------ | :------- | :----- | :----- | :--- |
| title   | 提示的标题                                               | String   | -      | -      | 否   |
| content   | 提示的内容                                                | String   | -      | -      | 否   |
| render    | 以v-html方式渲染render的内容，设置该属性时自动忽略content内容 | String   | -      | -      | 否   |
| duration  | 提示的时间                                                    | Number   | -      | 1500   | 否   |
| closeable | 是否显示关闭按钮                                              | Boolean  | -      | false  | 否   |
| onShow    | 显示的回调函数                                                | Function | -      | -      | 否   |
| onClose   | 关闭的回调函数                                                | Function | -      | -      | 否   |

### Message 实例方法
| 方法名 | 说明                | 参数 |
| :----- | :------------------ | :--- |
| close  | 关闭当前notice实例 | -    |


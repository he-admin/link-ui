## Select选择器
### 基本使用
##### 支持单选、多选

:::demo
```html
<template>
  <div class="doc-select" style="display: flex;align-items: center">
    <lku-select v-model="value1">
      <lku-option v-for="item in languageList" :key="item.value" :value="item.value">
        {{ item.name }}
      </lku-option>
    </lku-select>
    <lku-select v-model="value2" multiple>
      <lku-option v-for="item in multipleList" :key="item.value" :value="item.value">
        {{ item.name }}
      </lku-option>
    </lku-select>
    <span>选中的值：{{value2}}</span>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref(1);
    const languageList = ref([{name: 'JavaScript', value: 1}, {name: 'Python', value: 2}, {
      name: 'NodeJs',
      value: 3
    }, {name: 'GoLang', value: 4}]);
    const multipleList = ref([{name: '苹果', value: 5}, {name: '香蕉', value: 6}, {name: '哈密瓜', value: 7}, {
      name: '西瓜',
      value: 8
    }])
    const value2 = ref([5, 6])
    return {languageList, value1, multipleList, value2}
  }
}
</script>
```
:::

### 禁用
##### 支持禁用select整个下拉框和option选项
:::demo
```html
<template>
  <div class="doc-select" style="display: flex;align-items: center">
    <lku-select v-model="value1" disabled placeholder="select被禁用">
      <lku-option v-for="item in languageList" :key="item.value" :value="item.value">
        {{ item.name }}
      </lku-option>
    </lku-select>
    <lku-select v-model="value2" multiple>
      <lku-option v-for="item in multipleList" :key="item.value" :value="item.value" :disabled="item.disabled">
        {{ item.name }}
      </lku-option>
    </lku-select>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref(1);
    const languageList = ref([{name: 'JavaScript', value: 1}, {name: 'Python', value: 2}, {
      name: 'NodeJs',
      value: 3
    }, {name: 'GoLang', value: 4}]);
    const multipleList = ref([{name: '苹果', value: 5,disabled:true}, {name: '香蕉', value: 6,disabled: true}, {name: '哈密瓜', value: 7}, {
      name: '西瓜',
      value: 8
    }])
    const value2 = ref([7])
    return {languageList, value1, multipleList, value2}
  }
}
</script>

```
:::

### 分组
:::demo
```html
<template>
  <lku-select placeholder="请选择" multiple v-model="value">
    <lku-options-group v-for="(group,index) in list" :label="group.label" :key="index">
      <lku-option v-for="option in group.list" :value="option.value" :key="option.value">
        {{ option.name }}
      </lku-option>
    </lku-options-group>
  </lku-select>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value = ref([1, 3, 5]);
    const list = ref([{
      label: '水果',
      list: [{name: '苹果', value: 1}, {name: '香蕉', value: 2}, {name: '火龙果', value: 3}, {name: '哈密瓜', value: 4}]
    }, {
      label: '肉类',
      list: [{name: '肌肉', value: 5}, {name: '猪肉', value: 6}, {name: '牛肉', value: 7}, {name: '肥肉', value: 8}]
    }])
    return {
      value, list
    }
  }
}
</script>
```
:::

### 清除
:::demo
```html
<template>
  <div class="doc-select" style="display: flex;align-items: center">
    <lku-select v-model="value" clearable>
      <lku-option v-for="item in languageList" :key="item.value" :value="item.value">
        {{ item.name }}
      </lku-option>
    </lku-select>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  setup() {
    const value = ref(1);
    const languageList = ref([{name: 'JavaScript', value: 1}, {name: 'Python', value: 2}, {
      name: 'NodeJs', value: 3}, {name: 'GoLang', value: 4}]);
    return {value,languageList}
  }
}
</script>

```
:::
 ### Select Attributes
 
| 参数        | 说明                                    | 类型                                        | 可选值                    | 默认值         | 必填 |                                                                                                       
| :---------- | :-------------------------------------- | :------------------------------------------ | :-------------------- | :------------- | :--- |
| value       | Select组件绑定的值，可使用v-model绑定       | 单选时： `String | Number`，多选时： Array     |  -                     |      -        |      是                      
| multiple    | 是否开启多选                              | Boolean                                     | `true | false`        |  false         | 否
| placeholder | 选择框默认填默认占位符内容                  | String                                      | -                      | 请选择         | 否
| disabled    | 是否禁用select选择框                      | Boolean                                     | `true | false`         | false         | 否
| clearable   | 是否开启清除功能                          | Boolean                                     | `true | false`         | false         | 否

### Select Events
 
| 参数        | 说明                      |   回调函数参数                                                                                                    
| :---------- | :------------------------| :--- |-------
| change      |  选中项发生变化触发的回调函数 |   选中的值
| clear       | 清空选项时触发             | -     |

 ### SelectGroup Attributes
 
| 参数        | 说明                                    | 类型                  | 可选值                 | 默认值         | 必填 |                                                                                                       
| :---------- | :-------------------------------------- | :------------------ | :-------------------- | :------------- | :--- |
| label       | 每个select-group绑定的label               | String              |  -                     |      -        |      是 


### Option Attributes
 
| 参数        | 说明                      | 类型                  | 可选值                 | 默认值         | 必填 |                                                                                                       
| :---------- | :------------------------| :------------------ | :-------------------- | :------------- | :--- |
| disabled    | 是否禁用option选项          |   Boolean                 | `true          | false` |    false       |    否 

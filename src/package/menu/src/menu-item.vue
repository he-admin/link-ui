<template>
  <li :class="[menuItemClasses,className]">
    <slot></slot>
  </li>
</template>

<script>
import {computed} from 'vue'

export default {
  name: "MkuMenuItem",
  props: {
    // 菜单名字
    name: {
      type: String,
      require: true
    },
    // 自定义className
    className: {
      type: String,
      default: ''
    },
    // 菜单是否禁用
  },
  setup(props, {emit}) {

  }
}
</script>

<style scoped>

</style>

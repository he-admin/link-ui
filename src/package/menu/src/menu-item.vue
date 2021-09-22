<template>
  <li :class="[menuItemClasses,className]">
    <slot></slot>
  </li>
</template>

<script>
import {computed} from 'vue'

const PREFIX_MENU_ITEM = 'lku-menu-item';
export default {
  name: "LkuMenuItem",
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
  setup(props,) {
    const menuItemClasses = computed(() => {
      return [PREFIX_MENU_ITEM, {
        [`${PREFIX_MENU_ITEM}--active`]: props.isActive,
        [`${PREFIX_MENU_ITEM}--disabled`]: props.disabled
      }]
    })
    return {menuItemClasses}
  }
}
</script>

<style scoped>

</style>

<template>
  <li :class="[menuItemClasses,className]" @click="handleClick">
    <slot></slot>
  </li>
</template>

<script>
import {watch, computed, ref, inject} from 'vue'
import useEmit from '../../../utils/emiter';

const PREFIX_MENU_ITEM = 'lku-menu-item';
export default {
  name: "LkuMenuItem",
  mixins: [],
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
    disabled: {
      type: Boolean,
      default: false
    },
    route: {
      type: [Object, String],
    }
  },
  setup(props, {emit}) {
    const {dispatch} = useEmit();
    const menu = inject('menu');
    const handleClick = () => {
      emit('click', props); // 向父组件(一层)传递事件
      dispatch('menu-item-click', props) // 向父级及以上的组件传递事件（多层）
    }
    watch(() => menu, (newVal) => {
      console.log(newVal);
    })

    const menuItemClasses = computed(() => {
      return [PREFIX_MENU_ITEM, {
        [`${PREFIX_MENU_ITEM}--active`]: props.name === menu.activeItemName.value,//isActive.value,
        [`${PREFIX_MENU_ITEM}--disabled`]: props.disabled
      }]
    })
    return {menuItemClasses, handleClick, menu}
  }
}
</script>

<style scoped>

</style>

<template>
  <div :class="menuClasses" :style="menuStyle">
    <slot>
    </slot>
  </div>
</template>

<script>
const MENU = 'lku-menu';
const MENU_WIDTH = 200;
import {computed, provide, ref} from 'vue'
import {useRouter} from 'vue-router'
import useEmit from '../../../utils/emiter';

export default {
  name: "LkuMenu",
  props: {
    // 模式：水平/垂直
    mode: {
      type: String,
      default: 'vertical',
      validator: (val) => ['horizontal', 'vertical'].includes(val)
    },
    // 自定义菜单宽度
    width: {
      type: Number,
      default: MENU_WIDTH
    },
    // 菜单动画过渡时间
    duration: {
      type: Number,
      default: 0.5
    },
    // 动画方式
    animate: {
      type: String,
      default: 'linear'
    },
    // 默认选中的菜单项
    defaultActive: {
      type: String,
      default: ''
    },
    defaultOpened: {
      type: Array,
      default: () => []
    }
  },
  setup(props, {emit}) {
    let activeItemName = ref(props.defaultActive);
    provide('menu', {activeItemName});
    //provide('handleItemClick', handleItemClick);

    const router = useRouter();
    const {on} = useEmit();
    //router.push({path: '/component/menu2'})
    const menuClasses = computed(() => {
      return [MENU, {
        [`${MENU}--vertical`]: props.mode === 'vertical',
        [`${MENU}--horizontal`]: props.mode === 'horizontal',
      }]
    })
    const menuStyle = computed(() => {
      // 只有vertical模式，才支持定宽
      let objStyle = {width: MENU_WIDTH + 'px'};
      if (props.mode === 'vertical') {
        // assign第一个参数是目标参数，后面的参数都是源对象
        Object.assign(objStyle, {width: props.width + 'px'});
      }
      return objStyle;
    })

    const handleItemClick = (item) => {
      activeItemName.value = item.name // 菜单名字
      emit('select', item); // 向使用menu组件的组件暴露方法
      console.log(item.route);
      router.push(item.route);
      console.log(activeItemName.value);
    }

    on('menu-item-click', handleItemClick);
    return {menuClasses, activeItemName, menuStyle, handleItemClick}
  }
}
</script>

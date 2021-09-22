<template>
  <div :class="menuClasses">
   <slot></slot>
  </div>
</template>

<script>
const MENU = 'lku-menu';
import {computed} from 'vue'

export default {
  name: "LkuMenu",
  props: {
    mode: {
      type: String,
      default: 'vertical',
      validator: (val) => ['horizontal', 'vertical'].includes(val)
    }
  },
  setup(props) {
    const menuClasses = computed(() => {
      return [MENU, {
        [`${MENU}--vertical`]: props.mode === 'vertical',
        [`${MENU}--horizontal`]: props.mode === 'horizontal',
      }]
    })
    return {menuClasses}
  }
}
</script>

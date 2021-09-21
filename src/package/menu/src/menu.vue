<template>
  <div :class="menuClasses">
    这是菜单组件
  </div>
</template>

<script>
const MENU = 'mku-menu';
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
        [`${MENU}__vertical`]: props.mode === 'vertical',
        [`${MENU}__horizontal`]: props.mode === '__horizontal',
      }]
    })
    return {menuClasses}
  }
}
</script>

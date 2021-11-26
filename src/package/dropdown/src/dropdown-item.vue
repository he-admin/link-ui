<template>
  <div :class="['lku-dropdown__item',{
    'lku-dropdown__item--disabled': disabled,
    'lku-dropdown__item--active': active,
  }]">
    <slot></slot>
  </div>
</template>

<script>
import useEmit from '../../../utils/emiter';
export default {
  name: "LkuDropdownItem",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  setup(){
    const {dispatch} = useEmit();
  }
}
</script>

<style scoped>

</style>

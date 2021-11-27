<template>
  <div :class="['lku-dropdown__item',{
    'lku-dropdown__item--disabled': disabled,
    'lku-dropdown__item--active': active}]"
       @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
import useEmit from '../../../utils/emiter';

export default {
  name: "LkuDropdownItem",
  props: {
    name: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const {dispatch} = useEmit();
    const handleClick = () => {
      if (props.disabled) {
        return false;
      }
      dispatch('dropdownClick')
    }
    return {handleClick}
  }
}
</script>

<style scoped>

</style>

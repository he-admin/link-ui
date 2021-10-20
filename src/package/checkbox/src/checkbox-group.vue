<template>
  <div class="lku-checkbox__group">
    <slot></slot>
  </div>
</template>

<script>
import {ref, provide, computed} from 'vue';

import useEmit from '../../../utils/emiter';

export default {
  name: "LkuCheckboxGroup",
  emits: ['update:modelValue', 'change'],
  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  setup(props, {emit, slots}) {
    const {on} = useEmit();
    console.log(slots.default.children);
    const checkboxSelectedValue = computed(() => {
      return props.modelValue;
    });
    provide('checkboxSelectedValue', checkboxSelectedValue);

    on('change', (val) => {
      let index = checkboxSelectedValue.value.indexOf(val);
      if (index !== -1) {
        checkboxSelectedValue.value.splice(index, 1)
      } else {
        checkboxSelectedValue.value.push(val);
      }
      emit('update:modelValue', checkboxSelectedValue.value);
      emit('change', checkboxSelectedValue.value);
    })
    return {checkboxSelectedValue}
  }
}
</script>

<style scoped>

</style>

<template>
  <li class="lku-global-ellipsis" :class="optionClasses" @click="handleOptionClick">
    <slot></slot>
  </li>
</template>

<script>
import {ref, computed, inject, getCurrentInstance, onMounted} from 'vue'
import useEmit from '../../../utils/emiter';

export default {
  name: "LkuOption",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  setup(props) {
    const {dispatch} = useEmit();
    const {ctx} = getCurrentInstance();
    onMounted(() => {
      console.log(ctx);
    })
    const selectedOptions = inject('lkuSelected');
    let isActive = ref(false);

    const handleOptionClick = (event) => {
      console.log(selectedOptions,props.value,isActive.value);
      if (props.disabled) {
        return event.stopPropagation(); // 阻止冒泡
      }
      // 方法名字
      dispatch('lku-option-select', {value: props.value, name: props.label || ctx?.$el?.textContent})
    }
    const optionClasses = computed(() => {
      isActive.value = selectedOptions.value.some(item => item.value === props.value);
      return ['lku-option', {
        'lku-option--actived': isActive.value,
        'lku-option--disabled': props.disabled
      }]
    });
    return {optionClasses, handleOptionClick,selectedOptions}
  }
}
</script>

<style scoped>

</style>

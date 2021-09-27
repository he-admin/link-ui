<template>
  <li :class="optionClasses" @click="handleOptionClick">
    <slot></slot>
  </li>
</template>

<script>
import {computed, inject,getCurrentInstance,onMounted} from 'vue'
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
    const {ctx} =getCurrentInstance();
    onMounted(()=>{
      console.log(ctx);
    })
    const selectedOptions = inject('lkuSelected');
    let isActive = selectedOptions.some(item => item.value === props.value);
    const optionClasses = computed(() => {
      return ['lku-option', {
        'lku-option--actived': isActive,
        'lku-option--disabled': props.disabled
      }]
    });
    const handleOptionClick = (event) => {
      if (props.disabled) {
        return event.stopPropagation(); // 阻止冒泡
      }
      // 方法名字
      dispatch('lku-option-select', {value: props.value, name: props.label || ctx?.$el?.textContent})
    }
    return {optionClasses, handleOptionClick}
  }
}
</script>

<style scoped>

</style>

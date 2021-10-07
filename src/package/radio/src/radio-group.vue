<template>
  <div :class="[{
    'lku-radio__group': type=== 'radio',
    'lku-radio-group__vertical': mode === 'vertical',
    'lku-button__group': type === 'button',
    'lku-button-group__fill': type === 'button' && buttonType === 'fill',
    'lku-button-group__sm':size === 'small',
    'lku-button-group__lg': size === 'large'
  }]">
    <slot></slot>
  </div>
</template>

<script>
import {provide, computed, getCurrentInstance} from 'vue';
import useEmit from '../../../utils/emiter';

export default {
  name: "LkuRadioGroup",
  emits: ['update:modelValue', 'change'],
  props: {
    modelValue: {
      type: [Boolean, String, Number]
    },
    mode: {
      type: String,
      default: 'horizontal',
      validator: (val) => ['horizontal', 'vertical'].includes(val)
    },
    type: {
      type: String,
      default: 'radio',
      validator: (val) => ['radio', 'button'].includes(val)
    },
    buttonType: {
      type: String,
      default: 'line',
      validator: (val) => ['line', 'fill'].includes(val)
    },
    // 仅在type为button模式下设置有效
    size: {
      type: String,
      default: 'medium',
      validator: (val) => ['small', 'medium', 'large'].includes(val)
    }
  },
  setup(props, {emit}) {
    const {on} = useEmit();
    const selectedValue = computed(() => {
      return props.modelValue
    })
    // 注意selectedValue需要写成计算属性，如果provide直接传props.modelValue，不具备响应式
    provide('selectedValue', selectedValue);
    provide('isButtonGroup', getCurrentInstance()?.props?.type);
    on('change', (value) => {
      emit('update:modelValue', value);
      emit('change', value)
    })
    return {}
  }
}
</script>

<style lang="less">

</style>

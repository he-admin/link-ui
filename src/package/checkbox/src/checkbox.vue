<template>
  <label :class="checkboxClasses">
    <span class="lku-checkbox__content">
     <span class="lku-checkbox">
       <span class="lku-checkbox__inner">
          <input type="checkbox"
                 class="lku-checkbox__input"
                 :checked="checkboxValue"
                 :disabled="disabled"
                 @change="handleCheckboxChange">
       </span>
     </span>
      <!--      文字插槽-->
      <span>
        <slot></slot>
      </span>
    </span>
  </label>
</template>

<script>
import {computed, inject, getCurrentInstance} from 'vue';
import useEmit from '../../../utils/emiter';

export default {
  name: "LkuCheckbox",
  emits: ['update:modelValue', 'change'],
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    // 自定义选中的值
    trueValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    // 自定义未选中的值
    falseValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 作为group使用，checkbox展示的label
    label: {
      type: [String, Number],
      default: ''
    },
    indeterminate: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const {dispatch} = useEmit();
    // 获取父组件的name，如果使用了checkbox-group，通过name来判断
    const {name} = getCurrentInstance()?.parent?.type;
    const isGroup = name === 'LkuCheckboxGroup';
    const checkboxValue = computed(() => {
      // 使用checkbox-group组
      if (isGroup) {
        const checkboxSelectedValue = inject('checkboxSelectedValue');
        return checkboxSelectedValue.value.includes(props.label)
      } else { // 单独使用checkbox
        const isIncluded = [props.trueValue, props.falseValue].includes(props.modelValue);
        if (isIncluded) {
          return props.modelValue === props.trueValue;
        } else {
          throw new TypeError('v-model请绑定trueValue或falseValue指定的值')
        }
      }
    })
    const checkboxClasses = computed(() => {
      return ['lku-checkbox__wrapper', {
        'lku-checkbox__checked': checkboxValue.value,
        'lku-checkbox__disabled': props.disabled,
        'lku-checkbox__indeterminate': props.indeterminate
      }]
    });

    const handleCheckboxChange = (event) => {
      if (props.disabled) {
        return
      }
      if (isGroup) {
        dispatch('change', props.label);
      } else {
        const value = event?.target?.checked ? props.trueValue : props.falseValue;
        emit('update:modelValue', value);
        emit('change', value);
      }
    }
    return {isGroup, checkboxValue, checkboxClasses, handleCheckboxChange}
  }
}
</script>

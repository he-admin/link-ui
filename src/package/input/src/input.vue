<template>
  <div :class="['lku-input-wrapper']">
    <template v-if="type!=='textarea'">
      <input :type="type"
             ref="input"
             :placeholder="placeholder"
             :class="['lku-input',`lku-input__${size}`]"
             :style="{paddingRight: clearable? '22px': '8px',width: `${width}px`,textAlign}"
             :value="currentValue"
             :disabled="disabled"
             :readonly="readonly"
             @input="handleInput"
             @focus="handleFocus"
             @blur="handleFocus"
             @keydown.enter="handleEnter">
      <i v-if="showClearIcon"
         @click="handleClear"
         class="lku-icon lku-input__clear">&#xe633;</i>
    </template>
    <textarea v-else
              ref="textarea"
              :placeholder="placeholder"
              :rows="rows"
              :class="['lku-textarea']"
              :style="{width: `${width}px`}"
              :value="currentValue"
              :disabled="disabled"
              :readonly="readonly"
              @input="handleInput"
              @focus="handleFocus"
              @blur="handleFocus"
              @keydown.enter="handleEnter">
    </textarea>
  </div>
</template>

<script>
import {ref, computed, watch, onMounted} from 'vue';

import useEmit from '../../../utils/emiter';

export default {
  name: "LkuInput",
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: (val) => ['small', 'medium', 'large'].includes(val)
    },
    type: {
      type: String,
      default: 'text',
      validator: (val) => ['text', 'textarea', 'password'].includes(val)
    },
    rows: {
      type: Number,
      default: 2
    },
    clearable: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number,String],
      default: 200
    },
    // input框内文字对齐
    textAlign: {
      type: String,
      default: 'left',
      validator: (val) => ['left', 'center', 'right'].includes(val)
    },
    maxValue:{
      type: Number
    },
    minValue:{
      type: Number
    }
  },
  setup(props, {emit}) {
    const {dispatch} = useEmit();
    const input = ref(null);
    const textarea = ref(null);
    const currentValue = ref(props.modelValue);
    watch(() => {
      return props.modelValue
    }, (newVal) => {
      currentValue.value = newVal;
    })
    const showClearIcon = computed(() => {
      return props.clearable && currentValue.value.length
    })
    onMounted(() => {
      const input = input || textarea;
      if (input.value) {
        input.value.focus();
      }
    })
    const handleInput = (event) => {
      const value =  event?.target?.value;
      console.log(typeof value);
      if(props.type==='number' && (props.minValue || props.maxValue)){

      }
      currentValue.value =value;
      emit('update:modelValue', currentValue.value);
      emit('change', currentValue.value);
      dispatch('onFormItemChange', currentValue.value);
    };
    const handleFocus = (event) => {
      emit('focus', event);
    };
    const handleBlur = (event) => {
      emit('blur', event);
      dispatch('onFormItemChange', currentValue.value);
    };
    const handleClear = () => {
      currentValue.value = '';
      emit('update:modelValue', currentValue.value);
    }
    const handleEnter = (event) => {
      emit('enter', event)
    }
    return {
      currentValue,
      showClearIcon,
      input,
      textarea,
      handleInput,
      handleFocus,
      handleBlur,
      handleClear,
      handleEnter
    }
  }
}
</script>

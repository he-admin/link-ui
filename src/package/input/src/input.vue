<template>
  <div :class="['input-wrapper']">
    <template v-if="type==='text'">
      <input type="text"
             ref="input"
             :placeholder="placeholder"
             :class="['lku-input',`lku-input__${size}`]"
             :style="{paddingRight: clearable? '22px': '8px',width: `${width}px`}"
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
import {ref, computed, onMounted} from 'vue';

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
      validator: (val) => ['text', 'textarea'].includes(val)
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
      type: Number,
      default: 200
    }
  },
  setup(props, {emit}) {
    const input = ref(null);
    const textarea = ref(null);
    const currentValue = ref(props.modelValue);
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
      currentValue.value = event?.target?.value;
      emit('update:modelValue', currentValue.value);
      emit('change', currentValue.value);
    };
    const handleFocus = (event) => {
      emit('focus', event)
    };
    const handleBlur = (event) => {
      emit('blur', event)
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

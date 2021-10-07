<template>
  <label :class="['lku-radio',{'lku-radio__actived':checked,'lku-radio__disabled':disabled}]">
    <span class="lku-radio__inner"
          v-if="isButtonGroup">
    </span>
    <input type="radio"
           @click="handleRadioChange"
           :value="label"
           class="lku-radio__input">
    <slot></slot>
  </label>
</template>

<script>
import {inject, computed} from 'vue';
import useEmit from '../../../utils/emiter';

export default {
  name: "LkuRadio",
  props: {
    label: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const {dispatch} = useEmit();
    const selectedValue = inject('selectedValue');
    const isButtonGroup = inject('isButtonGroup');
    const checked = computed(() => {
      return props.label === selectedValue.value;
    })

    const handleRadioChange = (e) => {
      if (props.disabled) {
        return;
      }
      dispatch('change', e?.target?.value);
    }
    return {checked, isButtonGroup, handleRadioChange, selectedValue}
  }
}
</script>

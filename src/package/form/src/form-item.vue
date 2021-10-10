<template>
  <div :class="['lku-form-item']">
    <label :class="labelClasses" :style="labelStyle">
      {{ label }}
    </label>
    <div class="lku-from-item__content">
      <slot></slot>
      <p class="lku-form-item__error" v-if="isShowError"></p>
    </div>
  </div>
</template>

<script>
import {ref, computed, inject} from 'vue'

const FORM_ITEM = 'lku-form-item';
export default {
  name: "LkuFormItem",
  props: {
    // 当前form-item v-model绑定的key名
    prop: {
      type: String
    },
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: Number
    },
    labelPosition: {
      type: String,
      default: 'right',
      validator: (val) => ['left', 'right', 'top'].includes(val)
    }
  },
  setup(props) {
    const lkuForm = inject('lkuForm').props;
    const isShowError = ref(false);
    const labelClasses = computed(() => {
      const isRequired = formItemRules.value.some(rule => rule.required);
      return [`${FORM_ITEM}__label`,
        {[`${FORM_ITEM}__required`]: isRequired}
      ]
    })
    const labelStyle = computed(() => {
       let style = {textAlign: 'right'};
       console.log(lkuForm.labelWidth);
       if(lkuForm.labelWidth){
         style.width = `${lkuForm.labelWidth}px`;
       }
       if(props.labelWidth){
         style.width = `${props.labelWidth}px`;
       }
       return style
    })
    // 获取当前item的rules
    const formItemRules = computed(() => {
      const {rules} = lkuForm;
      return (rules && rules[props.prop]) || []
    })
    return {
      isShowError,
      labelClasses, labelStyle
    }
  }
}
</script>

<style lang="less">

</style>

<template>
  <div :class="formItemClasses">
    <label :class="labelClasses" :style="labelStyle">
      {{ label }}
    </label>
    <div :class="['lku-form-item__content',{'lku-form-item__content__error':isShowError}]">
      <slot></slot>
      {{ validateMessage }}
      <p class="lku-form-item__error" v-if="isShowError">
        {{ validateMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import {ref, computed, inject, getCurrentInstance} from 'vue';
import useEmit from '../../../utils/emiter';
import Schema from 'async-validator';
import {isFunction} from '../../../utils/utils';

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
    }
  },
  setup(props) {
    const {on} = useEmit();
    const lkuForm = inject('lkuForm').ctx;

    // 缓存原始数据
    const originFiledData = lkuForm.model[props.prop];
    // 子组件调用父亲的缓存方法
    lkuForm.cacheFormItem(getCurrentInstance().ctx);
    const isShowError = computed(() => {
      return validateMessage.value !== ''
    })
    let validateMessage = ref('');
    const formItemClasses = computed(() => {
      return [FORM_ITEM, {
        [`${FORM_ITEM}__column`]: lkuForm.labelPosition === 'top'
      }]
    });
    const labelClasses = computed(() => {
      const isRequired = formItemRules.some(rule => rule.required);
      return [`${FORM_ITEM}__label`,
        {[`${FORM_ITEM}__required`]: isRequired}
      ]
    })
    const labelStyle = computed(() => {
      let style = {};
      console.log(lkuForm.labelWidth);
      if (lkuForm.labelWidth) {
        style.width = `${lkuForm.labelWidth}px`;
      }
      if (props.labelWidth) {
        style.width = `${props.labelWidth}px`;
      }
      style.textAlign = lkuForm.labelPosition;
      return style
    })
    // 获取当前item的rules
    const formItemRules = computed(() => {
      const {rules} = lkuForm;
      return (rules && rules[props.prop]) || []
    }).value;
    console.log(formItemRules);
    // 获取当前item设置的change事件 rule
    const rulesOfChange = computed(() => {
      return formItemRules.filter(rule => rule?.trigger?.includes('change'))
    })
    // 获取当前item设置的blur事件 rule
    const rulesOfBlur = computed(() => {
      return formItemRules.filter(rule => rule?.trigger?.include('blur'))
    })
    const validate = (rules, callback) => {
      // 设置要检验的规则和需要被校验的值
      const descriptor = {[props.prop]: rules || formItemRules};
      const sourceValue = {[props.prop]: lkuForm.model[props.prop]};
      const validator = new Schema(descriptor);
      validator.validate(sourceValue, (error, fields) => {
        // 若校验通过，回调函数error参数是null，否则是 [{filed:'', message:'', filedValue: ''}]
        if (error) {
          validateMessage.value = error[0].message;
        } else {
          validateMessage.value = ''
        }
        // 自定义回调函数，当调用validate方法，传入的回调函数的参数的值就是validateMessage
        if (isFunction(callback)) {
          callback(validateMessage.value)
        }
      })
    }
    const onFiledChange = () => {
      console.log(rulesOfChange.value);
      if (!rulesOfChange.value.length) {
        return
      }
      validate(rulesOfChange.value);
    };
    const onFiledBlur = () => {
      if (!rulesOfBlur.length) {
        return
      }
      validate(rulesOfBlur)
    };
    /**
     * @method resetFiled
     * @description 重置当前FormItem的值和校验提醒，注意是重置不是清空
     */
    const resetFiled = () => {
      validateMessage.value = '';
      // 注意这里采用了一个小技巧是，因为model值是引用数据类型，所以子组件可以直接修改父组件的props，且同步数据
      lkuForm.model[props.prop] = originFiledData;
    }
    on('onFormItemChange', onFiledChange);
    on('onFormItemBlur', onFiledBlur)
    return {
      isShowError, validateMessage,
      formItemClasses,
      labelClasses, labelStyle,
      validate,
      resetFiled
    }
  }
}
</script>

<style lang="less">

</style>

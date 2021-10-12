<template>
  <form class="lku-form">
    <slot></slot>
  </form>
</template>

<script>
import {reactive, provide, getCurrentInstance} from 'vue'
import {isFunction} from '@/utils/utils';

export default {
  name: "LkuForm",
  props: {
    model: {
      type: Object,
      default: () => {
      }
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: Number,
      default: 80
    },
    labelPosition: {
      type: String,
      default: 'right',
      validator: (val) => ['left', 'right', 'top'].includes(val)
    }
  },
  setup(props) {
    const allFormItems = reactive([]);
    provide('lkuForm', getCurrentInstance());
    const cacheFormItem = (formItem) => {
      allFormItems.push(formItem);
    }

    // 重置多个FormItem的值,通过父组件依次调用每个子组件FormItem的resetField方法
    const resetFields = () => {
      allFormItems.forEach(formItem => {
        formItem.resetFiled();
      })
    }

    /**
     * @method validateFormItems
     * @description 验证所有的form-item是否符合校验规则
     * @param { Array } formItems
     * @param { Function } successCb
     * @param { Function } errorCb
     */
    const validateFormItems = (formItems, successCb, errorCb) => {
      try {
        let isValid = true;
        formItems.forEach(item => {
          item.validate(null, (error) => {
            // 说明validateMessage参数未校验通过
            if (error) {
              // 只要有一个未校验通过，表单验证就不通过
              isValid = false;
            }
          })
        })
        if (isFunction(successCb)) {
          successCb(isValid)
        }
      } catch (error) {
        if (isFunction(errorCb)) {
          errorCb(error)
        }
      }
    };
    const validate = (successCb, errorCb) => {
      validateFormItems(allFormItems, successCb, errorCb);
    }
    return {
      cacheFormItem, resetFields,
      validateFormItems, validate
    }
  }
}
</script>

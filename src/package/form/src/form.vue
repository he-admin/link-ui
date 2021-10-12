<template>
  <form class="lku-form">
    <slot></slot>
  </form>
</template>

<script>
import {reactive, provide, getCurrentInstance} from 'vue'
import {isFunction} from '../../../utils/utils';

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
      console.log(allFormItems);
    }
    // 重置多个FormItem的值,通过父组件依次调用每个子组件FormItem的resetField方法
    const resetFields = () => {
      allFormItems.forEach(formItem => {
        formItem.resetFiled();
      })
    }
    const validateFormItems = (formItems, successCb, errorCb) => {
      try {
        let isValid = true;
        formItems.forEach(item => {
          item.validate(null, (error) => {
            // 说明validateMessage参数未校验通过
            if (error) {
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
    const validate = (successCb,errorCb) => {
      validateFormItems(allFormItems,successCb,errorCb);
    }
    return {cacheFormItem, allFormItems, resetFields, validateFormItems,validate}
  }
}
</script>

<style lang="less">
.lku-form {
  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    &__column {
      flex-direction: column;
      align-items: normal;

      .lku-form-item__label {
        margin-bottom: 5px;
      }
    }

    &__content {
      &__error {
        input {
          border: 1px solid @danger-color !important;
          box-shadow: none !important;
        }
      }
    }

    &__error {
      position: absolute;
      padding-top: 2px;
      color: @danger-color;
      font-size: 12px;
    }

    &__label {
      float: left;
      padding-right: 10px;
    }

    &__required {
      position: relative;

      &:before {
        content: "*";
        display: inline-block;
        color: @danger-color;
        font-size: 16px;
        height: 16px;
        padding-right: 4px;
        vertical-align: middle;
        text-align: center;
        line-height: 20px;
      }
    }
  }
}
</style>

<template>
  <form class="lku-form">
    <slot></slot>
  </form>
</template>

<script>
import {provide, getCurrentInstance} from 'vue'

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
  setup() {
    provide('lkuForm', getCurrentInstance())
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
     &__error{
       input{
         border: 1px solid @danger-color !important;
         box-shadow: none !important;
       }
     }
    }

    &__error {
      position: absolute;
      color: @danger-color;
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

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

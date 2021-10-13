<template>
  <div class="lku-button-wrapper">
    <button :class="['lku-button',{
     'lku-button__primary': type === 'primary',
     'lku-button__default': type === 'default',
     'lku-button__danger': type === 'danger',
     'lku-button__dashed': type === 'dashed',
     'lku-button__loading': loading
    }]">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "LkuButton",
  props: {
    type: {
      type: String,
      default: 'default'
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.button-opacity {
  opacity: .8;
}

.lku-button-wrapper {
  display: inline-block;

  .lku-button {
    display: flex;
    align-items: center;
    height: @height-default-size;
    line-height: @height-default-size - 2;
    padding: 0 13px;
    border: 1px solid @base-border-color;
    border-radius: @border-radius-default;
    background-color: @base-background-color;
    cursor: pointer;

    &.lku-button__primary {
      color: @white-color;
      border: 1px solid @primary-border-color;
      background-color: @primary-background-color;

      &:hover {
        .button-opacity()
      }
    }

    &.lku-button__default:hover {
      border: 1px solid @primary-border-color;
      color: @primary-color;
    }

    &.lku-button__danger {
      color: @white-color;
      border: 1px solid @danger-color;
      background-color: @danger-color;

      &:hover {
        .button-opacity();
      }
    }

    &.lku-button__dashed {
      border-style: dashed;

      &:hover {
        color: @primary-color;
        border: 1px dashed @primary-border-color;
      }
    }
  }
}
</style>

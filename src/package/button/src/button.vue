<template>
  <div class="lku-button-wrapper" :style="{display: block ? 'block' : 'inline-block'}">
    <button @click="handleClick"
            :class="['lku-button',{
     'lku-button__primary': type === 'primary',
     'lku-button__default': type === 'default',
     'lku-button__danger': type === 'danger',
     'lku-button__dashed': type === 'dashed',
     'lku-button__link': type==='link',
     'lku-button__sm': size === 'small',
     'lku-button__lg': size === 'large',
     'lku-button__loading': loading,
     'lku-button__disabled': disabled,
    }]">
      <lku-icon v-if="type || loading" :type="buttonIcon"></lku-icon>
      <slot></slot>
    </button>
  </div>
</template>

<script>
import {computed} from 'vue'

export default {
  name: "LkuButton",
  emits: ['click'],
  props: {
    type: {
      type: String,
      default: 'default'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium',
      validator: (val) => ['small', 'medium', 'large'].includes(val)
    },
    href: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: '_self'
    },
    // 是否以块级形式展示，宽度等于父级元素
    block: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const buttonIcon = computed(() => {
      return props.loading ? 'loading' : props.icon
    })

    const handleClick = (event) => {
      if (props.loading || props.disabled) {
        return
      }
      if (props.href) {
        window.open(props.href, props.target)
        return
      }
      emit('click', event)
    }
    return {buttonIcon, handleClick}
  }
}
</script>

<style lang="less">
.button-opacity {
  opacity: .8;
}

.lku-button-wrapper + .lku-button-wrapper {
  margin-left: 10px;
}

.lku-button-wrapper {

  .lku-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: @height-default-size;
    line-height: @height-default-size - 2;
    padding: 0 16px;
    border: 1px solid @base-border-color;
    border-radius: @border-radius-default;
    background-color: @base-background-color;
    cursor: pointer;

    &.lku-button__primary {
      color: @white-color;
      border: 1px solid @primary-border-color;
      background-color: @primary-background-color;

      &:hover:not(.lku-button__loading):not(.lku-button__disabled) {
        .button-opacity()
      }

      > .lku-icon {
        color: @white-color;
      }
    }

    &.lku-button__default:hover:not(.lku-button__loading):not(.lku-button__disabled) {
      border: 1px solid @primary-border-color;
      color: @primary-color;

      > .lku-icon {
        color: @primary-color;
      }
    }

    &.lku-button__danger {
      color: @white-color;
      border: 1px solid @danger-color;
      background-color: @danger-color;

      &:hover:not(.lku-button__loading):not(.lku-button__disabled) {
        .button-opacity();
      }

      > .lku-icon {
        color: @white-color;
      }
    }

    &.lku-button__dashed {
      border-style: dashed;

      &:hover:not(.lku-button__loading):not(.lku-button__disabled) {
        color: @primary-color;
        border: 1px dashed @primary-border-color;
      }
    }

    &.lku-button__link {
      border: none;
      color: @primary-background-color;

      &:hover:not(.lku-button__disabled) {
        .button-opacity();
      }
    }

    &.lku-button__sm {
      height: @height-small-size;
      line-height: @height-small-size - 2;
    }

    &.lku-button__lg {
      height: @height-large-size;
      line-height: @height-large-size - 2;
    }

    &.lku-button__loading {
      .button-opacity();
      cursor: not-allowed;
    }

    &.lku-button__disabled {
      cursor: not-allowed;
      opacity: .5;
    }
  }

}
</style>

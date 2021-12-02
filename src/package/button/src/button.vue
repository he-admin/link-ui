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

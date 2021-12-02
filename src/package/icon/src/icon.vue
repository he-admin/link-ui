<template>
  <i :class="['lku-icon', `lku-icon-${type}`, className]"
     :style="iconStyle"
     @click="handleClick">
  </i>
</template>

<script>
import {computed} from 'vue'

export default {
  name: "LkuIcon",
  props: {
    // 自定义类名
    className: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
    },
    size: {
      type: String
    }
  },
  emits: ['click'],
  setup(props, {emit}) {
    const iconStyle = computed(() => {
      const style = {}
      if (props.color) {
        style.color = props.color
      }
      if (props.size) {
        style.fontSize = props.size
      }
      return iconStyle
    })

    const handleClick = (event) => {
      emit('click', event)
    }
    return {iconStyle, handleClick}
  }
}
</script>

<template>
  <lku-tooltip :content="content">
    <span>{{ content }}</span>
  </lku-tooltip>
</template>
<script>
import {ref} from 'vue';

export default {
  name: "LkuEllipsisTooltip",
  props: {
    width: {
      type: String,
      default: '400px'
    }
  },
  setup(props, {slots}) {
    let content = '';
    content = slots?.default()[0]?.children ?? ''
    return {content}
  }
}
</script>

<style lang="less" scoped>

</style>

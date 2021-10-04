<template>
  <doc-content></doc-content>
</template>

<script>

import DocContent from './layout/content';

export default {
  name: 'App',
  components: {
    DocContent
  }
}
</script>

<style lang="less">
#app {
 color: @regular-text-color;
}
</style>

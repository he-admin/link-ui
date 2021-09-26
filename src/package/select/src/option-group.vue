<template>
  <div class="lku-options-group">
    <div class="lku-options-group__title" v-if="label">
      <slot name="title">{{ label }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LkuOptionGroup",
  props: {
    // 分组的名字
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>

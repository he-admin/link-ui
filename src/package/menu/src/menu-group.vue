<template>
  <li class="lku-menu-group">
    <div class="lku-menu-group__title">
      {{ title }}
    </div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>

<script>
export default {
  name: "LkuMenuGroup",
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <ul class="lku-tree__parent">
    <li class="lku-tree__child lku-tree__child--disabled">
      <div v-show="childrenData && childrenData.length">
        <lku-tree-node>
        </lku-tree-node>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "tree-node",
  props: {
    
  },
  setup() {
    
  }
}
</script>

<style scoped>

</style>
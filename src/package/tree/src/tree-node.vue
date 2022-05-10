<template>
  <ul class="lku-tree__parent">
    <li class="lku-tree__child lku-tree__child--disabled">
      <div v-for="item in data">
        {{ item.label }}
        <tree-node v-if="item.children"
                   style="padding-left: 10px"
                   :data="item.children">
        </tree-node>
      </div>
    </li>
  </ul>
</template>

<script>

// import TreeNode from './tree-node'

export default {
  name: 'tree-node',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    // TreeNode
  },
  setup() {
    
  }
}
</script>

<style scoped>

</style>
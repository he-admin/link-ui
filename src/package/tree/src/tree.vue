<template>
  <div class="lku-tree">
    <div v-for="(item,index) in data" :key="index">
      {{item.label}}
      <tree-node  style="padding-left: 10px"
        v-if="item.children"
        :data="item.children">
      </tree-node>
    </div>
  </div>
</template>

<script>
import TreeNode from './tree-node.vue';

export default {
  name: "LkuTree",
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    TreeNode
  }
}
</script>

<style scoped>

</style>
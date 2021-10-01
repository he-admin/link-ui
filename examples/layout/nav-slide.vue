<template>
  <div class="nav-slide-container">
    <lku-menu :default-active="route.name" :width="150" :duration="0.2">
      <lku-menu-group v-for="(group,groupIndex) in NavConfigs"
                      :key="groupIndex"
                      :title="group.name">
        <lku-menu-item v-for="(item,itemIndex) in group.children"
                       class-name="nav-item__name"
                       :name="item.name"
                       :route="{path:item.path}"
                       :key="itemIndex">
          {{ item.meta.title }}
        </lku-menu-item>
      </lku-menu-group>
    </lku-menu>
  </div>
</template>

<script>
import {NavConfigs} from '../router/index'
import {useRoute} from 'vue-router';
import {reactive} from 'vue'

export default {
  name: "nav-slide",
  data() {
    return {
      NavConfigs
    }
  },
  setup() {
    const route = reactive(useRoute());
    return {
      route
    }
  }
}
</script>

<style lang="less" scoped>
.nav-slide-container {
  .nav-item__name {
   text-indent: 1em;
  }
}
</style>

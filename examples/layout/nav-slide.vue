<template>
  <div class="nav-slide-container">
    <lku-menu>
      <lku-menu-group v-for="(group,groupIndex) in NavConfigs"
                      :key="groupIndex"
                      :title="group.name">
        <lku-menu-item v-for="(item,itemIndex) in group.children" :key="itemIndex">
          {{ item.meta.title }}
        </lku-menu-item>
      </lku-menu-group>
    </lku-menu>
  </div>
</template>

<script>
import {NavConfigs} from '../router/index'

export default {
  name: "nav-slide",
  data() {
    return {
      NavConfigs
    }
  }
}
</script>

<style scoped>

</style>

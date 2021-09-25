<template>
  <div class="nav-slide-container">
    {{route.name}}
    <lku-menu :default-active="`Grid`">
      <lku-menu-group v-for="(group,groupIndex) in NavConfigs"
                      :key="groupIndex"
                      :title="group.name">
        <lku-menu-item v-for="(item,itemIndex) in group.children"
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
export default {
  name: "nav-slide",
  data() {
    return {
      NavConfigs
    }
  },
  setup(){
    const route = useRoute();
    return {
      route
    }
  }
}
</script>

<style scoped>

</style>

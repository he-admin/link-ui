<template>
  <li class="lku-menu-group">
    <div class="lku-menu-group__title" @click="isOpen=!isOpen">
      {{ title }}
      <i :class="iconArrowClasses"></i>
    </div>
    <lku-collapse-transition>
      <ul v-show="isOpen">
        <slot></slot>
      </ul>
    </lku-collapse-transition>
  </li>
</template>

<script>
import {ref, computed} from 'vue'

export default {
  name: "LkuMenuGroup",
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    //LkuCollapseTransition
  },
  setup() {
    let isOpen = ref(true);
    const iconArrowClasses = computed(() => {
      return ['lku-icon', 'lku-icon__arrow', 'lku-icon-arrow-down', {
        'lku-icon__arrow--up': isOpen.value
      }]
    })
    return {isOpen, iconArrowClasses}
  }
}
</script>

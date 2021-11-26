<template>
  <div :class="['lku-drop', className]"
       @mouseenter="emit('mouseenter')"
       @mouseleave="emit('mouseleave')"
       @click="emit('click', $event)">
    <slot></slot>
  </div>
</template>

<script>
import {ref, computed, onMounted, nextTick, inject, getCurrentInstance} from 'vue';
import {createPopper} from '@popperjs/core';

export default {
  name: "LkuDrop",
  props: {
    className: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    offset: {
      type: Array,
      default: [0, 10]
    }
  },
  setup(props, {emit, slots}) {

    const instance = getCurrentInstance();
    const initPopper = (reference, tooltip) => {
      createPopper(reference, tooltip,
        {
          placement: props.placement,
          modifiers: [{name: 'computeStyles', options: {gpuAcceleration: false}},
            {name: 'offset', options: {offset: props.offset}}]
        },
      );
    }
    onMounted(() => {
      initPopper(inject('reference').value, instance.ctx.$el);
    })
    return {emit}
  }
}
</script>

<style scoped>

</style>

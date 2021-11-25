<template>
  <div :class="['lku-drop', className]"
       @mouseenter="emit('mouseenter')"
       @mouseleave="emit('mouseleave')"
       @click="emit('click', $event)">
    <slot></slot>
  </div>
</template>

<script>
import {computed, onMounted,nextTick, inject, getCurrentInstance} from 'vue';
import {createPopper} from '@popperjs/core';

export default {
  name: "LkuDrop",
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, {emit, slots}) {

    const instance = getCurrentInstance();
    let reference = null;
    const initPopper = ()=>{
      createPopper(reference, instance.ctx.$el,
        {
          placement: 'top',
        });
    }
    onMounted(() => {
      reference = inject('reference').value;
      initPopper();
    })
    nextTick(()=>{
      reference && initPopper();
    })

    return {emit}
  }
}
</script>

<style scoped>

</style>

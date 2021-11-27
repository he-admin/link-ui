<template>
  <div :class="['lku-drop', className]"
       @mouseenter="emit('mouseenter')"
       @mouseleave="emit('mouseleave')"
       @click="emit('click', $event)">
    <slot></slot>
  </div>
</template>

<script>
import {onMounted,onUpdated, inject, getCurrentInstance} from 'vue';
import {createPopper} from '@popperjs/core';

export default {
  name: "LkuDrop",
  emits: ['mouseenter', 'mouseleave'], // 不加这行，若在组件外面直接使用事件，会被执行两次，vue3废除了.native修饰符。
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
  setup(props, {emit}) {
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

    onUpdated(()=>{
      initPopper(inject('reference').value, instance.ctx.$el);
    })
    return {emit}
  }
}
</script>

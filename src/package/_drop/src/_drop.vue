<template>
  <div :class="['lku-drop', className]"
       @mouseenter="emit('mouseenter')"
       @mouseleave="emit('mouseleave')"
       @click="emit('click', $event)">
    <slot></slot>
  </div>
</template>

<script>
import {onMounted, onUpdated, inject, getCurrentInstance} from 'vue';
import {createPopper} from '@popperjs/core';
import {getAttr} from '@/utils/dom';

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
    const {proxy} = getCurrentInstance();
    let popper = null;
    let el = null;

    const initPopper = (reference, tooltip) => {
      popper = createPopper(reference, tooltip,
        {
          placement: props.placement,
          modifiers: [{name: 'computeStyles', options: {gpuAcceleration: false}},
            {name: 'offset', options: {offset: props.offset}}]
        },
      );
    }

    onMounted(() => {
      el = proxy.$el;
      initPopper(inject('reference').value, el);
    })

    onUpdated(() => {
      // 当弹出层位置随滑动时发生变化，对应的弹出层动画也要做相应调整。
      const placement = getAttr(el, 'data-popper-placement');
      el.style.transformOrigin = placement.indexOf('top') > -1 ? 'left bottom' : 'left top';
      popper.update()
    })
    return {emit}
  }
}
</script>

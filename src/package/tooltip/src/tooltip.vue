<!--<template>-->
<!--  <slot></slot>-->
<!--</template>-->


<script>
import {getCurrentInstance, onMounted} from 'vue'

import {on, off} from '@/utils/dom';

export default {
  name: "LkuTooltip",
  props: {
    placement: {
      type: String,
      default: 'top'
    },
    content: {
      type: String,
      default: ''
    }
  },
  setup(props, {slots}) {
    const instance = getCurrentInstance();
    console.log(slots.default());
    const tooltip = document.createElement('div');
    tooltip.innerHTML = '12444';
    tooltip.className = `lku-tooltip lku-tooltip__${props.placement}`;
    onMounted(() => {
      const el = instance.proxy.$el;
      console.log(el);
      on(el, 'mouseenter', () => {
        tooltip.innerHTML = `<span>${props.content}</span>`;
        document.body.appendChild(tooltip);
        document.body.appendChild(tooltip);
      })
    })
    const handleMouseEnter = () => {

    }

    return () => {
      return slots.default()[0];
    }

  }
}
</script>
<style lang="less">

</style>

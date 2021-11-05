<!--<template>-->
<!--  <slot></slot>-->
<!--</template>-->


<script>
import {getCurrentInstance, onMounted, nextTick} from 'vue'

import {on, off, addClass, removeClass} from '@/utils/dom';

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
    tooltip.innerHTML = `<span>${props.content}</span>`;
    tooltip.className = `lku-tooltip lku-tooltip__${props.placement}`;
    onMounted(() => {
      const el = instance.proxy.$el;
      const rect = el.getBoundingClientRect();
      document.body.appendChild(tooltip);
      nextTick(() => {
        console.log('nextTick执行了');
      })
      on(el, 'mouseenter', (event) => {
        console.log(rect);
        //tooltip.style.top = event.pageY + 'px'
        //showTooltip(el)
        let y = document.documentElement.scrollTop;
        //y += rect.y + tooltip.offsetHeight;
        tooltip.style.left = rect.left + 'px';
        console.log(y, rect.y, tooltip.offsetHeight);
        tooltip.style.display = 'block'
        tooltip.style.top = rect.y - tooltip.offsetHeight + 'px'
        console.log(tooltip);
      })
      // on(tooltip, 'mouseleave', () => {
      //   tooltip.style.display = 'none'
      // })
      let timeId;
      on(el, 'mouseleave', () => {
        timeId = setTimeout(() => {
          tooltip.style.display = 'none'
        }, 2000)
      })


      on(tooltip, 'mouseenter', () => {
        tooltip.style.display = 'block';
        clearTimeout(timeId)
      })

    })
    const handleMouseEnter = () => {

    }

    const showTooltip = () => {
      tooltip && addClass(tooltip, 'lku-show__tooltip')
    }
    return () => {
      return slots.default()[0];
    }

  }
}
</script>
<style lang="less">
.lku-tooltip {
  position: absolute;
  color: @primary-text-color;
  cursor: pointer;
  z-index: 999;
  display: none;

  & > span {
    display: inline-block;
    padding: 6px 10px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, .9);
    color: @white-color;
    user-select: text;
  }
}
</style>

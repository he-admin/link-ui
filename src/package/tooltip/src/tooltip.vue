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
      default: 'left-start'
    },
    content: {
      type: String,
      default: ''
    }
  },
  setup(props, {slots}) {
    const instance = getCurrentInstance();
    console.log(slots.default());
    let tooltip = null;

    onMounted(() => {
      const el = instance.proxy.$el;
      el.style.cursor = 'pointer';
      const rect = el.getBoundingClientRect();
      tooltip = document.createElement('div');
      tooltip.innerHTML = `<span>${props.content}</span>`;
      tooltip.className = `lku-tooltip lku-tooltip__${props.placement}`;
      document.body.appendChild(tooltip);
      nextTick(() => {
        console.log('nextTick执行了');
      })
      on(el, 'mouseenter', (event) => {
        console.log(rect);
        //tooltip.style.top = event.pageY + 'px'
        //showTooltip(el)
        // let y = document.documentElement.scrollTop;
        //y += rect.y + tooltip.offsetHeight;
        tooltip.style.display = 'block';
        const {x, y} = calcPositionStyle(rect, tooltip, props.placement);
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
      })
      // on(tooltip, 'mouseleave', () => {
      //   tooltip.style.display = 'none'
      // })
      let timeId;
      on(el, 'mouseleave', () => {
        timeId = setTimeout(() => {
          tooltip.style.display = 'none'
        }, 500)
      })


      on(tooltip, 'mouseenter', () => {
        tooltip.style.display = 'block';
        clearTimeout(timeId);
      })

      on(tooltip, 'mouseleave', () => {
        setTimeout(() => {
          //document.body.click();
          tooltip.style.display = 'none';
          // document.body.removeChild(tooltip);
        }, 500)
      })

      // on(document,'click',()=>{
      //   debugger
      // })
    })
    const handleMouseEnter = () => {

    }

    const showTooltip = () => {
      tooltip && addClass(tooltip, 'lku-show__tooltip')
    }
    // 通过配置不同的位置选项，计算tooltip对应的坐标
    const calcPositionStyle = (rect, tooltip, key) => {
      const placement = {
        'top-start': {
          x: rect.x,
          y: rect.y - tooltip.offsetHeight
        },
        'top': {
          x: rect.x - (rect.width / 2),
          y: rect.y - tooltip.offsetHeight
        },
        'top-end': {
          x: rect.x - (tooltip.offsetWidth - rect.width),
          y: rect.y - tooltip.offsetHeight
        },
        'left-start': {
          x: rect.x - tooltip.offsetWidth,
          y: rect.y
        }
      }
      return placement[key];
    }
    console.log(slots.default());
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
  //cursor: pointer;
  z-index: 999;
  display: none;

  &::after {
    content: "";
    position: absolute;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid @blank-color;
  }

  & > span {
    display: inline-block;
    padding: 6px 10px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, .9);
    color: @white-color;
    //user-select: none;
    //&::selection{
    //
    //}
  }

  &.lku-tooltip__top, &.lku-tooltip__top-start, &.lku-tooltip__top-end {
    padding-bottom: 7px;

    &::after {
      bottom: 2px;
    }
  }

  &.lku-tooltip__top {
    &::after {
      left: 50%;
      //transform: translateX(-50%);
    }
  }

  &.lku-tooltip__top-start {
    &::after {
      left: 10px;
    }
  }

  &.lku-tooltip__top-end {
    &::after {
      right: 10px;
    }
  }

  &.lku-tooltip__left-start {
    &::after {
      bottom: 10px;
      transform: rotate(-90deg);
    }
  }
}


</style>

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
    },
    width: {
      type: String,
      default: '200px'
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
      tooltip.style.width = props.width;
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
        }, 200)
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
        }, 200)
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
          x: rect.x - (tooltip.offsetWidth - rect.width) / 2,
          y: rect.y - tooltip.offsetHeight
        },
        'top-end': {
          x: rect.x - (tooltip.offsetWidth - rect.width),
          y: rect.y - tooltip.offsetHeight
        },
        'left-start': {
          x: rect.x - tooltip.offsetWidth,
          y: rect.y
        },
        'left': {
          x: rect.x - tooltip.offsetWidth,
          y: rect.y - (tooltip.offsetHeight - rect.height) / 2
        },
        'left-end': {
          x: rect.x - tooltip.offsetWidth,
          y: rect.y - (tooltip.offsetHeight - rect.height)
        },
        'right-start': {
          x: rect.x + rect.width,
          y: rect.y
        },
        'right': {
          x: rect.x + rect.width,
          y: rect.y - (tooltip.offsetHeight - rect.height) / 2
        },
        'right-end': {
          x: rect.x + rect.width,
          y: rect.y - (tooltip.offsetHeight - rect.height)
        },
        'bottom-start': {
          x: rect.x,
          y: rect.y + rect.height
        },
        'bottom': {
          x: rect.x - (tooltip.offsetWidth - rect.width) / 2,
          y: rect.y + rect.height
        },
        'bottom-end': {
          x: rect.x - (tooltip.offsetWidth - rect.width),
          y: rect.y + rect.height
        },
      }
      console.log(rect.x, tooltip.offsetWidth);
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
  transition: display ease-in-out 10s;

  &::after {
    content: "";
    position: absolute;
  }

  & > span {
    display: inline-block;
    width: 100%;
    padding: 6px 10px;
    border-radius: 3px;
    color: @white-color;
    background-color: rgba(0, 0, 0, .9);
    //user-select: none;
    //&::selection{
    //
    //}
  }

  &.lku-tooltip__top, &.lku-tooltip__top-start, &.lku-tooltip__top-end {
    padding-bottom: 8px;

    &::after {
      bottom: 3px;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 5px solid @blank-color;
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

  &.lku-tooltip__left-start, &.lku-tooltip__left, &.lku-tooltip__left-end {
    padding-right: 8px;

    &::after {
      right: 3px;
      border-top: 4px solid transparent;
      border-left: 5px solid @blank-color;
      border-bottom: 4px solid transparent;
    }
  }

  &.lku-tooltip__left-start {
    &::after {
      top: 10px;
    }
  }

  &.lku-tooltip__left {
    &::after {
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &.lku-tooltip__left-end {
    &::after {
      bottom: 10px;
    }
  }

  // 右边
  &.lku-tooltip__right-start, &.lku-tooltip__right, &.lku-tooltip__right-end {
    padding-left: 8px;

    &::after {
      left: 3px;
      border-top: 4px solid transparent;
      border-right: 5px solid @blank-color;
      border-bottom: 4px solid transparent;
    }
  }

  &.lku-tooltip__right-start {
    &::after {
      top: 10px;
    }
  }

  &.lku-tooltip__right {
    &::after {
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &.lku-tooltip__right-end {
    &::after {
      bottom: 10px;
    }
  }

  // 底部
  &.lku-tooltip__bottom-start, &.lku-tooltip__bottom, &.lku-tooltip__bottom-end {
    padding-top: 8px;

    &::after {
      top: 3px;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 5px solid @blank-color;
    }
  }

  &.lku-tooltip__bottom-start {
    &::after {
      left: 10px;
    }
  }

  &.lku-tooltip__bottom {
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &.lku-tooltip__bottom-end {
    &::after {
      right: 10px;
    }
  }
}

//@keyframes translateTooltip {
//  from {
//    transform: translateX(5px);
//  }
//  to {
//    transform: translateX(0);
//  }


</style>

<script>
import {ref, watch, getCurrentInstance, onMounted, onUnmounted} from 'vue'

import {on, off, addClass, removeClass} from '@/utils/dom';
import debounce from '@/utils/debounce';

export default {
  name: "LkuTooltip",
  props: {
    theme: {
      type: String,
      default: 'dark',
      validator: (val) => ['dark', 'light'].includes(val)
    },
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
      default: 'fit-content' // 默认宽度取决于内容宽度
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {slots}) {
    const instance = getCurrentInstance();
    const tooltipId = ref('');
    const isHover = ref(false);
    let tooltip = null;
    let timeId;
    let el = null;
    watch(() => {
      return isHover.value
    }, (newVal) => {
      newVal ? showTooltip() : hideTooltip();
      // 如果隐藏，就清除tooltip的选中状态
      if (!newVal) {
        window.getSelection().empty();
      }
    })
    onMounted(() => {
      el = instance.proxy.$el;
      if (props.disabled) {
        return
      }
      // 给内容dom和tooltip绑定鼠标进入和离开事件
      on(el, 'mouseenter', handleElMouseEnter)
      // 之所以要嵌套绑定事件，是因为只有等到el触发mouseenter事件，
      // 生成tooltip的dom之后，才能给tooltip绑定事件
      on(el, 'mouseleave', handleElMouseLeave)

      // 当tooltipId不为空时，即dom存在时，再为其绑定事件
      watch(() => {
        return tooltipId.value
      }, (val) => {
        if (val) {
          on(tooltip, 'mouseenter', handleTooltipMouseEnter)
          on(tooltip, 'mouseleave', handleTooltipMouseLeave)
        }
      })
    })

    onUnmounted(() => {
      off(el, 'mouseenter', handleElMouseEnter);
      off(el, 'mouseleave', handleElMouseLeave);
      off(tooltip, 'mouseenter', handleTooltipMouseEnter);
      off(tooltip, 'mouseleave', handleTooltipMouseLeave);
    })
    // const handleElMouseEnter = debounce(() => {
    //   renderTooltip(el);
    //   isHover.value = true;
    //   clearTimeout(timeId);
    // }, 1000, true);
    const handleElMouseEnter = () => {
      renderTooltip(el);
      isHover.value = true;
      clearTimeout(timeId);
    }

    const handleElMouseLeave = () => {
      timeId = setTimeout(() => {
        isHover.value = false;
      }, 200)
    };

    const handleTooltipMouseEnter = () => {
      clearTimeout(timeId);
      isHover.value = true;
      document.body.style.overflow = 'hidden';
      document.body.addEventListener('touchmove', move);
    };

    const handleTooltipMouseLeave = () => {
      isHover.value = false;
      document.body.style.overflow = '';
      document.body.addEventListener('touchmove', move);
    }

    const move = (e) => {
      e.preventDefault();
    }

    const renderTooltip = (el) => {
      const rect = el.getBoundingClientRect();
      if (!document.getElementById(`lku-tooltip-${instance.uid}`)) {
        tooltip = document.createElement('div');
        tooltip.id = tooltipId.value = `lku-tooltip-${instance.uid}`;
        tooltip.style.width = props.width;
        tooltip.innerHTML = `<span>${props.content}</span>`;
        tooltip.className = `lku-tooltip lku-tooltip__${props.placement} is-${props.theme}`;
        document.body.appendChild(tooltip);
      }
      // 滚动条距离浏览器顶部/左边的距离(考虑有滚动条时，定位问题)
      const scrollTop = document.documentElement.scrollTop;
      const scrollLeft = document.documentElement.scrollLeft;
      const {x, y} = calcPositionStyle(rect, tooltip, props.placement);
      tooltip.style.left = `${x + scrollLeft}px`;
      tooltip.style.top = `${y + scrollTop}px`;
    }

    const showTooltip = () => {
      tooltip && addClass(tooltip, 'lku-tooltip__show')
    };
    const hideTooltip = () => {
      tooltip && removeClass(tooltip, 'lku-tooltip__show')
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
      return placement[key];
    }
    return () => {
      return slots.default()[0];
    }

  }
}
</script>

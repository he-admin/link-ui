<template>
  <div :class="drawerClasses">
    <!--    阴影遮罩层-->
    <transition name="drawer-mask">
      <div class="lku-drawer__mask" v-if="visible && mask" @click="handleClickMask">
      </div>
    </transition>
    <transition :name="`drawer-${direction}`" @enter="transitionEnter" @leave="transitionLeave">
      <!--    抽屉主体-->
      <div class="lku-drawer__main" v-if="visible" :style="mainStyle">
        <!--      head-->
        <div class="lku-drawer__head">
          <h1 class="lku-drawer__title">
            <slot name="title">
              {{ title }}
            </slot>
          </h1>
          <i class="lku-icon lku-icon-error lku-drawer__close"
             @click="handleClose">
          </i>
        </div>
        <!--        drag按钮-->
        <span class="lku-drawer__drag"
              v-if="draggable"
              @mousedown="handleMouseDown"
              @mouseup="handleMouseUp">
          <slot name="drag">
             <i class="lku-drawer__drag-btn">
             </i>
          </slot>
        </span>
        <!--      内容-->
        <div class="lku-drawer__content">
          <slot></slot>
        </div>
        <!--        底部插槽-->
        <div class="lku-drawer__foot" v-if="$slots.foot">
          <slot name="foot"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {ref, computed, onMounted} from 'vue';
import {formatSize} from '@/utils/tools';
import {getBrowserWidth} from '@/utils/dom';

const MIN_WIDTH = 300;
export default {
  name: "LkuDrawer",
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'right',
      validator: (val) => ['left', 'right', 'top', 'bottom'].includes(val)
    },
    duration: {
      type: Number,
      default: .3
    },
    size: {
      type: [Number, String],
      default: 400
    },
    // 是否显示蒙层
    mask: {
      type: Boolean,
      default: true
    },
    // 是否点击蒙层可以关闭抽屉
    maskClosable: {
      type: Boolean,
      default: true
    },
    // 是否可拖拽改变抽屉尺寸
    draggable: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const canDrag = ref(false);
    const drawerClasses = computed(() => {
      const prefix = 'lku-drawer';
      const dir = props.direction;
      return [prefix, {
        [`${prefix}__left`]: dir === 'left',
        [`${prefix}__right`]: dir === 'right',
        [`${prefix}__top`]: dir === 'top',
        [`${prefix}__bottom`]: dir === 'bottom'
      }]
    });

    const width = ref(formatSize(props.size));
    const mainStyle = computed(() => {
      const placementMaps = {
        left: {left: 0, top: 0, bottom: 0, width: width.value},
        right: {right: 0, top: 0, bottom: 0, width: width.value},
        top: {top: 0, left: 0, right: 0, height: width.value},
        bottom: {bottom: 0, left: 0, right: 0, height: width.value}
      };
      return placementMaps[props.direction] || {}
    });
    onMounted(() => {
      window.addEventListener('mousemove', handleMouseMove)
    })
    const handleClose = () => {
      emit('update:visible', false);
      emit('close');
    };
    const handleClickMask = () => {
      if (!props.maskClosable) {
        return;
      }
      canDrag.value = false;
      handleClose();
    }
    const transitionEnter = (el) => {
      el.style.transition = `transform ${props.duration}s ease`
    };
    const transitionLeave = (el) => {
      el.style.transition = `transform ${props.duration}s ease`
    };
    // 鼠标按钮按下去事件
    const handleMouseDown = () => {
      console.log('handleMouseDown');
      if (!props.draggable) {
        return
      }
      canDrag.value = true;
    };
    // 鼠标按钮松开事件
    const handleMouseUp = () => {
      canDrag.value = false;
    };
    // 鼠标移动
    const handleMouseMove = (event) => {
      if (!props.draggable || !canDrag.value) {
        return
      }
      const movedWidth = calcMoveWidth(event);
      width.value = `${movedWidth}px`;
      emit('drag');
    }
    const calcMoveWidth = (event) => {
      const {innerWidth, innerHeight} = window
      let size = 0;
      switch (props.direction) {
        case 'left':
          size = Math.max(event.clientX, MIN_WIDTH)
          break;
        case 'right':
          // pageX和Y可以为负数, 如果为负数，说明左侧拉到底了，则最大宽度取clientWidth，否则取clientWidth - event.pageX
          size = Math.min(innerWidth - event.clientX, innerWidth);
          if (size <= MIN_WIDTH) {
            size = MIN_WIDTH; // MIN_WIDTH<=size<=clientHeight
          }
          break;
        case 'top':
          size = Math.max(event.clientY, MIN_WIDTH);
          break;
        case 'bottom':
          size = Math.min(innerHeight - event.clientY, innerHeight);
          if (size <= MIN_WIDTH) {
            size = MIN_WIDTH; // MIN_WIDTH<=size<=clientHeight
          }
          break;
        default:
          return
      }
      return size;
    }
    return {
      drawerClasses, mainStyle,
      handleClose, handleClickMask,
      transitionEnter, transitionLeave,
      handleMouseDown, handleMouseUp
    }
  }
}
</script>

<template>
  <div :class="drawerClasses">
    <!--    阴影遮罩层-->
    <transition name="drawer-mask">
      <div class="lku-drawer__mask" v-if="visible" @click="handleClickMask">
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
    size: {
      type: [Number, String],
      default: 400
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
    const transitionEnter = (el, done) => {
      el.style.transition = 'transform .3s ease'
    };
    const transitionLeave = (el, done) => {
      el.style.transition = 'transform .3s ease'
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

<style lang="less">
@lku-drawer-index: 999;
.lku-drawer {
  .lku-drawer__mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: @mask-background-color;
    z-index: @lku-drawer-index;
  }

  .lku-drawer__main {
    position: fixed;
    display: flex;
    flex-direction: column;
    background-color: @white-color;
    z-index: @lku-drawer-index;
    box-shadow: 0 0 6px #cecece;

    .lku-drawer__head {
      display: flex;
      justify-content: space-between;
      padding: 14px 20px;
      border-bottom: 1px solid @base-border-color;

      .lku-drawer__title {
        line-height: 24px;
        font-size: @medium-x-font-size;
        user-select: none;
      }

      .lku-drawer__close {
        position: absolute;
        top: 14px;
        right: 10px;
        cursor: pointer;
        transition: transform .2s;

        &:hover {
          color: @primary-color;
          transform: rotate(90deg);
        }
      }
    }

    .lku-drawer__content {
      flex: 1;
      word-wrap: break-word;
      padding: 20px;
    }

    .lku-drawer__drag {
      position: absolute;

      &-btn {
        display: inline-block;
        border: 1px solid @base-border-color;
        background-color: @white-color;
        border-radius: 6px;
      }
    }

    .lku-drawer__foot {
      display: flex;
      justify-content: flex-end;
      padding: 18px 20px;
      border-top: 1px solid @base-border-color;
    }
  }
}

/*蒙层动画*/
.drawer-mask-enter-active, .drawer-mask-leave-active {
  transition: opacity .5s ease-in-out;
}

.drawer-mask-enter-from, .drawer-mask-leave-to {
  opacity: 0;
}

/*抽屉*/

// 左侧弹出
.drawer-left-enter-from,
.drawer-left-leave-to {
  transform: translateX(-100%);
}

// 右侧弹出
.drawer-right-enter-from,
.drawer-right-leave-to {
  transform: translateX(100%);
}

// 上面弹出
.drawer-top-enter-from,
.drawer-top-leave-to {
  transform: translateY(-100%);
}

// 下面弹出
.drawer-bottom-enter-from,
.drawer-bottom-leave-to {
  transform: translateY(100%);
}

.lku-drawer__left {
  .lku-drawer__drag {
    right: 0;
    top: 50%;
    cursor: col-resize;
    transform: translate(50%, 50%);

    &-btn {
      width: 12px;
      height: 60px;
    }
  }
}

.lku-drawer__right {
  .lku-drawer__drag {
    left: 0;
    top: 50%;
    cursor: col-resize;
    transform: translate(-50%, -50%);

    &-btn {
      width: 12px;
      height: 60px;
    }
  }
}

.lku-drawer__top {
  .lku-drawer__drag {
    bottom: 0;
    left: 50%;
    cursor: row-resize;
    transform: translate(50%, 50%);

    &-btn {
      width: 60px;
      height: 12px;
    }
  }
}

.lku-drawer__bottom {
  .lku-drawer__drag {
    left: 50%;
    cursor: row-resize;
    transform: translate(-50%, -50%);

    &-btn {
      width: 60px;
      height: 12px;
    }
  }
}
</style>

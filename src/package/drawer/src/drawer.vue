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
        <span class="lku-drawer__drag" v-if="draggable">
          <slot name="drag">
             <i class="mku-drawer__drag-btn">
               
             </i>
          </slot>
        </span>
        <!--      内容-->
        <div class="lku-drawer__content">
          <slot>内容主体1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</slot>
        </div>

        <div class="lku-drawer__foot" v-if="$slots.foot">
          <slot name="foot"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {ref, computed} from 'vue';
import {formatSize} from '@/utils/tools';
import {getBrowserWidth} from '@/utils/dom';

export default {
  name: "LkuDrawer",
  props: {
    title: {
      type: String,
      default: '121'
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
      default: 200
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
    const drawerClasses = computed(() => {
      const prefix = 'lku-drawer';
      return [prefix, {}]
    });
    const width = computed(() => {
      return formatSize(props.size)
    })
    const mainStyle = computed(() => {
      const placementMaps = {
        left: {left: 0, top: 0, bottom: 0, width: width.value},
        right: {right: 0, top: 0, bottom: 0, width: width.value},
        top: {top: 0, left: 0, right: 0, height: width.value},
        bottom: {bottom: 0, left: 0, right: 0, height: width.value}
      };
      return placementMaps[props.direction] || {}

    });
    const handleClose = () => {
      emit('update:visible', false);
      emit('close');
    };
    const handleClickMask = () => {
      if (!props.maskClosable) {
        return;
      }
      handleClose();
    }
    const transitionEnter = (el, done) => {
      el.style.transition = 'transform .3s ease'
    };
    const transitionLeave = (el, done) => {
      el.style.transition = 'transform .3s ease'
    };
    return {
      drawerClasses, mainStyle,
      handleClose, handleClickMask,
      transitionEnter, transitionLeave
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
    //left: 0;
    //top: 0; // top和bottom都为0,相当于实现高度100%
    //bottom: 0;
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
//.drawer-right-enter-active,
//.drawer-right-leave-active {
//  transition: transform .3s ease;
//}

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
</style>

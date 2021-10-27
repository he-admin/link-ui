<template>
  <teleport to="body" disabled>
    <div :class="modalClasses">
      <!--    阴影遮罩层-->
      <transition name="modal-mask">
        <div class="lku-modal__mask" v-if="visible" @click="handleClickMask">
        </div>
      </transition>
      <transition :name="`modal-${direction}`" @enter="transitionEnter" @leave="transitionLeave">
        <!--    弹窗主体-->
        <div class="lku-modal__main"
             ref="lkuModal"
             v-show="visible"
             :style="mainStyle">
          <!--      head-->
          <div class="lku-modal__head"
               @mousedown="handleMouseDown"
               @mouseup="handleMouseUp"
               @mousemove="handleMouseMove">
            <h1 class="lku-modal__title">
              <slot name="title">
                {{ title }}
              </slot>
            </h1>
            <i class="lku-icon lku-icon-error lku-modal__close"
               @click="handleClose">
            </i>
          </div>
          <!--      内容-->
          <div class="lku-modal__content">
            <slot></slot>
          </div>
          <!--        底部插槽-->
          <div class="lku-modal__foot" :style="footStyle">
            <slot name="foot">
              <lku-button @click="handleCancel">取消</lku-button>
              <lku-button type="primary" @click="handleConfirm" :loading="loading">确认</lku-button>
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script>
import {ref, watch, computed, onMounted, onUpdated, nextTick} from 'vue';
import {formatSize} from '@/utils/tools';
import {getBrowserWidth} from '@/utils/dom';

export default {
  name: "LkuModal",
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
      default: 'center',
      validator: (val) => ['left', 'right', 'top', 'bottom', 'center'].includes(val)
    },
    size: {
      type: String,
      default: 500
    },
    // 是否点击蒙层可以关闭抽屉
    maskClosable: {
      type: Boolean,
      default: true
    },
    // 是否可拖拽弹窗
    draggable: {
      type: Boolean,
      default: true
    },
    // 弹窗的宽度
    width: {
      type: [String, Number],
      default: 480
    },
    // 按钮的loading
    loading: {
      type: Boolean,
      default: false
    },
    // 底部按钮的位置
    buttonPlacement: {
      type: String,
      default: 'right',
      validator: (val) => ['center', 'right'].includes(val)
    }
  },
  setup(props, {emit}) {
    const canDrag = ref(false);
    const lkuModal = ref(null);
    watch(() => {
      return props.loading
    }, (newValue) => {
      if (!newValue) {
        handleClose();
      }
    })
    watch(() => {
      return props.visible
    }, (newVal) => {
      // 弹窗消失时，移除鼠标移动事件
      if (!newVal) {
        window.removeEventListener('mousemove', handleMouseMove);
        canDrag.value = false;
      }
    })
    const modalClasses = computed(() => {
      const prefix = 'lku-modal';
      const dir = props.direction;
      return [prefix, {
        [`${prefix}__left`]: dir === 'left',
        [`${prefix}__right`]: dir === 'right',
        [`${prefix}__top`]: dir === 'top',
        [`${prefix}__bottom`]: dir === 'bottom'
      }]
    });

    const marginLeft = ref('auto');
    const marginTop = ref('auto');
    const pageX = ref(0);
    const pageY = ref(0);

    const mainStyle = computed(() => {
      return {
        width: formatSize(props.width),
        marginLeft: marginLeft.value, marginTop: marginTop.value
      }
    });
    const footStyle = computed(() => {
      const placementMaps = {
        right: 'flex-end',
        center: 'center'
      };
      return {justifyContent: placementMaps[props.buttonPlacement]}
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
      handleClose();
    }
    const transitionEnter = (el, done) => {
      el.style.transition = 'transform .3s ease,scale .3s ease'
      done()
    };
    const transitionLeave = (el, done) => {
      el.style.transition = 'opacity .3s ease,transform .3s ease,scale .3s ease'
      //done()
    };

    let maxMarginLeft = 0;
    let maxMarginTop = 0;
    let innerX = 0;
    let innerY = 0;
    // 鼠标按钮按下去事件
    const handleMouseDown = (event) => {
      console.log('handleMouseDown');
      if (!props.draggable) {
        return
      }
      canDrag.value = true;
      // 表示弹窗marginLeft/Top的最大值 = （浏览器可视宽/高-弹窗宽/高）
      maxMarginLeft = window.innerWidth - lkuModal.value.offsetWidth;
      maxMarginTop = window.innerHeight - lkuModal.value.offsetHeight;

      // 表示获取鼠标点的一瞬间，到modal左边/顶部的距离
      innerX = event.clientX - lkuModal.value.offsetLeft;
      innerY = event.clientY - lkuModal.value.offsetTop;
    };
    // 鼠标按钮松开事件
    const handleMouseUp = () => {
      canDrag.value = false;
    };
    // 鼠标移动
    const handleMouseMove = (pageX, pageY) => {
      if (!props.draggable || !canDrag.value) {
        return
      }
      calcMoveWidth(pageX, pageY);
      emit('drag');
    }
    const calcMoveWidth = (event) => {
      // 防止弹窗水平方向 被拖拽出浏览器
      if (event.clientX - innerX >= 0 && event.clientX - innerX <= maxMarginLeft) {
        marginLeft.value = event.clientX - innerX + 'px'
        // (event.clientX - innerX ),表示当前clientX - 鼠标开始点的时候原始clientX = 变化量  + 原始offsetWidth,
        // 变化量为整数，表示X轴向右拖动，否则向左
      }
      // 防止弹窗垂直方向 被拖拽出浏览器
      if (event.clientY - innerY >= 0 && event.clientY - pageY.value <= maxMarginTop) {
        marginTop.value = event.clientY - innerY + 'px'
      }
    };
    const handleCancel = (event) => {
      // 点击取消默认是关闭弹窗
      emit('update:visible', false);
      emit('on-cancel', event);
    };
    const handleConfirm = (event) => {
      emit('on-ok', event);
    }
    return {
      lkuModal,
      modalClasses,
      mainStyle, footStyle,
      handleClose, handleClickMask,
      transitionEnter, transitionLeave,
      handleMouseDown, handleMouseUp, handleMouseMove,
      handleCancel, handleConfirm
    }
  }
}
</script>

<style lang="less">
@lku-modal-index: 999;
.lku-modal {
  .lku-modal__mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    //background-color: @mask-background-color;
    opacity: .5;
    background-color: #000000;
    z-index: @lku-modal-index;
  }

  .lku-modal__main {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    //left: 50%;
    //top: 50%;
    margin: auto;
    //transform: translate(-50%, -50%);
    width: 480px;
    height: fit-content;
    max-height: 600px;
    background-color: @white-color;
    z-index: @lku-modal-index;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    border-radius: 4px;

    .lku-modal__head {
      display: flex;
      justify-content: space-between;
      padding: 14px 20px;
      //border-bottom: 1px solid @base-border-color;
      cursor: move;

      .lku-modal__title {
        line-height: 24px;
        font-size: @medium-x-font-size;
      }

      .lku-modal__close {
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

    .lku-modal__content {
      flex: 1;
      word-wrap: break-word;
      padding: 20px;
      overflow-y: auto;
      max-height: 100%;
    }

    .lku-modal__foot {
      display: flex;
      flex-shrink: 0;
      padding: 18px 20px;
      border-top: 1px solid @base-border-color;
    }
  }
}

/*蒙层动画*/
.modal-mask-enter-active, .modal-mask-leave-active {
  transition: opacity .3s ease-in-out;
}

.modal-mask-enter-from, .modal-mask-leave-to {
  opacity: 0;
}

/*抽屉*/
//.modal-right-enter-active,
//.modal-right-leave-active {
//  transition: transform .3s ease;
//}

// 从中间弹出
.modal-center-enter-from, .modal-center-leave-to {
  transform: scale(0.8);
  opacity: 0;
}

// 从左边弹出
.modal-left-enter-from, .modal-left-leave-to {
  transform: translateX(-50%);
  opacity: 0;
}


// 从右边边弹出
.modal-right-enter-from, .modal-right-leave-to {
  transform: translateX(50%);
  opacity: 0;
}

// 从上面边弹出
.modal-top-enter-from, .modal-top-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}

// 从下边弹出
.modal-bottom-enter-from, .modal-bottom-leave-to {
  transform: translateY(50%);
  opacity: 0;
}
</style>

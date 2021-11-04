<template>
  <teleport to="body" :disabled="!appendToBody">
    <div :class="modalClasses">
      <!--    阴影遮罩层-->
      <transition name="modal-mask">
        <div class="lku-modal__mask" v-if="visible && mask" @click="handleClickMask">
        </div>
      </transition>
      <transition appear :name="`modal-${direction}`" @enter="transitionEnter" @leave="transitionLeave">
        <!--    弹窗主体-->
        <div class="lku-modal__main"
             ref="lkuModal"
             v-if="visible"
             :style="mainStyle">
          <!--      head-->
          <div class="lku-modal__head"
               :style="{cursor : draggable ? 'move' : 'default'}"
               @mousedown="handleMouseDown"
               @mouseup="handleMouseUp"
               @mousemove="handleMouseMove">
            <h1 class="lku-modal__title">
              <slot name="title">
                {{ title }}
              </slot>
            </h1>
            <i class="lku-icon lku-icon-error lku-modal__close"
               v-if="closable"
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
import {ref, watch, computed, onMounted} from 'vue';
import {formatSize} from '@/utils/tools';

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
    // 过渡动画的方向
    direction: {
      type: String,
      default: 'center',
      validator: (val) => ['left', 'right', 'top', 'bottom', 'center'].includes(val)
    },
    // 动画过渡时间
    duration: {
      type: Number,
      default: .3
    },
    // 动画类型
    animation: {
      type: String,
      default: 'ease',
    },
    // 是否点击蒙层可以关闭抽屉
    maskClosable: {
      type: Boolean,
      default: true
    },
    // 是否可拖拽弹窗
    draggable: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    },
    mask: {
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
    },
    // 是否插入到body
    appendToBody: {
      type: Boolean,
      default: false
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
      emit('change', newVal)
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
    const transitionLeave = (el) => {
      console.log(props.duration, props.animation);
      el.style.transition = `opacity ${props.duration}s ${props.animation}, transform ${props.duration}s ${props.animation}, scale ${props.duration}s ${props.animation}`
    };

    let maxMarginLeft = 0;
    let maxMarginTop = 0;
    let innerX = 0;
    let innerY = 0;
    // 鼠标按钮按下去事件
    const handleMouseDown = (event) => {
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
      emit('drag', {left: lkuModal.value.offsetLeft, top: lkuModal.value.offsetTop});
    }
    const calcMoveWidth = (event) => {
      // 防止弹窗水平方向 被拖拽出浏览器
      if (event.clientX - innerX >= 0 && event.clientX - innerX <= maxMarginLeft) {
        marginLeft.value = event.clientX - innerX + 'px'
        // (event.clientX - innerX ),表示当前clientX - 鼠标开始点的时候原始clientX = 变化量  + 原始offsetWidth, 变化量为整数，表示X轴向右拖动，否则向左
      }
      // 防止弹窗垂直方向 被拖拽出浏览器
      if (event.clientY - innerY >= 0 && event.clientY - innerY <= maxMarginTop) {
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

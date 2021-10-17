<template>
  <div :class="drawerClasses" >
    <!--    阴影遮罩层-->
    <div class="lku-drawer__mask" v-if="visible">
    </div>
    <transition name="drawer-right">
      <!--    抽屉主体-->
      <div class="lku-drawer__main" v-if="visible">
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
    }
  },
  setup(props, {emit}) {
    const drawerClasses = computed(() => {
      const prefix = 'lku-drawer';
      return [prefix, {}]
    });
    const handleClose = () => {
      emit('update:visible', false);
    };

    return {drawerClasses, handleClose}
  }
}
</script>

<style lang="less" >
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
    left: 0;
    top: 0; // top和bottom都为0,相当于实现高度100%
    bottom: 0;
    width: 300px;
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
      justify-content: right;
      padding: 18px 20px;
      border-top: 1px solid @base-border-color;
    }
  }
}

/*抽屉*/
.drawer-right-enter-active,
.drawer-right-leave-active {
  transition: transform .3s ease;
}
//.drawer-left-enter-from,
//.drawer-left-leave-to {
//  transform: translateX(100%);
//}
.drawer-right-enter-from,
.drawer-right-leave-to {
  transform: translateX(-100%);
}
</style>

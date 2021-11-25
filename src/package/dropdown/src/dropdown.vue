<template>
  <div class="lku-dropdown" v-clickoutside="clickOutside">
    <div class="lku-dropdown__reference"
         ref="reference"
         @click="handleClick"
         @mouseover="handleMouseover"
         @mouseout="handleMouseout">
      <slot></slot>
    </div>
    <transition name="lku-dropdown">
      <lku-drop class="lku-dropdown__content"
                :placement="placement"
                @mouseenter.native="handleMouseover"
                @mouseleave.native="handleMouseout"
                v-show="visible">
        <slot name="menu"></slot>
      </lku-drop>
    </transition>
  </div>
</template>

<script>
import {ref, provide, onMounted} from 'vue';
import LkuDrop from '../../_drop';

export default {
  name: "LkuDropdown",
  props: {
    trigger: {
      type: String,
      default: 'click',
      validator: (val) => ['click', 'hover'].includes(val)
    },
    placement: {
      type: String,
      default: 'bottom-start'
    }
  },
  components: {
    LkuDrop
  },
  setup(props, {}) {
    const visible = ref(false);
    const reference = ref(null);
    provide('reference', reference);
    onMounted(() => {

    })
    let timeId;
    const handleClick = () => {
      if (props.trigger !== 'click') {
        return false
      }
      visible.value = !visible.value
    }
    const handleMouseover = () => {
      if (props.trigger !== 'hover') {
        return false;
      }

    }
    const handleMouseout = () => {

    }
    const clickOutside = () => {
      visible.value = false;
    }
    return {visible, reference, handleClick, handleMouseover, handleMouseout, clickOutside}
  }
}
</script>

<style lang="less" scoped>

/* dropdown */
.lku-dropdown {
  position: relative;
  display: inline-block;

  .lku-dropdown__content {
    min-width: 100%;
    background: #fff;
    border-radius: 4px;
    box-shadow: @base-shadow-border-color;
    margin: 10px 0;
    z-index: 20191112;
  }
}

.lku-dropdown-enter-from,
.lku-dropdown-leave-to {
  opacity: 0;
  transform: scaleY(.8);
}

.lku-dropdown-enter-active,
.lku-dropdown-leave-active {
  transition: transform .3s ease, opacity .3s ease;
  transform-origin: left top;
}

/* menu */

/* menu-item */
.lku-dropdown-item {
  white-space: nowrap;
  padding: 10px 12px;
  cursor: pointer;

  &:not(.lku-dropdown-item--disabled):hover {
    color: @primary-color;
    background: @base-hover-color;
  }
}

.lku-dropdown-item--active {
  color: @primary-color;
  background: @base-hover-color;
}

.lku-dropdown-item--disabled {
  color: @disabled-text-color;
  cursor: not-allowed;
}
</style>

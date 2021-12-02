<template>
  <div class="lku-dropdown"
       @mouseenter="handleMouseover"
       @mouseleave="handleMouseout"
       v-clickoutside="clickOutside">
    <!--   mouseover会让其子元素继承该事件， mouseenter不会-->
    <!--    给父元素绑定鼠标移入移出事件，相当于给子元素reference和drop绑定了该事件-->
    <div class="lku-dropdown__reference"
         ref="reference"
         @click.prevent="handleClick">
      <slot></slot>
    </div>
    <transition name="lku-dropdown">
      <!--      注意：vue3 .native修饰符被移除-->
      <lku-drop class="lku-dropdown__content"
                :placement="placement"
                v-show="visible">
        <slot name="menu"></slot>
      </lku-drop>
    </transition>
  </div>
</template>

<script>
import {ref, watch, provide} from 'vue';
import LkuDrop from '../../_drop';
import useEmit from '@/utils/emiter';

export default {
  name: "LkuDropdown",
  emit: ['click', 'clickOutside'],
  props: {
    trigger: {
      type: String,
      default: 'click',
      validator: (val) => ['click', 'hover'].includes(val)
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    // 点击元素外层关闭
    clickOutsideClosable: {
      type: Boolean,
      default: true
    }
  },
  components: {
    LkuDrop
  },
  setup(props, {emit}) {
    const visible = ref(false);
    const reference = ref(null);
    const {on} = useEmit();

    watch(() => {
      return visible.value
    }, (newVal) => {
      emit('visible-change', newVal)
    })

    on('dropdownClick', () => {
      visible.value = false;
    })

    provide('reference', reference);

    const handleClick = ($event) => {
      if (props.trigger !== 'click') {
        return false
      }
      visible.value = !visible.value
      emit('click', $event)
    }

    let timeId;
    const handleMouseover = () => {
      if (props.trigger !== 'hover') {
        return false;
      }
      if (timeId) {
        clearTimeout(timeId);
        timeId = null;
      }
      visible.value = true;

    }

    const handleMouseout = () => {
      if (props.trigger !== 'hover') {
        return false;
      }
      timeId = setTimeout(() => {
        visible.value = false;
      }, 100)
    }

    const clickOutside = () => {
      if (visible.value && props.clickOutsideClosable) {
        visible.value = false;
        emit('click-outside')
      }
    }
    return {
      visible, reference,
      handleClick, handleMouseover, handleMouseout,
      clickOutside
    }
  }
}
</script>

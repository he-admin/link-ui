<template>
  <transition
    @before-enter="beforeEnter"
    @enter-from="enter"
    @after-enter="beforeEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script>
import {getStyle, setInlineStyle} from '../../utils/dom';

export default {
  name: 'LkuCollapseTransition',
  setup() {
    const style = {
      transition: `all .5s ease`,
      overflow: 'hidden',
    };
    const beforeEnter = (el) => {
      el.dataset.paddingTop = getStyle(el).paddingTop; // el.style.paddingTop
      el.dataset.paddingBottom = getStyle(el).paddingBottom; // el.style.paddingBottom
      setInlineStyle(
        el,
        Object.assign(style, {height: 0}),
      );
    }
    const enter = (el) => {
     setTimeout(()=>{
       setInlineStyle(el, {
         height: `${el.scrollHeight}px`,
         paddingTop: el.dataset.paddingTop,
         paddingBottom: el.dataset.paddingBottom,
       });
     },0)
    }

    const afterEnter = (el) => {
      setInlineStyle(el, {height: '', overflow: ''});
    }

    const beforeLeave = (el) => {
      setInlineStyle(el, Object.assign(style, {
        height: `${el.scrollHeight}px`,
        overflow: '',
      }));
    }
    const leave = (el) => {
      setTimeout(() => {
        setInlineStyle(el, {height: 0, overflow: 'hidden'});
      }, 0)
    }
    const afterLeave = (el) => {
      setInlineStyle(el, {height: 0, overflow: 'hidden'});
    }

    return {
      beforeEnter,
      enter,
      afterEnter,
      beforeLeave,
      leave,
      afterLeave,
    }
  },
}
</script>

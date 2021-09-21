import {setInlineStyle, getStyle} from '@/utils/dom';

const transition = (props) => {
  const style = {
    transition: `all ${props.duration}s ${props.animate}`,
    overflow: 'hidden'
  }
  return {
    beforeEnter(el) { //通过路由钩子设置动画
      el.dataset.paddingTop = getStyle(el).paddingTop;
      el.dataset.paddingBottom = getStyle(el).paddingBottom;

    }
  }
}

export default {
  name: 'MkuCollapseTransition',
  functional: true,
  props: {
    duration: {
      type: Number | String,
      default: 0.5
    },
    animate: {
      type: String,
      default: 'ease'
    }
  }

}

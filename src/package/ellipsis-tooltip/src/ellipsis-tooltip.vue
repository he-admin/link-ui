<template>
  <lku-tooltip :content="content" :disabled="disabled">
    <div :class="multiple?'lku-global__multiple-ellipsis':'lku-global-ellipsis'"
         ref="ellipsis"
         :style="ellipsisStyle">{{ content + disabled }}
    </div>
  </lku-tooltip>
</template>
<script>
import {ref, computed, onMounted} from 'vue';

export default {
  name: "LkuEllipsisTooltip",
  props: {
    width: {
      type: String,
      //default: '200px'
    },
    // 是否开启多行省略
    multiple: {
      type: Boolean,
      default: false
    },
    // 行数，仅当开启多行换行时才有效
    line: {
      type: Number,
      default: 3
    }
  },
  setup(props, {slots}) {
    const ellipsis = ref(null);
    const disabled = ref(false);
    let content = '';
    content = slots?.default()[0]?.children ?? ''
    const ellipsisStyle = computed(() => {
      const style = {width: props.width || 'fit-content', maxWidth: '100%'};
      if (props.multiple && props.line) {
        style.webkitLineClamp = props.line;
      }
      return style;
    })
    onMounted(() => {
      showTooltip();
      window.addEventListener('resize',()=>{
        showTooltip();
      })
    })
    const showTooltip = ()=>{
      const offsetWidth = ellipsis.value?.offsetWidth;
      const scrollWidth = ellipsis.value?.scrollWidth;

      if (props.width) {
        const width = props.width.split('px')[0];
        disabled.value = scrollWidth <= width
      } else {
        disabled.value = offsetWidth >= scrollWidth
      }
      if (props.multiple) {
        const offsetHeight = ellipsis.value?.offsetHeight;
        const scrollHeight = ellipsis.value?.scrollHeight;
        console.log(offsetHeight, scrollHeight);
        disabled.value = offsetHeight >= scrollHeight
        console.log(offsetHeight >= scrollHeight, disabled.value);
      }
    }
    return {disabled, content, ellipsisStyle, ellipsis}
  }
}
</script>

<style lang="less" scoped>

</style>

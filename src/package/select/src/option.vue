<template>
  <li class="lku-option" :class="optionClasses" @click="handleOptionClick">
    <span class="lku-global-ellipsis"><slot></slot></span>
    <i :class="['lku-icon',{'lku-icon-checked':isActive}]"></i>
  </li>
</template>

<script>
import {ref, computed, inject, getCurrentInstance, onMounted, nextTick} from 'vue'
import useEmit from '../../../utils/emiter';

export default {
  name: "LkuOption",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  setup(props) {
    const {dispatch} = useEmit();
    const {ctx} = getCurrentInstance();
    const selectedOptions = inject('lkuSelected');
    const lkuSelect = inject('lkuSelect')
    let isActive = ref(false);

    const handleOptionClick = (event) => {
      if (props.disabled && event) {
        return event.stopPropagation(); // 阻止冒泡
      }
      dispatch('lku-option-select', {value: props.value, name: props.label || ctx?.$el?.textContent})
    }

    onMounted(() => {
      // 设置默认勾选
      dispatch('selectDefault', {value: props.value, name: props.label || ctx?.$el?.textContent});

      // 调用父组件方法，将每个组件的option传给父组getCurrentInstance件
      const {value, $el} = ctx;
      lkuSelect.getAllOptions({value, name: $el?.textContent})
    })

    const optionClasses = computed(() => {
      isActive.value = selectedOptions.value.some(item => item.value === props.value);
      return [{
        'lku-option--actived': isActive.value,
        'lku-option--disabled': props.disabled
      }]
    });

    return {isActive, optionClasses, handleOptionClick, selectedOptions}
  }
}
</script>

<template>
  <div :class="selectClasses"
       v-clickoutside="clickOutside"
       :style="{width:width + 'px'}">
    <div class="lku-select__inner"
         @mousemove="handleMouseHover(true)"
         @mouseout="handleMouseHover(false)"
         @click="handleSelectClick">
      <!--      select上方选择区域-->
      <template v-if="selectedOptions.length">
        <!--      多选  -->
        <div class="lku-select__labels" v-if="multiple">
         <span class="lku-select__labels-item"
               v-for="(item,index) in selectedOptions"
               @click.stop="handleDelete(item)"
               :key="index">
           <span class="lku-global-ellipsis">{{ item.name }}</span>
           <i class="lku-icon lku-icon-error-circle"></i>
         </span>
        </div>
        <!--        单选-->
        <div class="lku-select__text lku-global-ellipsis" v-else>
          {{ selectedOptions[0]?.name }}
        </div>
      </template>

      <!--      placeholder-->
      <div class="lku--select__placeholder lku-global-ellipsis" v-if="!selectedOptions.length">
        {{ placeholder }}
      </div>
      <!--      清除和箭头icon-->
      <span class="lku-select__icon" @click="handleClear">
     <i :class="lkuIconClasses"></i>
    </span>
    </div>

    <transition name="lku-select-dropdown">
      <ul class="lku-select__menu"
          v-show="isOpened"
          @click="handleDropdownClick">
        <slot></slot>
      </ul>
    </transition>
  </div>
</template>

<script>
import {ref, computed, provide} from 'vue';
import useEmit from '../../../utils/emiter';

export default {
  name: "LkuSelect",
  props: {
    // 表示选中的值
    modelValue: {
      type: [String, Number, Array]
    },
    width: {
      type: Number,
      default: 230
    },
    // 默认提示语
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 选择项弹出层出现的位置
    placement: {
      type: String,
      default: 'bottom-start'
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否禁用整个select选择框
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示可清除选中的图标
    clearable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, {emit, attrs}) {
    const {on} = useEmit();
    // 是否展开下拉框弹出层，之所以定义在这里，因为组件内部后续会涉及到对这个值的更改
    let isOpened = ref(false);
    // 鼠标是否移入select选择框
    let isHover = ref(false);
    const selectedOptions = ref([]);
    const selectClasses = computed(() => {
      return ['lku-select', {
        'lku-select--opened': isOpened.value,
        'lku-select--disabled': props.disabled
      }]
    });
    const isShowClearIcon = computed(() => {
      return !props.disabled && props.clearable && isHover.value && selectedOptions.value.length !== 0
    })
    const lkuIconClasses = computed(() => {
      return ['lku-icon', isShowClearIcon.value ? 'lku-icon-error-circle' : 'lku-icon-arrow-down']
    })
    provide('lkuSelected', selectedOptions);
    provide('modelValue', props.modelValue)
    /**
     * @method handleSelectClick
     * @description 处理下拉框的点击，控制选项弹出层显示/隐藏
     */
    const handleSelectClick = () => {
      if (props.disabled) {
        return
      }
      isOpened.value = !isOpened.value;
    }
    /**
     * @method handleMouseHover
     * @description 处理鼠标划入划出
     * @param { Boolean } isHove
     */
    const handleMouseHover = (isHove) => {
      if (props.disabled) {
        return
      }
      isHover.value = isHove;
    }
    /**
     * @method handleDelete
     * @description 多选模式下，已选中的删除方法
     * @param { String } option
     * @returns { Boolean }
     */
    const handleDelete = (option) => {
      if (props.disabled) {
        return false;
      }
      selectedOptions.value = selectedOptions.value.filter(item => item.value !== option.value)
      changeModelValue();
    }
    /**
     * @method handleClear
     * @description 清除全部选中的功能
     * @param { String } event
     */
    const handleClear = (event) => {
      // 如果没有X icon，取消后续执行
      if (!isShowClearIcon.value) {
        return false
      }
      selectedOptions.value = []
      changeModelValue();
      if (!isOpened.value) {
        event.stopPropagation()
      }
    }
    const handleDropdownClick = () => {
    }
    /**
     * @method optionClick
     * @description 点击option触发的回调函数
     * @param { Object } data
     */
    const handleOptionClick = (data) => {
      if (props.multiple) {
        let findIndex = selectedOptions.value.findIndex(item => item.value === data.value);
        findIndex === -1 ? selectedOptions.value.push(data) : selectedOptions.value.splice(findIndex, 1);
      } else {
        isOpened.value = false;
        selectedOptions.value = [data];
      }
      changeModelValue();
    }
    /**
     * @method changeModelValue
     * @description 当selectedOptions发生变化时，同步绑定的v-model值
     */
    const changeModelValue = () => {
      let modelValue = selectedOptions.value.map(item => item.value);
      modelValue = props.multiple ? modelValue : modelValue[0];
      //判断选中option是否发生变化，如果是多选，点一下肯定会变化，若是单选，点击重复的，则不触发change
      if (props.multiple || (!props.multiple && modelValue !== props.modelValue)) {
        emit('change', modelValue)
      }
      emit('update:modelValue', modelValue); // vue3 自定义组件新写法
    }
    // 监听option组件传递过来的事件
    on('lku-option-select', handleOptionClick);
    // 监听默认选中通过v-model绑定的值
    on('selectDefault', (data) => {
      if (props.multiple) {
        Array.isArray(props.modelValue) && props.modelValue.forEach(value => {
          if (value === data.value) {
            selectedOptions.value.push(data)
          }
        });
      } else {
        if (selectedOptions.value.length) return;
        Array.isArray(props.modelValue) && new Error('单选模式下绑定的值不能为数组');
        selectedOptions.value = props.modelValue === data.value ? [data] : [];
      }

    })
    const clickOutside = () => {
      if (isOpened.value) {
        isOpened.value = false;
      }
    }
    return {
      selectClasses,
      lkuIconClasses,
      isOpened,
      isShowClearIcon,
      selectedOptions,
      handleDelete,
      handleClear,
      handleSelectClick,
      handleDropdownClick,
      handleMouseHover,
      clickOutside
    }
  }
}
</script>

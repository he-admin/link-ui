<template>
  <div class="lku-select" :class="selectClasses" :style="{width:width + 'px'}">
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
      <span class="lku-select__icon">
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
import {ref, toRef, toRefs, reactive, watch, watchEffect, computed, provide, getCurrentInstance, nextTick} from 'vue';
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
  setup(props, {emit, attrs}) {
    const {on} = useEmit();
    // 是否展开下拉框弹出层，之所以定义在这里，因为组件内部后续会涉及到对这个值的更改
    let isOpened = ref(false);
    // 鼠标是否移入select选择框
    let isHover = ref(false);
    const selectedOptions = ref([props.modelValue]);
    const lkuSelect = ref(null)
    //const data = reactive({selectedOptions: []}); //所有被选中的
    // const selectedOptions = reactive([])
    //const selectedOptions = toRef(data, 'selectedOptions').value;
    const selectClasses = computed(() => {
      return ['lku-select', {
        'lku-select--opened': isOpened.value,
        'lku-select--disabled': props.disabled
      }]
    });
    const isShowClearIcon = props.clearable && isHover && selectedOptions.length !== 0
    const lkuIconClasses = computed(() => {
      return ['lku-icon', isShowClearIcon ? 'lku-icon-error-circle' : 'lku-icon-arrow-down']
    })

    const {ctx} = getCurrentInstance();
    console.log(getCurrentInstance().slots.default());
    console.log(attrs);
    // watchEffect(()=>{
    //   const selected = []; // 用于回显v-model绑定的值
    //   const {ctx} = getCurrentInstance();
    //   nextTick(()=>{
    //     console.log(lkuSelect.value);
    //   })
    //
    //   //const options = findComponentsDownward(ctx,'LkuOption');
    //   //console.log(options);
    //   console.log(props.modelValue);
    // })
    provide('lkuSelected', selectedOptions);
    provide('modelValue', props.modelValue)
    const handleSelectClick = () => {
      if (props.disabled) {
        return
      }
      console.log(isOpened.value);
      isOpened.value = !isOpened.value;
    }
    /**
     * @method handleMouseHover
     * @description 处理鼠标划入划出
     * @param { Boolean } isHover
     */
    const handleMouseHover = (isHove) => {
      isHover.value = isHove;
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
        selectedOptions.value = [data];
      }
      let modelValue = selectedOptions.value.map(item => item.value);
      modelValue = props.multiple ? modelValue : modelValue[0];
      console.log(modelValue)
      const modelValue2 = props.multiple ? modelValue : modelValue[0];
      //判断选中option是否发生变化，如果是多选，点一下肯定会变化，若是单选，点击重复的，则不触发change
      if (props.multiple || (!props.multiple && modelValue !== props.modelValue)) {
        emit('change', modelValue)
      }
      emit('update:modelValue', props.multiple ? modelValue : modelValue[0]); // vue3 自定义组件新写法
    }

    on('lku-option-select', handleOptionClick)
    return {
      selectClasses,
      lkuIconClasses,
      isOpened,
      selectedOptions,
      lkuSelect,
      handleSelectClick,
      handleDropdownClick,
      handleMouseHover
    }
  }
}
</script>

<style lang="less">
.lku-select {
  position: relative;

  .lku-select__inner {
    &:hover {
      border: 1px solid @primary-border-color;
    }

    max-width: 100%;
    min-height: @height-default-size;
    padding-right: 30px;
    border: 1px solid @base-border-color;
    border-radius: 4px;
    cursor: pointer;

    // placeholder
    .lku--select__placeholder {
      height: @height-default-size - 2;
      line-height: @height-default-size - 2;
      padding-left: 10px;
      color: @secondary-text-color;
    }

    // 单选输入框样式
    .lku-select__text {
      width: 100%;
      user-select: none;
      height: @height-default-size - 2;
      line-height: @height-default-size - 2;
      text-indent: 10px;
    }

    // 多选框样式
    .lku-select__labels {
      padding-left: 10px;
      padding-top: 5px;

      .lku-select__labels-item {
        position: relative;
        display: inline-block;
        max-width: 100%;
        height: 20px;
        padding-left: 4px;
        padding-right: 22px;
        margin-right: 10px;
        margin-bottom: 5px;
        line-height: 18px;
        border: 1px solid @light-border-color;
        border-radius: 2px;
        background: #f4f4f5;

        .lku-global-ellipsis {
          display: block; // 这个很关键，处理文字太多超出隐藏显示省略号，文字最长宽度等于搜索框宽度
        }

        .lku-icon-error-circle {
          position: absolute;
          top: 0;
          right: 0;
          height: 18px;
          width: 18px;

          &:hover {
            font-weight: bold;
          }
        }
      }
    }

    // up and down arrow
    .lku-select__icon {
      position: absolute;
      right: 5px;
      top: 0;
      bottom: 0; // 这里让绝对定位的元素高度等于select框的高度
      display: flex;
      align-items: center;

      .lku-icon {
        transition: transform .3s;
      }
    }
  }

  .lku-select__menu {
    position: absolute;
    margin: 8px 0;
    width: 100%;
    max-height: 500px;
    overflow: auto;
    border-radius: 4px;
    background: #fff;
    box-shadow: @base-shadow-border-color;
    z-index: 10;

    // select option
    .lku-option {
      padding: 0 10px;
      line-height: 30px;
      user-select: none; // li标签会默认选中,清除选中状态
      cursor: pointer;

      // 如果不包含这个类，hover时样式设置
      &:not(.lku-option--disabled):hover {
        background: @base-hover-color
      }

      &--disabled {
        cursor: not-allowed;
        color: @disabled-text-color;
      }

      &--actived {
        background: @base-hover-color;
        color: @primary-background-color;
      }
    }
  }
}

// 当展开select下拉框内容时，才有这个lku-select--opened，所以动态控制了lku-icon-arrow-down的rotate样式
.lku-select--opened {
  .lku-select__inner {
    border: 1px solid @primary-border-color;
    box-shadow: @primary-shadow-color;
  }

  .lku-icon-arrow-down {
    transform: rotate(180deg);
  }
}

/* drop transition动画，注意vue3动画改了，enter=> enter-from */
.lku-select-dropdown-enter-from,
.lku-select-dropdown-leave-to {
  opacity: 0;
  transform: scaleY(.8);
}

.lku-select-dropdown-enter-active,
.lku-select-dropdown-leave-active {
  transition: transform .3s ease, opacity .3s ease;
  transform-origin: left top;
}
</style>

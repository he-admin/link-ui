<template>
  {{ selectedOptions }}
  <div class="lku-select" :class="selectClasses" :style="{width:width + 'px'}">
    <div class="lku-select__inner"
         @click="handleSelectClick">

      <!--      select上方选择区域-->
      <template v-if="selectedOptions.length">
        <!--      多选  -->
        <div class="mku-select__labels" v-if="multiple">
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
import {ref, reactive, computed, provide} from 'vue';
import useEmit from '../../../utils/emiter';

export default {
  name: "LkuSelect",
  props: {
    // 表示选中的值
    value: {
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
  setup(props) {
    const {on} = useEmit();
    // 是否展开下拉框弹出层，之所以定义在这里，因为组件内部后续会涉及到对这个值的更改
    let isOpened = ref(false);
    const data = reactive({selectedOptions:[]}); //所有被选中的
    // const selectedOptions = reactive([])
    const selectedOptions = data.selectedOptions;
    const selectClasses = computed(() => {
      return ['lku-select', {
        'lku-select--opened': isOpened,
        'lku-select--disabled': props.disabled
      }]
    });
    provide('lkuSelected', selectedOptions);
    const handleSelectClick = () => {
      if (props.disabled) {
        return
      }
      isOpened.value = !isOpened.value;
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
        let findIndex = selectedOptions.findIndex(item => item.value === data.value);
        findIndex === -1 ? selectedOptions.push(data) : selectedOptions.splice(findIndex, 1);
      } else {
        selectedOptions = [data];
      }
    }
    on('lku-option-select', handleOptionClick)
    return {selectClasses, isOpened, selectedOptions, handleSelectClick, handleDropdownClick}
  }
}
</script>

<style lang="less">
.lku-select {
  position: relative;

  .lku-select__inner {
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
      height: @height-default-size - 2;
      line-height: @height-default-size - 2;
      text-indent: 10px;
    }

    // 多选框样式
   .lku-select__labels-item{

   }
  }

  .lku-select__menu {
    margin: 8px 0;
    min-width: 100%;
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
    }
  }
}
</style>

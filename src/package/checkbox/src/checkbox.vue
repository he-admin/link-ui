<template>
  <label :class="checkboxClasses">
    <span class="lku-checkbox__content">
     <span class="lku-checkbox">
       <span class="lku-checkbox__inner">
          <input type="checkbox"
                 class="lku-checkbox__input"
                 :checked="checkboxValue"
                 :disabled="disabled"
                 @change="handleCheckboxChange">
       </span>
     </span>
      <!--      文字插槽-->
      <span>
        <slot></slot>
      </span>
    </span>
  </label>
</template>

<script>
import {computed, inject, getCurrentInstance} from 'vue';
import useEmit from '../../../utils/emiter';

export default {
  name: "LkuCheckbox",
  emits: ['update:modelValue', 'change'],
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    // 自定义选中的值
    trueValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    // 自定义未选中的值
    falseValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 作为group使用，checkbox展示的label
    label: {
      type: [String, Number],
      default: ''
    },
    indeterminate: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const {dispatch} = useEmit();
    // 获取父组件的name，如果使用了checkbox-group，通过name来判断
    const {name} = getCurrentInstance()?.parent?.type;
    const isGroup = name === 'LkuCheckboxGroup';
    const checkboxValue = computed(() => {
      // 使用checkbox-group组
      if (isGroup) {
        const checkboxSelectedValue = inject('checkboxSelectedValue');
        return checkboxSelectedValue.value.includes(props.label)
      } else { // 单独使用checkbox
        const isIncluded = [props.trueValue, props.falseValue].includes(props.modelValue);
        if (isIncluded) {
          return props.modelValue === props.trueValue;
        } else {
          throw new TypeError('v-model请绑定trueValue或falseValue指定的值')
        }
      }
    })
    const checkboxClasses = computed(() => {
      return ['lku-checkbox__wrapper', {
        'lku-checkbox__checked': checkboxValue.value,
        'lku-checkbox__disabled': props.disabled,
        'lku-checkbox__indeterminate': props.indeterminate
      }]
    });

    const handleCheckboxChange = (event) => {
      if (props.disabled) {
        return
      }
      if (isGroup) {
        dispatch('change', props.label);
      } else {
        const value = event?.target?.checked ? props.trueValue : props.falseValue;
        emit('update:modelValue', value);
        emit('change', value);
      }
    }
    return {isGroup, checkboxValue, checkboxClasses, handleCheckboxChange}
  }
}
</script>

<style lang="less" scoped>
.lku-checkbox__wrapper {
  display: inline-block;
  cursor: pointer;
  user-select: none;
  margin-right: 4px;

  .lku-checkbox__content {
    display: flex;
    align-items: center;

    .lku-checkbox {
      position: relative;
      display: inline-block;
      margin-right: 4px;
      width: 16px;
      height: 16px;
      //background: #cccccc;
    }
  }

  .lku-checkbox__inner {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid @base-border-color;
    border-radius: 2px;
    user-select: none;

    .lku-checkbox__input {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      cursor: pointer;
    }
  }
}

// 半选的样式
.lku-checkbox__indeterminate {
  .lku-checkbox__inner {
    background-color: @primary-background-color;
    border: 1px solid @primary-border-color;

    &:after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 1px;
      width: 8px;
      background-color: #fff;
      border-radius: 1px;
    }
  }
}

// 选中的样式
.lku-checkbox__checked {
  .lku-checkbox__inner {
    background-color: @primary-background-color;
    border: 1px solid @primary-border-color;

    &:after {
      content: "";
      position: absolute;
      left: 4px;
      top: 4px;
      width: 7px;
      height: 4px;
      border: 1px solid @white-color;
      border-top: 0;
      border-right: 0;
      transform: rotate(-45deg);
    }
  }
}

// 禁用的样式
.lku-checkbox__disabled {
  cursor: not-allowed;

  .lku-checkbox__inner {
    background: @disabled-background-color;
    border: 1px solid @base-border-color;

    &:after {
      border-color: @disabled-text-color;
    }
  }

  .lku-checkbox__input {
    cursor: not-allowed !important;
    width: 100%;
    height: 100%;
  }
}
</style>

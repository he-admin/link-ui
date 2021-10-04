<template>
  <div :class="switchClasses"
       :style="switchStyle"
       @click="handleClick">
    <span class="lku-switch__inner-before" v-show="switchValue">
      <slot name="open"></slot>
    </span>
    <span :class="['lku-switch__icon',{'lku-switch__icon-loading':loading}]">
     <i :style="{borderColor: switchBgColor}"></i>
   </span>
    <span class="lku-switch__inner-after" v-show="!switchValue">
         <slot name="close"></slot>
    </span>
  </div>
</template>

<script>
import {ref,watch, watchEffect, computed} from 'vue';

const SIZE_VALUE = ['small', 'medium', 'large'];
export default {
  props: {
    // v-model绑定的值
    modelValue: {
      type: [Boolean, String, Number],
      default: false
    },
    // switch按钮大小
    size: {
      type: String,
      default: 'medium',
      validator: (val) => SIZE_VALUE.includes(val)
    },
    // 是否禁用disabled
    disabled: {
      type: Boolean,
      default: false
    },
    // 自定义开启时样式
    activeColor: {
      type: String
    },
    // 自定义关闭时样式
    inactiveColor: {
      type: String
    },
    width: {
      type: Number,
      default: 50
    },
    // 切换时是否显示loading，常用于请求接口
    loading: {
      type: Boolean,
      default: false
    },
    // 自定义开启状态的值
    trueValue: {
      type: [Boolean, Number, String],
      default: true
    },
    //  自定义关闭状态的值
    falseValue: {
      type: [Boolean, Number, String],
      default: false
    }
  },
  emits: ['click', 'change', 'update:modelValue'],
  name: "LkuSwitch",
  setup(props, {emit}) {
    // 根据v-model与trueFalse计算布尔值
    const switchValue = computed(() => {
      return props.modelValue === props.trueValue;
    })

    // switch样式 开启、关闭、禁用、尺寸
    const switchClasses = computed(() => {
      return ['lku-switch',
        {
          'lku-switch__opened': switchValue.value,
          'lku-switch__disabled': props.disabled,
          'lku-switch__lg': props.size === 'large',
          'lku-switch__sm': props.size === 'small'
        }]
    });

    // 自定义Switch开启与关闭时背景颜色
    const switchBgColor = computed(() => {
      let bgColor = '';
      if (switchValue.value && props.activeColor) {
        bgColor = props.activeColor
      }
      if (!switchValue.value && props.inactiveColor) {
        bgColor = props.inactiveColor
      }
      return bgColor;
    });

    // loading时转圈圈的border与当前背景色相同
    const switchLoadingStyle = switchBgColor.value;

    // 自定义Switch样式
    const switchStyle = computed(() => {
      let obj = {};
      obj.width = `${props.width}px`;
      if (switchBgColor) {
        obj.backgroundColor = switchBgColor.value; // computed计算出来的值，模板上使用不需要.value，在setup上需要
      }
      return obj;
    })
    let value;
    const handleClick = (e) => {
      // 禁用或者loading状态下无法点击
      if (props.disabled || props.loading) {
        return
      }
      emit('click', e);
       value = !switchValue.value ? props.trueValue : props.falseValue
      emit('update:modelValue', value);
    };
    watch(()=>{
      return switchValue.value
    },()=>{
      emit('change', value);
    })
    // 检测自定义true和false时，v-model绑定值是否合法
    const checkValueIsValid = (newValue) => {
      const isInclude = [props.trueValue, props.falseValue].includes(newValue);
      if (!isInclude) {
        new TypeError(`the switch value is valid, expect to ${props.trueValue} or ${props.falseValue}.`)
      }
    }

    watchEffect(() => {
      checkValueIsValid();
    })
    return {switchValue, switchBgColor, switchLoadingStyle, switchClasses, switchStyle, handleClick}
  }
}
</script>

<style lang="less" scoped>
@size-default: 26px;
@size-small: 24px;
@size-large: 28px;
.lku-switch {
  position: relative;
  margin-right: 8px;
  display: inline-block;
  height: @size-default;
  line-height: @size-default;
  border-radius: 13px;
  cursor: pointer;
  user-select: none;
  background: @dark-disabled-background-color;

  .lku-switch__icon {
    position: absolute;
    left: 2px;
    top: 2px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #ffffff;
    transition: left .2s ease; // 属性 时间 动画类型
  }

  .lku-switch__icon-loading {
    // 动画名称、时间、动画类型、永久
    animation: lkuSwitchLoading 1s linear infinite;

    i {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      height: 60%;
      border-bottom: 2px dotted @dark-disabled-background-color;
      border-right: 2px dotted @dark-disabled-background-color;
      border-radius: 50%;
    }
  }

  &:not(.lku-switch__disabled):hover {
    opacity: .8;
  }

  .lku-switch__inner-before {
    //display: inline-flex;
    align-items: center;
    padding-left: 6px;
    height: @size-default;
    color: @white-color;
  }

  .lku-switch__inner-after {
    //display: inline-flex;
    align-items: center;
    height: @size-default;
    padding-left: 6px;
    color: @white-color;
  }
}

.lku-switch__opened {
  background: @primary-background-color;

  .lku-switch__icon-loading {
    i {
      border-color: @primary-border-color;
    }
  }

  .lku-switch__icon {
    left: calc(100% - 24px);
  }
}

// large尺寸样式
.lku-switch__lg {
  height: @size-large;
  line-height: @size-large;
  border-radius: 14px;

  .lku-switch__icon {
    width: 24px;
    height: 24px;
  }

  &.lku-switch__opened {
    .lku-switch__icon {
      left: calc(100% - 26px)
    }
  }

  .lku-switch__inner-before {
    height: @size-large;
  }

  .lku-switch__inner-after {
    height: @size-large;
    padding-left: @size-large + 2;
  }
}

// small尺寸样式
.lku-switch__sm {
  height: @size-small;
  line-height: @size-small;
  border-radius: 12px;

  .lku-switch__icon {
    width: 20px;
    height: 20px;
  }

  &.lku-switch__opened {
    .lku-switch__icon {
      left: calc(100% - 22px)
    }
  }

  .lku-switch__inner-before {
    height: @size-small;
  }

  .lku-switch__inner-after {
    height: @size-small;
    padding-left: @size-small + 5;
  }
}

// disabled样式
.lku-switch__disabled {
  opacity: .5;
  cursor: not-allowed;
}

@keyframes lkuSwitchLoading {
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>

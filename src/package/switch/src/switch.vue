<template>
  <div :class="switchClasses"
       :style="switchStyle"
       @click="handleClick">
    <span class="lku-switch__inner-before" v-show="switchValue">
      <slot name="open"></slot>
    </span>
    <span :class="['lku-switch__icon',{'lku-switch__icon-loading':loading}]">
     <i></i>
   </span>
    <span class="lku-switch__inner-after" v-show="!switchValue">
         <slot name="close"></slot>
    </span>
  </div>
</template>

<script>
import {ref, computed} from 'vue';

const SIZE_VALUE = ['small', 'medium', 'large'];
export default {
  props: {
    // v-model绑定的值
    modelValue: {
      type: Boolean,
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
      type: String,
    },
    // 自定义关闭时样式
    inactiveColor: {
      type: String,
    },
    width: {
      type: Number,
      default: 50
    },
    // 切换时是否显示loading，常用于请求接口
    loading: {
      type: Boolean,
      default: false
    }
  },
  name: "LkuSwitch",
  setup(props, {emit}) {
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
      if (props.modelValue && props.activeColor) {
        bgColor = props.activeColor
      }
      if (!props.modelValue && props.inactiveColor) {
        bgColor = props.inactiveColor
      }
      return bgColor;
    });
    // 自定义Switch样式
    const switchStyle = computed(() => {
      let obj = {};
      obj.width = `${props.width}px`;
      if (switchBgColor) {
        obj.backgroundColor = switchBgColor.value; // computed计算出来的值，模板上使用不需要.value，在setup上需要
      }
      return obj;
    })
    const switchValue = ref(props.modelValue);
    const handleClick = () => {
      if (props.disabled) {
        return
      }
      switchValue.value = !switchValue.value;
      emit('update:modelValue', switchValue.value)
    }
    return {switchValue, switchBgColor, switchClasses, switchStyle, handleClick}
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
  border-radius: 13px;
  cursor: pointer;
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
      border-bottom: 2px dotted #c5c8ce;
      border-right: 2px dotted #c5c8ce;
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

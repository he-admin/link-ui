<template>
  <div :class="switchClasses"
       :style="switchStyle"
       @click="handleClick">
   <span class="lku-switch__icon">

   </span>
    <span class="lku-switch__inner-after"></span>
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
      console.log(obj);
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

  &:not(.lku-switch__disabled):hover {
    opacity: .8;
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
}

// disabled样式
.lku-switch__disabled {
  opacity: .5;
  cursor: not-allowed;
}
</style>

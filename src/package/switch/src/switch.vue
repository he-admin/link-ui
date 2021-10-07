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

<template>
  <div :class="['lku-tips__wrapper',{'lku-tips__notice':isNotice}]">
    <transition-group class="lku-tips__content"
                      @enter="handleEnter"
                      @leave="handleLeave"
                      tag="ul"
                      :name="type==='message'?'lku-tips-message-transition': 'lku-tips-notice-transition'">
      <li v-for="item in tips" :key="item.ulid" :class="tipItemClass(item)">
        <div class="lku-tips__item-wrapper">
          <div class="lku-tips__item-content">
            <lku-icon :type="item.icon" class="lku-tips__icon-type"></lku-icon>
            <div class="lku-tips__info">
              <div :class="['lku-tips__title',{'lku-bold': item.content || item.render}]">
                <template v-if="type==='message' && item.render">
                  <p v-html="item.render"></p>
                </template>
                <template v-else>
                  {{ item.title }}
                </template>
              </div>
              <div class="lku-tips__desc"
                   v-if="type==='notice' &&(item.render || item.content)">
                <template v-if="item.render">
                  <p v-html="item.render"></p>
                </template>
                <template v-else>
                  {{ item.content }}
                </template>
              </div>
            </div>
            <lku-icon type="close"
                      @click="removeTip(item)"
                      v-if="item.closeable"
                      class-name="lku-tips__icon-close">
            </lku-icon>
          </div>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import {ref, computed} from 'vue';
import {isFunction, createULID} from '@/utils/tools';
import LkuIcon from '../../icon';

export default {
  name: "LkuTips",
  props: {
    type: {
      type: String,
      required: true,
      validator: (val) => ['message', 'notice'].includes(val)
    },
    test: {
      type: String
    }
  },
  components: {
    LkuIcon
  },
  setup(props) {
    const tips = ref([]);
    const isNotice = computed(() => {
      return props.type === 'notice'
    })
    const tipItemClass = computed(() => {
      const TIPS = 'lku-tips';
      return (item) => {
        return [
          `${TIPS}__item`,
          {
            [`${TIPS}__info`]: item.type === 'info',
            [`${TIPS}__error`]: item.type === 'error',
            [`${TIPS}__success`]: item.type === 'success',
            [`${TIPS}__warning`]: item.type === 'warning',
          },
        ];
      }
    })
    const addTip = (type, config) => {
      const ICON_MAPS = {
        info: 'tip',
        success: 'success-circle',
        error: 'error-circle',
        warning: 'warning',
      };
      config.ulid = createULID();
      config.type = type;
      config.icon = ICON_MAPS[type];
      // 创建tip
      tips.value.push(config);
      isFunction(config.onShow) && config.onShow();
      if (config.duration > 0) {
        setTimeout(() => {
          removeTip(config);
        }, config.duration)
      }
      return config
    }

    const removeTip = (config) => {
      tips.value = tips.value.filter(tip => tip.ulid !== config.ulid);
      isFunction(config.onClose) && config.onClose;
    }
    const handleEnter = (el) => {
      el.style = 'transition: opacity .3s, transform .3s;'
    };
    const handleLeave = (el) => {
      el.style = 'transition: opacity .3s, transform .3s;'
    };

    return {tips, isNotice, tipItemClass, addTip, removeTip, handleEnter, handleLeave}
  }
}
</script>

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

<style lang="less" scoped>

.lku-tips__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  z-index: 999;
  pointer-events: none;

  .lku-tips__content {
    display: inline-block;
  }
}

/* message的样式 */
.lku-tips__content {
  padding-top: 50px;

  .lku-tips__item {
    margin-bottom: 12px;
    pointer-events: all;
    text-align: center;
    //transition: translate .3s ease;
  }

  .lku-tips__item-wrapper {
    display: inline-block;
  }

  .lku-tips__item-content {
    display: flex;
    //align-items: center;
    flex-direction: row;
    padding: 8px 14px;
    border-radius: 4px;
    background: @base-background-color;
    box-shadow: 0 0 14px #d8d8d8;

    .lku-tips__icon-type {
      margin-right: 4px;
      margin-top: -1px;
    }
  }

  .lku-tips__info {
    flex: 1;
  }

  .lku-tips__icon-close {
    margin-left: 10px;
    margin-top: -1px;
    cursor: pointer;

    &:hover {
      font-weight: bold;
    }
  }

  .lku-tips__info {
    .lku-tips__icon-type {
      color: @primary-color;
    }
  }

  .lku-tips__success {
    .lku-tips__icon-type {
      color: @success-color;
    }
  }

  .lku-tips__error {
    .lku-tips__icon-type {
      color: @danger-color;
    }
  }

  .lku-tips__warning {
    .lku-tips__icon-type {
      color: @warning-color;
    }
  }
}

/* notice特殊的样式 */
.lku-tips__notice {
  text-align: right;

  .lku-tips__item-wrap {
    width: 300px;
  }

  .lku-Bold {
    font-weight: bold;
  }

  .lku-tips__desc {
    margin-top: 6px;
    font-size: 12px;
  }
}

/* 动画 */
.lku-tips-transition-message-enter-active,
.lku-tips-transition-leave-active {
  transition: opacity .3s, transform .3s;
}

.lku-tips-message-transition-enter-from,
.lku-tips-message-transition-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.lku-tips-notice-transition-enter-from {
  opacity: 0;
  transform: translateX(200px);
}

.lku-tips-notice-transition-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>

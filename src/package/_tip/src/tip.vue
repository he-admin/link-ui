<template>
  <div :class="['lku-tips__wrapper',{'lku-tips__notice':isNotice}]">
    <transition-group class="lku-tips__content" tag="ul" name="lku-tips-transition">
      <li v-for="item in tips" :key="item.ulid" :class="tipItemClass(item)">
        <div class="lku-tips__item-wrapper">
          <div class="lku-tips__item-content">
            <lku-icon :type="item.icon"></lku-icon>
            <div class="lku-tips__info">
              <div class="lku-tips__title">
                <template v-if="type==='message' && item.render">
                  <p v-html="item.render"></p>
                </template>
                <template v-else>
                  {{ item.title }}
                </template>
              </div>
              <div class="lku-tips__desc" v-if="type==='notice' &&(item.render || item.content)">
                <template v-if="item.render">
                  <p v-html="item.render"></p>
                </template>
                <template v-else>
                  {{ item.content }}
                </template>
              </div>
            </div>
          </div>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import {ref, computed, getCurrentInstance} from 'vue';
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
      return props.type
    })
    const tipItemClass = computed(() => {
      const TIPS = 'lku-tips';
      return (item) => {
        return [
          `${TIPS}__item`,
          {
            [`${TIPS}--info`]: item.type === 'info',
            [`${TIPS}--error`]: item.type === 'error',
            [`${TIPS}--success`]: item.type === 'success',
            [`${TIPS}--warning`]: item.type === 'warning',
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
      tips.value = tips.value.filter(tip => tip.uid !== config.uid);
      isFunction(config.onClose) && config.onClose;
    }
    return {tips, isNotice, tipItemClass, addTip, removeTip}
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
    text-align: center
  }

  .lku-tips__item-wrap {
    display: inline-block;
  }

  .lku-tips__item-content {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 8px 14px;
    border-radius: 4px;
    background: @base-background-color;
    box-shadow: 0 0 14px #d8d8d8;

    .lku-tips__icon-type {
      margin-right: 4px;
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

  .lku-tips__icon-type {
    margin-top: -1px;
  }

  .lku-tips__info {
    .lku-tips__icon-type {
      color: @primary-color;
    }
  }

  .lku-tip__success {
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
.lku-tips-notice {
  text-align: right;

  .lku-tips__item-wrap {
    width: 300px;
  }

  .lku--isBold {
    font-weight: bold;
  }

  .lku-tips__desc {
    margin-top: 6px;
    font-size: 12px;
  }
}

/* 动画 */
.lku-tips-transition-enter-active,
.lku-tips-transition-leave-active {
  transition: opacity .38s, transform .38s;
}

.lku-tips-transition-enter-from,
.lku-tips-transition-leave-to,
.lku-tips-transition-leave-active {
  opacity: 0;
  transform: translateY(-50px);
}

</style>

<template>
  <div class="demo-block">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta">
      <div class="description" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
    <div
      class="demo-block-control"
      ref="control"
      @click="isExpanded = !isExpanded"
    >
      <span>{{ controlText }}</span>
    </div>
  </div>
</template>

<script>
import { ref, computed, watchEffect, onMounted } from 'vue'
export default {
  setup() {
    const meta = ref(null)
    const isExpanded = ref(false)
    const controlText = computed(() =>
      isExpanded.value ? '隐藏代码' : '显示代码'
    )
    const codeAreaHeight = computed(() =>
      [...meta.value.children].reduce((t, i) => i.offsetHeight + t, 56)
    )
    onMounted(() => {
      watchEffect(() => {
        meta.value.style.height = isExpanded.value
          ? `${codeAreaHeight.value}px`
          : '0'
      })
    })

    return {
      meta,
      isExpanded,
      controlText
    }
  }
}
</script>

<style lang="less">
.demo-block {
  padding: 30px;
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: 0.2s;

  &.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }

  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }

  .demo-button {
    float: right;
  }

  .source {
    padding: 24px;
  }

  .meta {
    background-color: #fafafa;
    border-top: solid 1px #eaeefb;
    overflow: hidden;
    transition: height 0.2s;
  }

  .description {
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;

    p {
      margin: 0;
      line-height: 26px;
    }

    code {
      color: #5e6d82;
      background-color: #e6effb;
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
    }
  }

  .highlight {
    pre {
      margin: 0;
    }

    code.hljs {
      margin: 0;
      border: none;
      max-height: none;
      border-radius: 0;

      &::before {
        content: none;
      }
    }
  }

  .demo-block-control {
    border-top: solid 1px #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;

    i {
      font-size: 16px;
      line-height: 44px;
      transition: 0.3s;
      &.hovering {
        transform: translateX(-40px);
      }
    }

    > span {
      position: absolute;
      transform: translateX(-30px);
      font-size: 14px;
      line-height: 44px;
      transition: 0.3s;
      display: inline-block;
    }

    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }

    & .text-slide-enter,
    & .text-slide-leave-active {
      opacity: 0;
      transform: translateX(10px);
    }

    .control-button {
      line-height: 26px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 14px;
      padding-left: 5px;
      padding-right: 25px;
    }
  }
}
.hljs {
  line-height: 1.8;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
  font-size: 12px;
  padding: 18px 24px;
  background-color: #fafafa;
  border: solid 1px #eaeefb;
  margin-bottom: 25px;
  border-radius: 4px;
  -webkit-font-smoothing: auto;
}
</style>

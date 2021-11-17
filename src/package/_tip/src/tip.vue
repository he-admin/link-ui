<template>
  <div :class="['lku-tips__wrapper',{'lku-tips__notice':isNotice}]">
    {{ test }}
    <transition-group tag="ul" name="mku-tips__transition">
      <li v-for="item in tips" :key="tips.uid">
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
import {ref, computed} from 'vue';

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
  setup(props) {
    const tips = ref([]);
    const isNotice = computed(() => {
      return props.type
    })
    return {tips, isNotice}
  }
}
</script>

<style lang="less" scoped>

</style>

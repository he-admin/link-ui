<template>
  <div class="lku-table">
    <div class="lku-table__normal">
      <div class="lku-table__wrap">
        <table :class="{'lku-table__border': border}" cellspacing="0" cellpadding="0">
          <thead>
          <tr>
            <slot colType="thead"></slot>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in data">
             <slot colType="tbody"></slot>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {provide, computed} from 'vue';

export default {
  name: "LkuTable",
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    // 是否带有border
    border: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    provide('data', props.data)
  }
}
</script>

<style lang="less">
.lku-table {
  table {
    table-layout: auto; // 默认为fixed
    width: 100%;
  }

  th, td {
    max-width: 260px;
    height: @height-large-size;
    text-align: left;
    color: @primary-text-color;
    font-size: @small-font-size;
    font-weight: normal;
    border-bottom: 1px solid @base-border-color;
    padding: 0 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  tbody {
    tr:hover {
      background-color: #f9f9f9;
    }
  }
}
</style>

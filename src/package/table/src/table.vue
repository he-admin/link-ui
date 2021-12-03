<template>
  <div class="lku-table">
    <div class="lku-table__normal">
      <div class="lku-table__wrap">
        <table :class="{'lku-table__border': border}" cellspacing="0" cellpadding="0">
          <thead>
          <tr>
           <slot></slot>
          </tr>
          </thead>
          <tbody>
          <tr>
            <slot></slot>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="less" scoped>
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

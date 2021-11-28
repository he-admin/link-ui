<template>
  <div :class="['lku-pagination',{
    'lku-pagination__simple': type === 'simple',
    'lku-pagination__conjoin': type === 'conjoin',
    'lku-pagination__small': type === 'small',
    'lku-pagination__large': type === 'large',
  }]">
    <!--    总数-->
    <div class="lku-pagination__total">
      <slot name="total">共{{ total }}条</slot>
    </div>
<!--    pager主体-->
    <ul class="lku-pagination__pager">
       <li class="lku-pagination__item lku-pagination__pre-btn">
         <slot name="prev">
           
         </slot>
       </li>
    </ul>
  </div>
</template>

<script>
import {computed} from 'vue';

export default {
  name: "LkuPagination",
  props: {
    // 当前页数
    currentPage: {
      type: Number,
      default: 1
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 总条数
    total: {
      type: Number,
      default: 0,
      required: true
    },
    // 分页器展示类型
    type: {
      type: String,
      default: 'default',
      validator: (val) => ['simple', 'default', 'conjoin'].includes(val)
    },
    // 分页器大小
    size: {
      type: String,
      default: 'medium',
      validator: (val) => ['small', 'medium', 'large'].includes(val)
    },
    // 是否显示总条数
    showTotal: {
      type: Boolean,
      default: true
    },
    // 显示快速跳转
    showJumper: {
      type: Boolean,
      default: true
    },
    pageSizeOption: {
      type: Array,
      default: [5, 10, 15, 20, 50, 100, 500]
    }
  },
  setup(props) {
    const totalPages = computed(() => {
      return Math.ceil(props.total / props.pageSize)
    })
    return {totalPages}
  }
}
</script>

<style scoped>

</style>

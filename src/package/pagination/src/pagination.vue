<template>
  {{ current }}
  <div :class="['lku-pagination',{
    'lku-pagination__simple': type === 'simple',
    'lku-pagination__conjoin': type === 'conjoin',
    'lku-pagination__small': type === 'small',
    'lku-pagination__large': type === 'large',
  }]">
    <!--    总数-->
    <span class="lku-pagination__total">
      <slot name="total">共{{ total }}条</slot>
    </span>
    <!--    pager主体-->
    <ul class="lku-pagination__pager">
      <!--      上一页-->
      <li class="lku-pagination__item lku-pagination__pre-btn" @click="handlePreClick">
        <slot name="prev">
          <lku-icon type="arrow-left"></lku-icon>
        </slot>
      </li>
      <!--      页数-->
      <li v-for="(item,index) in pages"
          :key="index"
          :class="['lku-pagination__item',{'lku-pagination__item--active': item === current}]"
          @click="handlePagerClick(item)">
        <template v-if="item==='preDots'|| item==='nextDots'">
          <lku-icon type="ellipsis"></lku-icon>
          <lku-icon v-if="item==='preDots'" type="double-arrow-left" class-name="lku-pagination__arrow"></lku-icon>
          <lku-icon v-if="item==='nextDots'" type="double-arrow-right" class-name="lku-pagination__arrow"></lku-icon>
        </template>
        <template v-else>
          {{ item }}
        </template>
      </li>
      <!--      下一页-->
      <li class="lku-pagination__item lku-pagination__next-btn" @click="handleNextClick">
        <slot name="next">
          <lku-icon type="arrow-right"></lku-icon>
        </slot>
      </li>
    </ul>
    <!--    每页显示条数配置-->
    <div class="lku-pagination__size-option" v-if="showSizeOptions">
      <lku-dropdown @visible-change="visibleChange">
        <div class="lku-pagination__options-ref">
          <span>{{ sizePerPage }}条/页</span>
          <lku-icon :type="isPageSizeOpened?'arrow--up':'arrow-down'"></lku-icon>
        </div>
        <template v-slot:menu>
          <lku-dropdown-item v-for="(item,index) in  pageSizeOptions"
                             @click="handleItemClick(item)"
                             :name="item">
            {{ item }}条/页
          </lku-dropdown-item>
        </template>
      </lku-dropdown>
    </div>
  </div>
</template>

<script>
import {ref, computed} from 'vue';

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
    // 是否展示每页条数的配置项
    showSizeOptions: {
      type: Boolean,
      default: true
    },
    pageSizeOptions: {
      type: Array,
      default: [10, 15, 20, 50, 100, 500]
    }
  },
  setup(props, {emit}) {
    const current = ref(1);//  当前页
    const sizePerPage = ref(10)//每页显示条数
    const isPageSizeOpened = ref(false) // pageSizeOptions是否展开
    const totalPages = computed(() => {
      return Math.ceil(props.total / props.pageSize)
    })
    /**
     * @description 计算分页数据
     * 1-6页时全部展示，
     * 7-8页时，最多展示一个省略号，前省略号或后省略号
     * 9页及以上，根据current选中项，会展示前省略号、或后省略号、或前后省略号都展示
     */
    const pages = computed(() => {
      const totalNums = 20 //totalPages.value;
      const count = 5; // 期望展示的页数，...前和...后之间的页数
      const level1 = count + 2;
      const level2 = count + 4;
      const cur = current.value; // 当前选中的页数
      const arr = [];
      // 1-6页时展示的情况
      if (totalNums < level1) {
        return createPageArr(totalNums)
      }
      // 7-8页时，只会有一个省略号，需要根据当前current来决定是时前省略号还是后省略号
      if (totalNums < level2) {
        const half = Math.floor(totalNums / 2);
        if (cur <= half) {
          arr.push(...createPageArr(count), 'nextDots', totalNums)
        } else {
          arr.push(1, 'preDots', ...createRightArr(totalNums, 5))
        }
        return arr;
      }
      // 9页及以上
      if (cur < count) {
        arr.push(...createPageArr(5), 'nextDots', totalNums)
      } else if (cur >= count && cur <= totalNums - (count - 1)) {
        arr.push(1, 'preDots', cur - 2, cur - 1, cur, cur + 1, cur + 2, 'nextDots', totalNums)
      } else {
        arr.push(1, 'preDots', ...createRightArr(totalNums, 5))
      }
      return arr;
    })
    const createPageArr = (count) => {
      let resArr = [];
      for (let i = 1; i <= count; i++) {
        resArr.push(i)
      }
      return resArr;
    }
    const createRightArr = (end, n) => {
      let resArr = [];
      for (let i = end - n + 1; i <= end; i++) {
        resArr.push(i)
      }
      return resArr;
    }
    // isAdd为true表示累加，false表示直接更新当前current
    const updateSteps = (step, isAdd = true) => {
      const cur = isAdd ? current.value + step : step;
      current.value = cur;
    }
    const handlePreClick = () => {
      if (current.value === 1) {
        return false;
      }
      updateSteps(-1)
    };

    const handleNextClick = () => {
      if (current.value === totalPages) {
        return false;
      }
      updateSteps(1)
    };
    const handlePagerClick = (item) => {
      if (item === 'preDots') {
        updateSteps(-3)
      } else if (item === 'nextDots') {
        updateSteps(3)
      } else {
        current.value = item
      }
    }
    const visibleChange = (visible) => {
      isPageSizeOpened.value = visible;
    }
    const handleItemClick = (name) => {
      sizePerPage.value = name;
    }
    return {
      sizePerPage, totalPages, current, pages, isPageSizeOpened,
      handlePreClick, handleNextClick, handlePagerClick,
      visibleChange,
      handleItemClick
    }
  }
}
</script>

<style lang="less" scoped>
.lku-pagination {
  .lku-pagination__total {
    margin-right: 8px;
  }

  .lku-pagination__pager {
    display: inline-block;
    vertical-align: middle;

    .lku-pagination__item {
      .flex-content(inline-flex);
      position: relative;
      margin-right: 8px;
      min-width: @height-default-size;
      height: @height-default-size;
      padding: 0 4px;
      border: 1px solid @base-border-color;
      border-radius: 4px;
      vertical-align: middle;
      cursor: pointer;
      user-select: none;
      transition: all .3s;

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        border: 1px solid @primary-color;
        color: @primary-color;

        .lku-icon-ellipsis {
          opacity: 0;
        }

        .lku-pagination__arrow {
          opacity: 1;
        }

        .lku-icon {
          color: @primary-color;
        }
      }

      .lku-pagination__arrow {
        position: absolute;
        opacity: 0;
      }
    }

    .lku-pagination__item--active {
      border: 1px solid @primary-color;
      color: @primary-color;
      box-shadow: 0 0 0 2px rgba(71, 142, 250, 0.2);
    }
  }

  .lku-pagination__size-option {
    display: inline-block;
    margin-left: 10px;
    vertical-align: middle;

    .lku-pagination__options-ref {
      height: @height-default-size;
      line-height: @height-default-size - 2;
      padding: 0 6px 0 14px;
      border: 1px solid @base-border-color;
      border-radius: 4px;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>

<template>
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
      <li :class="['lku-pagination__item', 'lku-pagination__pre-btn',{'lku-pagination__disabled-btn': current=== 1 }]"
          @click="handlePreClick">
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
      <li
        :class="['lku-pagination__item', 'lku-pagination__next-btn',{'lku-pagination__disabled-btn': current=== totalPages }]"
        @click="handleNextClick">
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
          <lku-icon type="arrow-down"
                    :class-name="['lku-icon__arrow',{'lku-icon__arrow--up':isPageSizeOpened}]"></lku-icon>
        </div>
        <template v-slot:menu>
          <lku-dropdown-item v-for="(item,index) in  pageSizeOptions"
                             @click="handleSizeOptionClick(item)"
                             :name="item">
            {{ item }}条/页
          </lku-dropdown-item>
        </template>
      </lku-dropdown>
    </div>
    <!--    快速跳转-->
    <div class="lku-pagination__jumper" v-if="showJumper">
      <span class="lku-pagination__tip">跳转至</span>
      <lku-input type="number" v-model="current" width="60" text-align="center" class="lku-pagination__input">
      </lku-input>
      <span class="lku-pagination__tip">页</span>
    </div>
  </div>
</template>

<script>
import {ref, watch, computed} from 'vue';

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
      default: 200,
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
    const sizePerPage = ref(props.pageSize)//每页显示条数
    const isPageSizeOpened = ref(false) // pageSizeOptions是否展开
    watch(() => {
      return sizePerPage.value
    }, (newVal, oldVal) => {
      if(current.value ){

      }
    })

    const totalPages = computed(() => {
      return Math.ceil(props.total / sizePerPage.value)
    })
    /**
     * @description 计算分页数据
     * 1-6页时全部展示，
     * 7-8页时，最多展示一个省略号，前省略号或后省略号
     * 9页及以上，根据current选中项，会展示前省略号、或后省略号、或前后省略号都展示
     */
    const pages = computed(() => {
      const totalNums = totalPages.value;
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
    // 上一页
    const handlePreClick = () => {
      // 第一页点击无效
      if (current.value === 1) {
        return false;
      }
      updateSteps(-1);
      emit('page-change', {current: current.value, pageSize: sizePerPage.value});
    };

    // 下一页
    const handleNextClick = () => {
      // 最后一页点击无效
      if (current.value === totalPages.value) {
        return false;
      }
      updateSteps(1);
      emit('page-change', {current: current.value, pageSize: sizePerPage.value});
    };
    // 每一页的按钮点击
    const handlePagerClick = (item) => {
      if (item === 'preDots') {
        updateSteps(-3)
      } else if (item === 'nextDots') {
        updateSteps(3)
      } else {
        current.value = item
      }
      emit('page-change', {current: current.value, pageSize: sizePerPage.value});
    }
    const visibleChange = (visible) => {
      isPageSizeOpened.value = visible;
    }
    // 分页配置选项点击
    const handleSizeOptionClick = (name) => {
      sizePerPage.value = name;
      emit('page-change', {current: current.value, pageSize: sizePerPage.value});
    }
    return {
      sizePerPage, totalPages, current, pages, isPageSizeOpened,
      handlePreClick, handleNextClick, handlePagerClick,
      visibleChange,
      handleSizeOptionClick
    }
  }
}
</script>

<style lang="less">
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

      &.lku-pagination__disabled-btn {
        cursor: not-allowed;
      }

      &:last-child {
        margin-right: 0;
      }

      &:not(.lku-pagination__disabled-btn):hover {
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
      span {
        margin-right: 6px;
      }

      .flex-content();
      height: @height-default-size;
      line-height: @height-default-size - 2;
      padding: 0 6px 0 14px;
      border: 1px solid @base-border-color;
      border-radius: 4px;
      cursor: pointer;
      user-select: none;
    }
  }

  .lku-pagination__jumper {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    margin-left: 10px;

    .lku-pagination__input {
      padding-left: 8px;
    }
  }

  /* 简约类型 */

  &.lku-pagination__simple {

    .lku-pagination__pager {
      .lku-pagination__item {
        border: 1px solid transparent;

        &:hover {
          border: 1px solid transparent;
          color: @primary-color;
        }
      }

      .lku-pagination__item--active {
        border: 1px solid transparent;
        box-shadow: none;
      }
    }
  }

  /* 连体类型 */

  &.lku-pagination__conjoin {
    .lku-pagination__item {
      margin-right: 0;
      margin-left: -1px;
      border-radius: 0;

      &:hover {
        position: relative;
        z-index: 1;
      }
    }

    .lku-pagination__pre-btn {
      border-radius: 4px 0 0 4px;
    }

    .mku-pagination__next-btn {
      border-radius: 0 4px 4px 0;
    }

    .lku-pagination__item--active {
      position: relative;
      z-index: 1;
    }
  }
}

/* 大尺寸 */
.lku-pagination__large {
  .lku-pagination__item {
    min-width: @height-large-size;
    height: @height-large-size;
    margin-right: 12px;
  }

  .lku-pagination__jumper {
    height: @height-large-size;
  }

  .lku-pagination__size-option {
    .lku-pagination__options-ref {
      height: @height-large-size;
      line-height: @height-large-size - 2;
    }
  }
}

/* 小尺寸 */
.lku-pagination__small {
  .lku-pagination__item {
    min-width: @height-small-size;
    height: @height-small-size;
    margin-right: 6px;
  }

  .lku-pagination__jumper {
    height: @height-small-size;
  }

  .lku-pagination__size-option {
    .lku-pagination__options-ref {
      height: @height-small-size;
      line-height: @height-small-size - 2;
    }
  }
}

</style>

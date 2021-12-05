<script>
import {ref, h, render, resolveComponent, inject, getCurrentInstance, onMounted} from 'vue';
import tooltip from "@/package/tooltip/src/tooltip";
import button from "@/package/button/src/button";

export default {
  name: "LkuTableColumn",
  props: {
    // 表格字段key值
    prop: {
      type: String,
      default: ''
    },
    // 表格展示文字
    label: {
      type: String,
      default: ''
    },
    colType: {
      type: String,
      default: ''
    }
  },
  // render(props,tset,er) {
  //    console.log(er);
  //   return h(props.colType === 'thead' ? 'th' : 'td', {},
  //     'hello world')
  // },
  setup(props) {
    const {proxy} = getCurrentInstance();
    const colType = ref('');
    const rowIndex = ref(0);
    const data = inject('data');
    let parentNode
    onMounted(() => {
      parentNode = proxy.$el?.parentNode?.parentNode;
      colType.value = parentNode.tagName;
      if (colType.value === 'TBODY') {
        const trs = parentNode.children;
        for (let index = 0; index <= trs.length; index++) {
          if (proxy.$el.parentNode === trs[index + 1]) {
            rowIndex.value = index + 1;
            console.log(index);
          }
        }
      }
    })
    // const ellipsis = resolveComponent('LkuEllipsisTooltip');
    // console.log(ellipsis);

    return () => h(colType.value === 'THEAD' ? 'th' : 'td', {},
      colType.value === 'THEAD' ? props.label : <lku-ellipsis-tooltip>1212</lku-ellipsis-tooltip>)
  }
}
</script>

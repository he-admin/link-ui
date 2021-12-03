<script>
import {h} from 'vue';

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
    }
  },
  render() {
    return h("span")
  }
}
</script>

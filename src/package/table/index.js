import LkuTable from './src/table';
import LkuTableColumn from './src/table-column';

[LkuTable, LkuTableColumn].forEach(component => {
  component.install = (Vue) => {
    Vue.component(component.name, component)
  }
})
export {
  LkuTable, LkuTableColumn
}

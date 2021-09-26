import LkuSelect from './src/select';
import LkuOptionGroup from './src/option-group';
import LkuOption from './src/option';

LkuSelect.install = function (Vue) {
  Vue.component(LkuSelect.name, LkuSelect)
}
LkuOptionGroup.install = function (Vue) {
  Vue.component(LkuOptionGroup.name, LkuOptionGroup);
}
LkuOption.install = function (Vue) {
  Vue.component(LkuOption.name, LkuOption);
}


export {
  LkuSelect,
  LkuOptionGroup,
  LkuOption
}

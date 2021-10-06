import LkuCheckbox from './src/checkbox';
import LkuCheckboxGroup from './src/checkbox-group'

LkuCheckbox.install = function (Vue) {
  Vue.component(LkuCheckbox.name, LkuCheckbox)
}
LkuCheckbox.install = function (Vue) {
  Vue.component(LkuCheckboxGroup.name, LkuCheckbox)
}
export {
  LkuCheckbox,
  LkuCheckboxGroup
}

import './styles/components/menu.less';
import './styles/components/select.less'
import {LkuSelect, LkuOptionGroup, LkuOption} from './package/select'
import LkuMenu from './package/menu';
import LkuMenuGroup from './package/menu-group';
import LkuMenuItem from './package/menu-item';
import LkuCollapseTransition from './package/collapse-transition';
import LkuSwitch from './package/switch/index';
import {LkuCheckbox, LkuCheckboxGroup} from './package/checkbox/index'

const components = [LkuSelect, LkuOptionGroup, LkuOption, LkuMenu,
  LkuMenuGroup, LkuMenuItem, LkuCollapseTransition, LkuSwitch,LkuCheckbox, LkuCheckboxGroup];

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue.createApp({})); // 判断如果引入了Vue，则注册组件
// }

export default {
  version: '0.1.0',
  install,
  LkuSelect,
  LkuOptionGroup,
  LkuOption,
  LkuMenu,
  LkuMenuGroup,
  LkuMenuItem,
  LkuCollapseTransition,
  LkuSwitch,
  LkuCheckbox,
  LkuCheckboxGroup
}

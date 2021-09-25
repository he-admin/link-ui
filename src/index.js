import './styles/components/menu.less';
import LkuMenu from './package/menu';
import LkuMenuGroup from './package/menu-group';
import LkuMenuItem from './package/menu-item';
import LkuCollapseTransition from './package/collapse-transition'

const components = [LkuMenu, LkuMenuGroup, LkuMenuItem,LkuCollapseTransition];

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
  LkuMenu,
  LkuMenuGroup,
  LkuMenuItem,
  LkuCollapseTransition
}

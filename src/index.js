import './styles/components/menu.less';
import LinkMenu from './package/menu/index';

const components = [LinkMenu];

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
  LinkMenu
}

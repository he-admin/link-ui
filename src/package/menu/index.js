import LkuMenu from './src/menu'
import LkuMenuGroup from './src/menu-group';
import LkuMenuItem from './src/menu-item';

export {
  LkuMenuGroup,
  LkuMenuItem
}

LkuMenu.install = function (Vue) {
  Vue.component(LkuMenu.name, LkuMenu)
}
export default LkuMenu

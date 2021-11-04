import './styles/components/menu.less';
import './styles/components/select.less';
import './styles/components/switch.less';
import './styles/components/radio.less';
import './styles/components/checkbox.less';
import './styles/components/input.less';
import './styles/components/form.less';
import './styles/components/drawer.less';
import './styles/components/modal.less';

import {LkuSelect, LkuOptionGroup, LkuOption} from './package/select'
import LkuMenu from './package/menu';
import LkuMenuGroup from './package/menu-group';
import LkuMenuItem from './package/menu-item';
import LkuCollapseTransition from './package/collapse-transition';
import LkuSwitch from './package/switch/index';
import {LkuCheckbox, LkuCheckboxGroup} from './package/checkbox/index';
import {LkuRadio, LkuRadioGroup} from './package/radio/index';
import LkuInput from './package/input/index';
import {LkuForm, LkuFormItem} from './package/form/index';
import LkuButton from './package/button/index';
import LkuIcon from './package/icon/index';
import LkuDrawer from './package/drawer/index';
import LkuModal from './package/modal/index';

const components = [LkuSelect, LkuOptionGroup, LkuOption, LkuMenu, LkuMenuGroup,
  LkuMenuItem, LkuCollapseTransition, LkuSwitch, LkuCheckbox, LkuCheckboxGroup,
  LkuRadio, LkuRadioGroup, LkuInput, LkuForm, LkuFormItem, LkuButton, LkuIcon,
  LkuDrawer, LkuModal];

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
  LkuCheckbox, LkuCheckboxGroup,
  LkuRadio, LkuRadioGroup,
  LkuInput,
  LkuForm, LkuFormItem,
  LkuButton,
  LkuIcon,
  LkuDrawer,
  LkuModal
}

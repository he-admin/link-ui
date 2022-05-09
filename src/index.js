import './styles/index.less';
import {LkuSelect, LkuOptionGroup, LkuOption} from './package/select'
import LkuMenu from './package/menu';
import LkuMenuGroup from './package/menu-group';
import LkuMenuItem from './package/menu-item';
import LkuCollapseTransition from './package/collapse-transition';
import LkuSwitch from './package/switch';
import {LkuCheckbox, LkuCheckboxGroup} from './package/checkbox';
import {LkuRadio, LkuRadioGroup} from './package/radio';
import LkuInput from './package/input';
import {LkuForm, LkuFormItem} from './package/form';
import LkuButton from './package/button';
import LkuIcon from './package/icon';
import LkuDrawer from './package/drawer';
import LkuModal from './package/modal';
import LkuTooltip from './package/tooltip';
import LkuMessage from './package/message';
import LkuNotice from './package/notice';
import LkuEllipsisTooltip from './package/ellipsis-tooltip';
import {LkuTable, LkuTableColumn} from './package/table';
import LkuPagination from './package/pagination';
import {LkuDropdown, LkuDropdownMenu, LkuDropdownItem} from './package/dropdown';
import LkuTree from './package/tree';

const components = [LkuSelect, LkuOptionGroup, LkuOption, LkuMenu, LkuMenuGroup,
  LkuMenuItem, LkuCollapseTransition, LkuSwitch, LkuCheckbox, LkuCheckboxGroup,
  LkuRadio, LkuRadioGroup, LkuInput, LkuForm, LkuFormItem, LkuButton, LkuIcon,
  LkuDrawer, LkuModal, LkuTooltip, LkuMessage, LkuNotice, LkuEllipsisTooltip,
  LkuTable, LkuTableColumn, LkuPagination, LkuDropdown, LkuDropdownMenu, LkuDropdownItem,
  LkuTree];

const globalProperties = {$message: LkuMessage, $notice: LkuNotice};

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  })
  Vue.config.globalProperties = globalProperties;
}

// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue); // 判断如果引入了Vue，则注册组件
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
  LkuModal,
  LkuTooltip,
  LkuMessage,
  LkuNotice,
  LkuEllipsisTooltip,
  LkuTable, LkuTableColumn,
  LkuPagination,
  LkuDropdown, LkuDropdownMenu, LkuDropdownItem,
  LkuTree
}

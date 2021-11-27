import LkuDropdown from './src/dropdown';
import LkuDropdownMenu from './src/dropdown-menu';
import LkuDropdownItem from './src/dropdown-item';

[LkuDropdown, LkuDropdownMenu, LkuDropdownItem].forEach(component => {
  component.install = (Vue) => {
    Vue.component(component.name, component)
  }
})
export {
  LkuDropdown,
  LkuDropdownMenu,
  LkuDropdownItem
};

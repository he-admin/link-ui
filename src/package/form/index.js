import LkuForm from './src/form';
import LkuFormItem from './src/form-item';

[LkuForm, LkuFormItem].forEach(component => {
  component.install = function (Vue) {
    Vue.component(component.name, component);
  }
});

export {
  LkuForm,
  LkuFormItem
}


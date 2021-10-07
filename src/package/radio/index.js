import LkuRadio from './src/radio';
import LkuRadioGroup from './src/radio-group';

[LkuRadio, LkuRadioGroup].forEach(component => {
  component.install = function (Vue) {
    Vue.component(component.name, component)
  }
})

export {
  LkuRadio, LkuRadioGroup
}

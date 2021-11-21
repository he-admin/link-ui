import {h, render} from 'vue';
import LkuTips from './src/tip';


const init = (props = {}) => {
  const vNode = h(LkuTips,props)
  render(vNode, document.createElement('div'))
  document.body.appendChild(vNode.component.vnode.el);
  return vNode.component.setupState
}
LkuTips.init = init;

export default LkuTips;

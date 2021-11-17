import {createApp, h, render} from 'vue';
import LkuTips from './src/tip';

console.log(render);

const init = (props = {type: 'message', test: 1231}) => {
  const app = createApp({
    render() {
      return h(LkuTips, {...props})
    }
  })
  let messageDom = document.createDocumentFragment();
  // 把message组件挂载在空dom上，空dom会被解析成message的真实dom。
  app.mount(messageDom);
  document.body.appendChild(messageDom)
  return app.component;
  // const vNode = h(LkuTips, {type: 'message', test: 1231})
  // render(vNode, document.createElement('div'))
  //
  // document.body.appendChild(vNode.component.vnode.el);
  // console.log(vNode.component.vnode.el);

  // console.log(app.mount(document.body));
  // document.body.append(app.mount())
  // 表示当前Vue组件对象
  // return app.$children[0]
}
LkuTips.init = init;

export default LkuTips;

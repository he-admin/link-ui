import LkuTree from './src/tree';

LkuTree.install = (Vue) => {
  Vue.component(LkuTree.name, LkuTree)
}
export default LkuTree;
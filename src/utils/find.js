// 向下找到所有符合条件的子组件
const findComponentsDownward = (context, targetComponentName) => {
  const children = [...context.$children];
  const targetComponents = [];
  while (children.length) {
    const current = children.shift();
    if (current.$options.name === targetComponentName) {
      targetComponents.push(current);
    }
    if (current.$children.length) {
      children.push(...current.$children);
    }
  }
  return targetComponents;
};
export {
  findComponentsDownward
}

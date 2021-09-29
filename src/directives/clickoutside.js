export default {
  mounted (el, binding) {
    function documentHandler (e) {
      // el 包含其触发的元素 那当然不能触发啦
      if (el.contains(e.target)) {
        return false;
      }
      //	调用自定义指令传来的函数，e是事件原对象 作为参数（为什么传e 因为有些情况需要把这个对象抛出方便用户的操作）
      binding.value(e);
    }
    // 嗯？？？ 这么写有什么作用吗？ 当然有了，如果你想取消事件的监听，那么是不是需要这个函数。
    el.__vueClickOutside__ = documentHandler;
    // 在document上监听事件
    document.addEventListener('click', documentHandler);
  },
  unmounted (el, binding) {
    // 取消事件监听（el.__vueClickOutside 派上用场了吧）
    document.removeEventListener('click', el.__vueClickOutside__);
    // 既然都取消了 那么这个属性就没必要存在了
    delete el.__vueClickOutside__;
  }
};

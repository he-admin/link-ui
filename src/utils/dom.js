/**
 * @method hasClass
 * @description 判断dom中是否包含某个class
 * @param { NodeObject } dom
 * @param { String } className 需要判断的className
 * @returns { Boolean } 判定结果
 */
export function hasClass(dom, className) {
  if (!dom || !className) { // 如果dom或className两个参数为空处理
    return false;
  }
  if (dom.classList) {
    return dom.classList.contains(className);
  }
}

/**
 * @method addClass
 * @description 为某个dom元素添加className
 * @param { NodeObject } dom 需要添加className的dom
 * @param { String } classNames 需要添加的className,可以为多个参数
 */
export function addClass(dom, ...classNames) {
  if (!dom || !classNames) {
    return;
  }
  classNames.forEach(className => {
    dom.classList.add(className)
  })
}

/**
 * @method removeClass
 * @description 移除dom元素中className
 * @param { NodeObject } dom dom元素
 * @param { String } classNames 需要移除的className,可以为多个参数
 */
export function remove(dom, ...classNames) {
  if (!dom || !classNames) {
    return;
  }
  classNames.forEach(className => {
    dom.classList.remove(className)
  })
}

/**
 * @method setInlineStyle
 * @description 设置内联样式
 * @param { NodeObject } dom 需要设置样式的单个dom元素
 * @param { Object } styles 样式对象
 */
export function setInlineStyle(dom, styles = {}) {
  if (!dom) {
    return;
  }
  for (const key in styles) {
    // 这样操作更安全，因为传进来的styles对象可能没有原型方法
    if (Object.hasOwnProperty.call(styles, key)) {
      dom.style[key] = styles[key]
    }
  }
}

/**
 * @method getStyle
 * @description 根据dom元素获取一个样式对象
 * @param { Node } dom
 * @returns { Object }
 */
export function getStyle(dom) {
  if (dom.currentStyle) { // ie浏览器dom方法
    return dom.currentStyle;
  }
  return getComputedStyle(dom) // 非ie浏览，火狐、谷歌等
}

// 检测是否符合传的类型,checkType返回的是一个函数
const checkType = (type) => function (val) {
  const valueType = Object.prototype.toString.call(val).slice(8, -1);
  return valueType === type;
}

const isArray = checkType('Array');
const isFunction = checkType('Function');
export {
  isArray,
  isFunction
}

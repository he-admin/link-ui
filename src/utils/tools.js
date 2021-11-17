// 检测是否符合传的类型,checkType返回的是一个函数
const checkType = (type) => (val) => {
  const valueType = Object.prototype.toString.call(val).slice(8, -1);
  return valueType === type;
}

const isArray = checkType('Array');
const isFunction = checkType('Function');
const isObject = checkType('Object');
const isNumber = checkType('Number');
const isString = checkType('String');

// 处理传入的数字或者字符串百分比,考虑500  '500', '500px' '15%'的情况
const formatSize = (val) => {
  return isNaN(Number(val)) ? val : `${val}px`;
}

export {
  isArray,
  isFunction,
  isObject,
  formatSize
}

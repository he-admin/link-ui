// 检测是否符合传的类型,checkType返回的是一个函数
const checkType = (type) => function (val) {
  const valueType = Object.prototype.toString.call(val).slice(8, -1);
  return valueType === type;
}

const isArray = checkType('Array');
const isFunction = checkType('Function');
const isNumber = checkType('Number');
const isString = checkType('String');

// 处理传入的数字或者字符串百分比,考虑500  '500', '500px' '15%'的情况
const formatSize = (val) => {
  let value;
  if (isString(val)) {
    value = val.includes('%') ? val : isNumber(Number(val)) ? `${val}px` : val;
  } else {
    value = `${val}px`
  }
  return value;
}

export {
  isArray,
  isFunction,
  formatSize
}

import LkuTips from '../_tip';
import {isObject} from '@/utils/tools';

console.log(LkuTips.addTip);
// init方法是为了给message组件赋予props属性

import {getCurrentInstance} from 'vue';


const message = LkuTips.init({type: 'message', test: 12122});
console.log(message);
const createMessage = (type, config) => {
//config.uid = instance.uid;

  if (!isObject(config)) {
    config.title = config
  }
  const defaultConfig = {
    title: '',
    render: '',
    duration: 1500,
    closeable: false,
    onShow: () => {
    },
    onClose: () => {
    }
  }
  const currentMessage = message.addTip(type, Object.assign(defaultConfig, config));
  console.log(currentMessage);
  return currentMessage;
}

export default {
  name: 'LkuMessage',
  message(type, config) {
    return createMessage(type, config)
  },
  info(config) {
    return this.message('info', config)
  },
  success(config) {
    this.message('success', config)
  },
  error(config) {
    this.message('error', config)
  },
  warning(config) {
    this.message('warning', config)
  }
}

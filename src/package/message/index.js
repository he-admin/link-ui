import LkuTips from '../_tip';
import {isObject} from '@/utils/tools';

// init方法是为了给message组件赋予props属性
const message = LkuTips.init({type: 'message'});
const createMessage = (type, config) => {
  if (!isObject(config)) {
    config.title = config
  }
  const defaultConfig = {
    title: '',
    render: '',
    content: '',
    duration: 1500,
    closeable: false,
    onShow: () => {
    },
    onClose: () => {
    }
  }
  const currentMessage = message.addTip(type, Object.assign(defaultConfig, config));
  // 实现调用$message.xxx()时，返回当前实例，通过当前实例，调用close方法，关闭message
  const close = () => {
    message.removeTip(currentMessage)
  };
  return {close, ...currentMessage};
}

export default {
  name: 'LkuNotice',
  message(type, config) {
    return createMessage(type, config)
  },
  info(config) {
    return this.message('info', config)
  },
  success(config) {
    return this.message('success', config)
  },
  error(config) {
    return this.message('error', config)
  },
  warning(config) {
    return this.message('warning', config)
  }
}

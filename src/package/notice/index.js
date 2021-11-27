import LkuTips from '../_tip'
import {isObject} from '@/utils/tools';

// init方法是为了给message组件赋予props属性
const notice = LkuTips.init({type: 'notice'});
const createNotice = (type, config) => {
  if (!isObject(config)) {
    config.title = config
  }
  const defaultConfig = {
    title: '',
    render: '',
    duration: 2500,
    closeable: false,
    onShow: () => {
    },
    onClose: () => {
    }
  }
  const currentNotice = notice.addTip(type, Object.assign(defaultConfig, config));
  return currentNotice;
}

export default {
  name: 'LkuMessage',
  notice(type, config) {
    return createNotice(type, config)
  },
  info(config) {
    return this.notice('info', config)
  },
  success(config) {
    this.notice('success', config)
  },
  error(config) {
    this.notice('error', config)
  },
  warning(config) {
    this.notice('warning', config)
  }
}

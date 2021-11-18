import LkuTips from '../_tip';
import {isObject} from '@/utils/tools';

console.log(LkuTips.addTip);
// init方法是为了给message组件赋予props属性

import {getCurrentInstance} from 'vue';


const message = LkuTips.init({type: 'message', test: 12122});
console.log(message);
const createMessage = (type, config) => {
//config.uid = instance.uid;

 if(!isObject(config)){
   config.title = config
 }
  const defaultConfig = {
    title: '',
    render: '',
    duration: 1500000,
    closeable: false,
    onShow: () => {
    },
    onClose: () => {
    }
  }

  const currentMessage = message.addTip(type, Object.assign(defaultConfig, config));
  console.log(currentMessage);
}

export default {
  name: 'LkuMessage',
  message(type, config) {
    createMessage(type, config)
  },
  success(config) {
    this.message('success', config)
  },
  setup() {
    const instance = getCurrentInstance();
    console.log(instance);
  }
}

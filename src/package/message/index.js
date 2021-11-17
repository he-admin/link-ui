import LkuTips from '../_tip';
import {isObject} from '@/utils/tools';

// init方法是为了给message组件赋予props属性
const message = LkuTips.init({type: 'message', test: 12122})
console.log(message);
export default {
  name: 'LkuMessage'
}

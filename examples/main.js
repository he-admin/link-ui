import {createApp} from 'vue'
import App from './App.vue'
import LinkUI from '../src/index';
import './assets/styles/reset.less'; // doc样式初始化
import '../src/styles/index.less' // 组件的样式

let app = createApp(App);
app.use(LinkUI).mount('#app');

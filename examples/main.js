import {createApp} from 'vue'
import router from './router/routers'
import App from './App.vue'
import '../src/styles/index.less' // 组件库中的样式
import 'highlight.js/styles/github.css'; // 代码高亮的css
import './assets/styles/reset.less'; // doc样式初始化
import LinkUI from '../src/index';
import MarketUiExample from './components/mku-example.vue';
import DemoBlock from './components/demo-block'

import clickoutside from '../src/directives/clickoutside'

let app = createApp(App);
app.component('lku-example', MarketUiExample);
app.component('demo-block',MarketUiExample)
app.directive('clickoutside',clickoutside).use(router).use(LinkUI).mount('#app');

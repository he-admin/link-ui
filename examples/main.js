import {createApp} from 'vue'
import router from './router/routers'
import App from './App.vue'
import LinkUI from '../src/index';
import MarketUiExample from './components/mku-example.vue';
import DemoBlock from './components/demo-block'
import 'highlight.js/styles/color-brewer.css'; // 代码高亮的css
import './assets/styles/reset.less'; // doc样式初始化
import '../src/styles/index.less' // 组件的样式

import clickoutside from '../src/directives/clickoutside'

let app = createApp(App);
app.component('mku-example', MarketUiExample);
app.component('demo-block',DemoBlock)
app.directive('clickoutside',clickoutside).use(router).use(LinkUI).mount('#app');

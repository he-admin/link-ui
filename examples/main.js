import {createApp} from 'vue'
import App from './App.vue'

import './assets/styles/reset.less'; // doc样式初始化

let app = createApp(App);
console.log(app);

app.mount('#app');

import routes from './index'
import {createRouter, createWebHashHistory} from 'vue-router';
import {nextTick} from 'vue'
import hljs from 'highlight.js';

// Vue3路由使用方法
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.afterEach(() => {
  nextTick(() => Array.from(document.querySelectorAll('pre code')).forEach(hljs.highlightBlock));
})
export default router;

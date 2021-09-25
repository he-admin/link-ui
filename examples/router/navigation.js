export default [{
  code: 'navigation',
  name: '导航',
  children: [
    {
      path: '/component/menu',
      name: 'Menu',
      meta: {
        type: 'component',
        title: 'Menu菜单'
      },
      component: () => import('../docs/zh_CN/menu.md')
    },
    {
      path: '/component/tree',
      name: 'Tree',
      meta: {
        type: 'component',
        title: 'Tree菜单'
      },
      component: () => import('../docs/zh_CN/menu.md')
    },
    {
      path: '/component/form',
      name: 'Form',
      meta: {
        type: 'component',
        title: 'Form表单'
      },
      component: () => import('../docs/zh_CN/menu.md')
    },
    {
      path: '/component/button',
      name: 'Button',
      meta: {
        type: 'component',
        title: 'Button按钮'
      },
      component: () => import('../docs/zh_CN/menu.md')
    }
  ]
}]

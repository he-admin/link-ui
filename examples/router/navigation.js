export default [{
  code: 'navigation',
  name: '导航组件',
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
      path: '/component/drawer',
      name: 'Drawer',
      meta: {
        type: 'component',
        title: 'Drawer抽屉'
      },
      component: () => import('../docs/zh_CN/drawer.md')
    },
    {
      path: '/component/modal',
      name: 'Modal',
      meta: {
        type: 'component',
        title: 'Modal弹窗'
      },
      component: () => import('../docs/zh_CN/modal.md')
    },
    {
      path: '/component/button',
      name: 'Button',
      meta: {
        type: 'component',
        title: 'Button按钮'
      },
      component: () => import('../docs/zh_CN/button.md')
    },
    {
      path: '/component/dropdown',
      name: 'DropDown',
      meta: {
        type: 'component',
        title: 'Dropdown下拉菜单'
      },
      component: () => import('../docs/zh_CN/dropdown.md')
    }
  ]
}]

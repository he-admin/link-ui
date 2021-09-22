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
    }
  ]
}]
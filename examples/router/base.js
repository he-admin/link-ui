// routes of basic
export default [
  {
    code: 'basic',
    name: '基础组件',
    children: [
      {
        path: '/component/button',
        name: 'Button',
        meta: {
          type: 'component',
          title: 'Button 按钮',
        },
        component: () => import('../docs/zh_CN/menu.md')
      },
      {
        path: '/component/badge',
        name: 'Badge',
        meta: {
          type: 'component',
          title: 'Badge 徽章',
        },
        component: () => import('../docs/zh_CN/menu.md')
      },
      {
        path: '/component/grid',
        name: 'Grid',
        meta: {
          type: 'component',
          title: 'Grid 栅格',
        },
        component: () => import('../docs/zh_CN/menu.md')
      },
      {
        path: '/component/icon',
        name: 'Icon',
        meta: {
          type: 'component',
          title: 'Icon 图标',
        },
        component: () => import('../docs/zh_CN/menu.md')
      },
    ],
  },
];

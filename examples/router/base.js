// routes of basic
export default [
  {
    code: 'basic',
    name: '基础组件',
    children: [
      {
        path: '/component/checkbox',
        name: 'Checkbox',
        meta: {
          type: 'component',
          title: 'Checkbox复选框',
        },
        component: () => import('../docs/zh_CN/checkbox.md')
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
        path: '/component/switch',
        name: 'Switch',
        meta: {
          type: 'component',
          title: 'Switch开关',
        },
        component: () => import('../docs/zh_CN/switch.md')
      },
      {
        path: '/component/select',
        name: 'Select',
        meta: {
          type: 'component',
          title: 'Select选择',
        },
        component: () => import('../docs/zh_CN/select.md')
      }
    ],
  },
];

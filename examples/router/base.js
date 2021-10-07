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
        path: '/component/radio',
        name: 'Radio',
        meta: {
          type: 'component',
          title: 'Radio 单选',
        },
        component: () => import('../docs/zh_CN/radio.md')
      },
      {
        path: '/component/input',
        name: 'Input',
        meta: {
          type: 'component',
          title: 'Input 输入框',
        },
        component: () => import('../docs/zh_CN/input.md')
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

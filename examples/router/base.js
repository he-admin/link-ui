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
      },
      {
        path: '/component/form',
        name: 'Form',
        meta: {
          type: 'component',
          title: 'Form表单',
        },
        component: () => import('../docs/zh_CN/form.md')
      },
      {
        path: '/component/tooltip',
        name: 'ToolTip',
        meta: {
          type: 'component',
          title: 'Tooltip提示',
        },
        component: () => import('../docs/zh_CN/tooltip.md')
      }
    ],
  },
];

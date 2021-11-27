export default [{
  code: 'navigation',
  name: '提示',
  children: [
    {
      path: '/component/message',
      name: 'Message',
      meta: {
        type: 'component',
        title: 'Message消息提示'
      },
      component: () => import('../docs/zh_CN/message.md')
    },
    {
      path: '/component/notice',
      name: 'Notice',
      meta: {
        type: 'component',
        title: 'Notice消息提示'
      },
      component: () => import('../docs/zh_CN/notice.md')
    },
    {
      path: '/component/ellipsisTooltip',
      name: 'EllipsisTooltip',
      meta: {
        type: 'component',
        title: 'EllipsisTooltip超出显示'
      },
      component: () => import('../docs/zh_CN/ellipsis-tooltip.md')
    }
  ]
}]

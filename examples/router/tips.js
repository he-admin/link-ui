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
    }
  ]
}]

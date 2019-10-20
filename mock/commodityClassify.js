import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    kindName: 'kindName'
  }]
})

export default [
  {
    url: '/commodity/commodityClassify/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]

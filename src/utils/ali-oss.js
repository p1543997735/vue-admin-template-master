// const OSS = require('ali-oss')
//
// const client = new OSS({
//   region: 'oss-cn-hangzhou.aliyuncs.com',
//   accessKeyId: 'LTAIrucI0zt6hsPe',
//   accessKeySecret: 'tW3BmS6mZRobC1RgBqrcKVoqtwXiQe',
//   bucket: 'mango-snack-picture'
// })
// async function put() {
//   try {
//     const result = await client.put('123.jpg', 'D:\\123.jpg')
//     console.log(result)
//   } catch (e) {
//     console.log(e)
//   }
// }
//
// put()
const OSS = require('ali-oss')

export default function Client(data) { // 后端提供数据
  return new OSS({
    region: 'oss-cn-hangzhou.aliyuncs.com',
    accessKeyId: 'LTAIrucI0zt6hsPe',
    accessKeySecret: 'tW3BmS6mZRobC1RgBqrcKVoqtwXiQe',
    bucket: 'mango-snack-picture'
  })
}

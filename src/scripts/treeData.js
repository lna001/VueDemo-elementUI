const Mock = require('mockjs')// 获取mock对象
const Random = Mock.Random// 获取random对象，随机生成各种数据
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

// 随机生成treeData
const postData = req => {
  console.log(req) // 请求体，用于获取参数
  let posts = [] // 用于返回数据的数组
  for (let i = 0; i < 10; i++) {
    let post = {
      label: Random.csentence(10, 25), // 随机生成长度为10-25的标题
      children: [
        {
          label: Random.csentence(10, 25),
          children: [{
            label: Random.csentence(10, 25)
          }]

        }]
    }
    posts.push(post)
  }
  // 返回状态码和文章数据posts
  return {
    code,
    posts
  }
}
// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/treeposts`, 'get', postData)

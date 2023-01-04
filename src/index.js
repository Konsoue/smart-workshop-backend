const Koa = require('koa')
const router = require('./routers/index')
const NODE_ENVIRONMENT = process.env.NODE_ENV // development or production

const app = new Koa()

// 添加路由
app.use(router.routes()).use(router.allowedMethods({
  throw: true, // 抛出错误，代替设置响应头状态
  notImplemented: () => console.log('不支持当前请求所需要的功能'),
  methodNotAllowed: () => console.log('不支持的请求方式')
}))


app.on('error', error => {
  console.log(error)
})

app.listen(3000)
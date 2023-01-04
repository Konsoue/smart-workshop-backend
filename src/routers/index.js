const Router = require('koa-router')
const db = require('../db')


const router = new Router()

router.prefix('/api')

router.get('/good', async (ctx, next) => {
  ctx.body = 'good'
  next()
})


module.exports = router

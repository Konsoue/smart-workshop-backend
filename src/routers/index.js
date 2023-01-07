const Router = require('koa-router')
const db = require('../db')
const { Op } = require('sequelize')
const router = new Router({
  prefix: '/api'
})

const tableNames = Object.keys(db)

router
  .get('/getTableNames', async (ctx, next) => {
    ctx.body = tableNames
    console.log(ctx.request.ip)
    await next()
  })


router
  .get('/byTime/:tableName', async (ctx, next) => {
    const query = ctx.request.query
    const { tableName } = ctx.params
    let res = []
    if (tableNames.includes(tableName)) {
      res = await db[tableName].findAll({
        attributes: ['device', 'i', 'u', 'ts', 'pts'],
        where: {
          ts: {
            [Op.gt]: query.timeFrom,
            [Op.lt]: query.timeTo
          }
        }
      })
    }
    await next()
    ctx.body = res
  })
  .get('/byId/:tableName', async (ctx, next) => {
    const query = ctx.request.query
    const { tableName } = ctx.params
    let res = {}
    if (tableNames.includes(tableName)) {
      res = await db[tableName].findOne({
        attributes: ['device', 'i', 'u', 'ts', 'pts'],
        where: {
          _id: query.id
        }
      })
    }
    await next()
    ctx.body = res
  })

module.exports = router

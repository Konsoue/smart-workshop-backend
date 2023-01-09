const Router = require('koa-router')
const { db, sequelize } = require('../db')
const { Op } = require('sequelize')
const { Object2Enum } = require('../utils')
const { tableNamesMap } = require('../db/initialData')
const router = new Router({
  prefix: '/api'
})

const tableNamesEnum = Object2Enum(tableNamesMap)
const tableNames = Object.keys(tableNamesMap)


const getDevices = (() => {
  const devices = []
  for (const tableName of tableNames) {
    db[tableName].findAll({
      attributes: [sequelize.fn('DISTINCT', 'device'), 'device']
    })
      .then(res => {
        for (const tmp of res) {
          const device = tmp.dataValues.device
          devices.push(`${tableNamesEnum[tableName]}/${device}`)
        }
      })
      .catch(err => console.log(err))
  }
  return () => devices
})()


router
  .get('/getLockDevices', async (ctx, next) => {
    await next()
    ctx.body = getDevices()
  })

router
  .get('/getDataByTime', async (ctx, next) => {
    const query = ctx.request.query
    const { device, timeFrom, timeTo } = query
    let res = []
    const tableName = tableNamesEnum[device.split('/')[0]]
    const deviceOrder = device.split('/')[1]
    if (tableNames.includes(tableName)) {
      res = await db[tableName].findAll({
        attributes: ['device', 'i', 'u', 'ts', 'pts'],
        where: {
          device: {
            [Op.eq]: deviceOrder
          },
          ts: {
            [Op.gt]: new Date(timeFrom),
            [Op.lt]: new Date(timeTo)
          }
        }
      })
    }
    await next()
    ctx.body = res
  })

router
  .get('/getTableNames', async (ctx, next) => {
    await next()
    ctx.body = tableNames
  })

router
  .get('/getDevices', async (ctx, next) => {
    const query = ctx.request.query
    const { tableName } = query
    let res = []
    if (tableNames.includes(tableName)) {
      res = await db[tableName].findAll({
        attributes: [sequelize.fn('DISTINCT', 'device'), 'device'],
      })
    }
    await next()
    ctx.body = res
  })

router
  .get('/byTime', async (ctx, next) => {
    const query = ctx.request.query
    const { tableName, device, timeFrom, timeTo } = query
    let res = []
    if (tableNames.includes(tableName)) {
      res = await db[tableName].findAll({
        attributes: ['device', 'i', 'u', 'ts', 'pts'],
        where: {
          device: {
            [Op.eq]: device
          },
          ts: {
            [Op.gt]: timeFrom,
            [Op.lt]: timeTo
          }
        }
      })
    }
    await next()
    ctx.body = res
  })
  .get('/byId', async (ctx, next) => {
    const query = ctx.request.query
    const { tableName, id } = query
    let res = {}
    if (tableNames.includes(tableName)) {
      res = await db[tableName].findOne({
        attributes: ['device', 'i', 'u', 'ts', 'pts'],
        where: {
          _id: id
        }
      })
    }
    await next()
    ctx.body = res
  })

module.exports = router

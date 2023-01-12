const Router = require('koa-router')
const { db, sequelize } = require('../db')
const { Op } = require('sequelize')
const { Object2Enum } = require('../utils')
const { tableNamesMap, threeStateTableNamesMap } = require('../db/initialData')
const router = new Router({
  prefix: '/api'
})

const tableNamesEnum = Object2Enum(tableNamesMap)
const tableNames = Object.keys(tableNamesMap)
const threeStateTableNameEnum = Object2Enum(threeStateTableNamesMap)
const threeStateTableNames = Object.keys(threeStateTableNamesMap)

const lazyDeivces = ['018-34', '018-49', '034-389', '125-61', '125-67']
/**
 * 获取所有类型设备
 */
const getDevices = (() => {
  const devices = []
  for (const tableName of tableNames) {
    db[tableName].findAll({
      attributes: [sequelize.fn('DISTINCT', 'device'), 'device'],
    })
      .then(res => {
        for (const tmp of res) {
          const device = tmp.dataValues.device
          if (lazyDeivces.includes(device)) devices.push(`${tableNamesEnum[tableName]}/${device}`)
        }
      })
      .catch(err => console.log(err))
  }
  return () => devices
})()

const handleTimeFromFE = (time) => {
  const tmpTime = new Date(time)
  const date = new Date(tmpTime.getFullYear(), tmpTime.getMonth(), tmpTime.getDate(), tmpTime.getHours() + 8, tmpTime.getMinutes(), tmpTime.getSeconds())
  return date
}


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
            [Op.gt]: handleTimeFromFE(timeFrom),
            [Op.lt]: handleTimeFromFE(timeTo)
          }
        }
      })
    }
    await next()
    ctx.body = res
  })


router
  .get('/getStateByTime', async (ctx, next) => {
    const query = ctx.request.query
    const { device, timeFrom, timeTo } = query
    let res = []
    const tableName = threeStateTableNameEnum[device.split('/')[0]]
    const deviceOrder = device.split('/')[1]
    if (threeStateTableNames.includes(tableName)) {
      res = await db[tableName].findAll({
        attributes: ['device', ['state_dtw', 'state'], 'date', ['num_work', 'numWork']],
        where: {
          device: {
            [Op.eq]: deviceOrder
          },
          date: {
            [Op.gt]: handleTimeFromFE(timeFrom),
            [Op.lt]: handleTimeFromFE(timeTo)
          }
        }
      })
    }
    await next()
    ctx.body = res
  })

module.exports = router

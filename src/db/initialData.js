const fs = require('fs')
const path = require('path')
const { db } = require('./index')

const sendCSVToDB = async (filePath, table) => {
  const source = fs.readFileSync(filePath, { encoding: 'utf-8' }).replace('\r', '').split('\n')
  const fileName = filePath.split('/').pop()

  const title = source.shift().split(',')
  for (let i = 0; i < source.length; i++) {
    const content = source[i].split(',')
    if (content.length !== 1) {
      const temp = {
        device: fileName.split('_')[0].split('.')[2]
      }
      for (let j = 0; j < content.length; j++) {
        temp[title[j]] = content[j]
      }
      await db[table].create(temp)
    }
  }
}

const sendThreeStateCSVToDB = async (filePath, table) => {
  const source = fs.readFileSync(filePath, { encoding: 'utf-8' }).replace('\r', '').split('\n')
  const fileName = filePath.split('/').pop()
  let state = undefined
  const title = source.shift().split(',')
  for (let i = 0; i < source.length; i++) {
    const content = source[i].split(',')
    if (content.length !== 1) {
      if (state !== content[0]) {
        state = content[0]
        const temp = {
          device: fileName.split('_')[0].split('.')[2],
          state_dtw: state
        }
        const tmpDate = `${content[1].replace(/\//g, '-')} ${content[2]}`
        const time = new Date(tmpDate)
        const date = new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours() + 8, time.getMinutes(), time.getSeconds())
        temp.date = date
        temp.num_work = content[5]
        await db[table].create(temp)
      }
    }
  }
}

const readFiles = async (zhCN, tableName) => {
  const dirName = 'three_state_time'
  const dirPath = path.join(process.cwd(), dirName, zhCN)
  const files = fs.readdirSync(dirPath)
  console.log(tableName, ' start')
  for (let csv of files) {
    await sendCSVToDB(path.join(dirPath, csv), tableName)
  }
  console.log(tableName, ' success')
}

const tableNamesMap = {
  Stamp: '冲压',
  CutFace: '切磨端面',
  Heat: '加热',
  SemiFineCone: '半精锥面',
  FrictionWeld: '摩擦焊',
  PolishStem: '杆部抛光',
  GrindLockSlot: '磨锁夹槽'
}

const threeStateTableNamesMap = {
  CutFace_state: '切磨端面',
  GrindLockSlot_state: '磨锁夹槽',
  FrictionWeld_state: '摩擦焊',
  Heat_state: '加热',
  PolishStem_state: '杆部抛光',
  Stamp_state: '冲压',
  SemiFineCone_state: '半精锥面'
}

const initialData = async (tableNamesMap) => {
  for (let [tableName, zhCN] of Object.entries(tableNamesMap)) await readFiles(zhCN, tableName)
}


module.exports = {
  tableNamesMap,
  threeStateTableNamesMap
}
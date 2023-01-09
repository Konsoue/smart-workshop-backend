const fs = require('fs')
const path = require('path')
const db = require('./index')

const sendCSVToDB = async (filePath, table) => {
  const source = fs.readFileSync(filePath, { encoding: 'utf-8' }).split('\n')
  const title = source.shift().split(',')
  for (let i = 0; i < source.length; i++) {
    const content = source[i].split(',')
    if (content.length !== 1) {
      const temp = {
        device: filePath.split('_')[0].split('.')[2]
      }
      for (let j = 0; j < content.length; j++) {
        temp[title[j]] = content[j]
      }
      await db[table].create(temp)
    }
  }
}

const readFiles = async (zhCN, tableName) => {
  const dirPath = path.join(process.cwd(), 'data221204', zhCN)
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

const initialData = async () => {
  for (let [tableName, zhCN] of Object.entries(tableNamesMap)) await readFiles(zhCN, tableName)
}

module.exports = {
  tableNamesMap,
  initialData,
}
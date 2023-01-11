const EnvConfig = require('../env/config')
const { Sequelize } = require('sequelize')
const CutFaceConfig = require('./CutFace');
const { commonConfig, threeStateConfig } = require('./common');
const sequelize = new Sequelize(EnvConfig.dbName, EnvConfig.dbUser, EnvConfig.dbPWD, {
  host: EnvConfig.dbHost,
  port: EnvConfig.dbPort,
  dialect: 'mysql', /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  dialectOptions: {
    timezone: '+08:00'
  },
  logging: false
})


// 测试数据库是否连接成功
async function testMysqlConnect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testMysqlConnect()

const modelsConfig = {
  CutFace: CutFaceConfig,
  GrindLockSlot: commonConfig,
  FrictionWeld: commonConfig,
  Heat: commonConfig,
  PolishStem: commonConfig,
  Stamp: commonConfig,
  SemiFineCone: commonConfig
}

const threeStateModelsConfig = {
  CutFace_state: threeStateConfig,
  GrindLockSlot_state: threeStateConfig,
  FrictionWeld_state: threeStateConfig,
  Heat_state: threeStateConfig,
  PolishStem_state: threeStateConfig,
  Stamp_state: threeStateConfig,
  SemiFineCone_state: threeStateConfig
}

const createModels = (modelsConfigArray = [], createTable = false) => {
  let modelsConfig = {}
  if (modelsConfigArray.length > 1) {
    for (const config of modelsConfigArray) {
      for (const [key, val] of Object.entries(config)) {
        modelsConfig[key] = val
      }
    }
  } else {
    modelsConfig = modelsConfigArray[0] || modelsConfig
  }
  const models = {}
  for (let [key, val] of Object.entries(modelsConfig)) {
    models[key] = sequelize.define(key, val)
    if (createTable) models[key].sync({ force: EnvConfig.DEV })
  }
  return models
}

module.exports = {
  db: createModels([modelsConfig, threeStateModelsConfig]),
  sequelize
}
const EnvConfig = require('../env/config')
const { Sequelize } = require('sequelize')
const CutFaceConfig = require('./CutFace');
const commonConfig = require('./common');
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

const createModels = (modelsConfig) => {
  const models = {}
  for (let [key, val] of Object.entries(modelsConfig)) {
    models[key] = sequelize.define(key, val)
    // models[key].sync({ force: EnvConfig.DEV })
  }
  return models
}


module.exports = createModels(modelsConfig)
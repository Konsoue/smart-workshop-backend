const EnvConfig = require('../env/config')
const { Sequelize } = require('sequelize')
const CutFaceConfig = require('./CutFace')


const sequelize = new Sequelize(EnvConfig.dbName, EnvConfig.dbUser, EnvConfig.dbPWD, {
  host: EnvConfig.dbHost,
  port: EnvConfig.dbPort,
  dialect: 'mysql' /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
})

const CutFace = sequelize.define('CutFace', CutFaceConfig)

async function testMysqlConnect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testMysqlConnect()

module.exports = sequelize
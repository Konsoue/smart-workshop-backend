const { DataTypes } = require('sequelize')

const commonConfig = {
  _class: {
    type: DataTypes.STRING,
    allowNull: false
  },
  _id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addr: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  err: {
    type: DataTypes.BLOB,
    allowNull: false
  },
  f: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  i: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  imei: {
    type: DataTypes.STRING,
    allowNull: false
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  p: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pe: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  pf: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  pts: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ts: {
    type: DataTypes.DATE,
    allowNull: false
  },
  u: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}

module.exports = commonConfig
const { DataTypes } = require('sequelize')

const commonConfig = {
  device: {
    type: DataTypes.STRING,
    allowNull: false
  },
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
    type: DataTypes.DOUBLE,
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

const threeStateConfig = {
  device: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state_dtw: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  num_work: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}

module.exports = {
  commonConfig,
  threeStateConfig
}
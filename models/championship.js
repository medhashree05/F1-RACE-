const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Championship = sequelize.define('Championship', {
  driver_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  driver_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  chassis:{
    type:DataTypes.STRING(50),
    allowNull:false
  },
  world_championships:{
    type:DataTypes.INTEGER,
    defaultValue:0
  },
  pole_positions: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  podiums: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  total_points: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'championship',
  timestamps: false
});

module.exports = Championship;
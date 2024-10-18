const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Track = sequelize.define('Track', {
  track_id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false
  },
  track: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  region: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  practice_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  qualifying_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  race_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'track',
  timestamps: false
});

module.exports = Track;

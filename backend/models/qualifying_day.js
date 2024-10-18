const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const QualifyingDay = sequelize.define('QualifyingDay', {
  grid_position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'FinalPractice',
      key: 'finishing_position'
    }
  },
  track_id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    references: {
      model: 'Track',
      key: 'track_id'
    }
  },
  driver_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  team_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  chassis: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  lap_time: {
    type: DataTypes.TIME(3),
    allowNull: false
  },
  gap: {
    type: DataTypes.TIME(3),
    allowNull: true
  },
  quali_finishing_position: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  tableName: 'qualifying_day',
  timestamps: false
});

// Associations

module.exports = QualifyingDay;

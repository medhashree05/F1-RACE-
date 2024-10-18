const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const RaceDay = sequelize.define('RaceDay', {
    starting_grid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey:true,
    references: {
      model: 'QualifyingDay',
      key: 'quali_finishing_position'
    }
  },
  track_id: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey:true,
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
  number_of_laps: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lap_time: {
    type: DataTypes.TIME(3),
    allowNull: false
  },
  gap: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  pit_stop: {
    type: DataTypes.STRING(5),
    allowNull: true
  },
  race_finishing_position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
    
  
   
}, {
  tableName: 'race_day',
  timestamps: false
});

// Associations


module.exports = RaceDay;

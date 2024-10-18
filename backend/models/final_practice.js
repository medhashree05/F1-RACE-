const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const FinalPractice = sequelize.define('FinalPractice', {
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
  finishing_position: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  tableName: 'final_practice',
  timestamps: false
});

// Associations



module.exports = FinalPractice;

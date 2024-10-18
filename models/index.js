// models/index.js
const sequelize = require('../config/database');
const Track = require('./track');
const FinalPractice = require('./final_practice');
const QualifyingDay = require('./qualifying_day');
const RaceDay = require('./race_day');

// Define Associations

// Track Associations
Track.hasMany(FinalPractice, { foreignKey: 'track_id' });
FinalPractice.belongsTo(Track, { foreignKey: 'track_id' });

Track.hasMany(QualifyingDay, { foreignKey: 'track_id' });
QualifyingDay.belongsTo(Track, { foreignKey: 'track_id' });

Track.hasMany(RaceDay, { foreignKey: 'track_id' });
RaceDay.belongsTo(Track, { foreignKey: 'track_id' });

// FinalPractice Associations
FinalPractice.hasMany(QualifyingDay, { foreignKey: 'grid_position', sourceKey: 'finishing_position' });
QualifyingDay.belongsTo(FinalPractice, { foreignKey: 'grid_position', targetKey: 'finishing_position' });

// QualifyingDay Associations
QualifyingDay.hasOne(RaceDay, { foreignKey: 'starting_grid', sourceKey: 'quali_finishing_position' });
RaceDay.belongsTo(QualifyingDay, { foreignKey: 'starting_grid', targetKey: 'quali_finishing_position' });

// Optional: Define any additional associations as needed

module.exports = {
  sequelize,
  Track,
  FinalPractice,
  QualifyingDay,
  RaceDay
};

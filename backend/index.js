// sql/index.js
const express = require('express');
const { sequelize } = require('./models'); // Import sequelize from models
require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser');

// Import Models
const Championship = require('./models/championship');
const FinalPractice = require('./models/final_practice');
const QualifyingDay = require('./models/qualifying_day');
const RaceDay = require('./models/race_day');
const Track = require('./models/track'); // If created

// Import Routes
const championshipRoutes = require('./routes/championship');
const finalPracticeRoutes = require('./routes/final_practice');
const qualifyingDayRoutes = require('./routes/qualifying_day');
const raceDayRoutes = require('./routes/race_day');
const trackRoutes = require('./routes/track'); // If created

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/championship', championshipRoutes);
app.use('/api/final_practice', finalPracticeRoutes);
app.use('/api/qualifying_day', qualifyingDayRoutes);
app.use('/api/race_day', raceDayRoutes);
app.use('/api/tracks', trackRoutes); // If created

// Test Database Connection and Sync Models
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync(); // { force: true } to drop and recreate tables
  })
  .then(() => {
    console.log('Models synchronized');
    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

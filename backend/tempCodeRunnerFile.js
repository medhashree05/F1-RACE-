// sql/index.js
const express = require('express');
require('dotenv').config();

const { sequelize } = require('./models');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Import Routes
const championshipRoutes = require('./routes/championship');
const finalPracticeRoutes = require('./routes/final_practice');
const qualifyingDayRoutes = require('./routes/qualifying_day');
const raceDayRoutes = require('./routes/race_day');
const trackRoutes = require('./routes/track'); // If created

const app = express();

// Middleware
app.use(morgan('combined')); // Logging
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the F1 API!'); // Response for the root URL
});
app.post('/api/qualifying_day', (req, res) => {
  try {
      // Check if the request body is empty or malformed
      if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).send('Bad Request: Body is missing or empty');
      }

      // Process the valid JSON request
      const data = req.body; // Your JSON data will be here
      console.log('Received data:', data);

      // Simulate processing the data and sending a response
      res.status(200).json({ message: 'Qualifying day data received successfully', data });

  } catch (error) {
      // Catch any other errors
      console.error('Error processing request:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Routes
app.use('/api/championship', championshipRoutes);
app.use('/api/final_practice', finalPracticeRoutes);
app.use('/api/qualifying_day', qualifyingDayRoutes);
app.use('/api/race_day', raceDayRoutes);
app.use('/api/tracks', trackRoutes); // If created

// Function to initialize the server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    await sequelize.sync(); // { force: true } to drop and recreate tables
    console.log('Models synchronized');

    // Start the server
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Handle server errors
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
        process.exit(1); // Exit the process with failure
      } else {
        console.error('Server error:', err);
      }
    });

  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit the process with failure
  }
};

// Initialize the server
startServer();

const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const Championship = require('../models/championship');
const sequelize = require('../config/database');

// GET all championship records
router.get('/', async (req, res) => {
  try {
    const championships = await Championship.findAll({
      order: [['total_points','DESC']],
    });
    
    res.json(championships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//top 3 drivers
router.get('/top-3-drivers', async (req, res) => {
  try {
    // Find the top 3 drivers with the maximum points
    const topDrivers = await Championship.findAll({
      order: [['total_points', 'DESC']], // Order by points in descending order
      limit: 3 // Limit the result to the top 3
    });

    // If no drivers found, return a 404 error
    if (topDrivers.length === 0) {
      return res.status(404).json({ message: "No drivers found" });
    }

    // Return the top 3 drivers as JSON
    return res.json(topDrivers);
    
  } catch (error) {
    // If an error occurs, return a 500 status code with the error message
    return res.status(500).json({ error: error.message });
  }
});

//top 3 constructors
router.get('/top-3-constructors', async (req, res) => {
  try {
    // Find the top 3 chassis by summing total_points and grouping by chassis
    const topConstructors = await Championship.findAll({
      attributes: [
        'chassis', // Select chassis name
        [Sequelize.fn('SUM', Sequelize.col('total_points')), 'total_points'] // Sum the points for each chassis
      ],
      group: ['chassis'], // Group by chassis
      order: [[Sequelize.literal('total_points'), 'DESC']], // Order by total points in descending order
       // Limit to top 3 constructors
    });

    // If no constructors found, return a 404 error
    if (topConstructors.length === 0) {
      return res.status(404).json({ message: "No constructors found" });
    }

    // Return the top 3 constructors as JSON
    return res.json(topConstructors);
    
  } catch (error) {
    // If an error occurs, return a 500 status code with the error message
    return res.status(500).json({ error: error.message });
  }
});

/// GET a specific championship record by driver_name
router.get('/:driver_name', async (req, res) => {
  // Normalize the input driver name
  const driverName = req.params.driver_name.toLowerCase().replace(/\s+/g, '');

  if (!driverName) {
    return res.status(400).json({ error: 'Driver name is required' });
  }

  try {
    // Fetch the championship record from the database
    const championshipRecord = await Championship.findAll({
      where: {
        // Normalize the database entries using Sequelize functions
        [Sequelize.Op.and]: [
          sequelize.where(sequelize.fn('LOWER', sequelize.fn('REPLACE', sequelize.col('driver_name'), ' ', '')), driverName)
        ]
      }
    });

    if (championshipRecord.length > 0) {
      res.json(championshipRecord); // Return the found championship record(s)
    } else {
      res.status(404).json({ error: 'Championship record not found' });
    }
  } catch (err) {
    console.error('Error querying the database:', err);
    res.status(500).json({ error: 'Database error' });
  }
});



// POST a new championship record
router.post('/', async (req, res) => {
  try {
    const newChampionship = await Championship.create(req.body);
    res.status(201).json(newChampionship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a championship record
router.put('/:driver_id', async (req, res) => {
  try {
    const [updated] = await Championship.update(req.body, {
      where: { driver_id: req.params.driver_id }
    });
    if (updated) {
      const updatedChampionship = await Championship.findByPk(req.params.driver_id);
      res.json(updatedChampionship);
    } else {
      res.status(404).json({ error: 'Driver not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a championship record
router.delete('/:driver_id', async (req, res) => {
  try {
    const deleted = await Championship.destroy({
      where: { driver_id: req.params.driver_id }
    });
    if (deleted) {
      res.json({ message: 'Driver deleted' });
    } else {
      res.status(404).json({ error: 'Driver not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const RaceDay = require('../models/race_day');
const Championship = require('../models/championship');

async function updateRacePoints(driver_name, newRacePoints) {
  try {
    // Fetch the driver's current total points
    const driver = await Championship.findOne({ where: { driver_name } });

    if (driver) {
      // Calculate updated total points
      const updatedPoints = driver.total_points + newRacePoints;

      // Update total points
      await Championship.update(
        { total_points: updatedPoints },
        { where: { driver_name } }
      );

      console.log(`Updated total points for driver ${driver.driver_name} to ${updatedPoints}`);
      return { message: `Driver ${driver.driver_name}'s points updated to ${updatedPoints}` };
    } else {
      return { error: 'Driver not found' };
    }
  } catch (error) {
    console.error('Error updating race points:', error);
    return { error: 'Update failed' };
  }
}

module.exports = { updateRacePoints };

// GET all race day records
router.get('/', async (req, res) => {
  try {
    const raceDays = await RaceDay.findAll();
    res.json(raceDays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:track_id/:starting_grid', async (req, res) => {
  try {
    const raceDay = await RaceDay.findOne({
      where:{
        track_id: req.params.track_id,
        starting_grid: req.params.starting_grid
      }
    });
    if (raceDay) {
      res.json(raceDay);
    } else {
      res.status(404).json({ error: 'Race Day record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new race day record
router.post('/', async (req, res) => {
  try {
    const newRaceDay = await RaceDay.create(req.body);
    const { driver_name, points } = newRaceDay;
    const result = await updateRacePoints(driver_name, points);
    res.status(201).json(newRaceDay);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a race day record
// PUT update a race day record
router.put('/:track_id/:starting_grid', async (req, res) => {
  try {
    const [updated] = await RaceDay.update(req.body, {
      where: {  
        track_id: req.params.track_id,
        starting_grid: req.params.starting_grid
      }
    });
    if (updated) {
      const updatedRaceDay = await RaceDay.findOne({
        where:{
          track_id: req.params.track_id,
          starting_grid: req.params.starting_grid
        }
      });
      res.json(updatedRaceDay);
    } else {
      res.status(404).json({ error: 'Race Day record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a race day record
router.delete('/:track_id/:starting_grid', async (req, res) => {
  try {
    const deleted = await RaceDay.destroy({
      where: { 
        track_id: req.params.track_id,
        starting_grid: req.params.starting_grid
      }
    });
    if (deleted) {
      res.json({ message: 'Race Day record deleted' });
    } else {
      res.status(404).json({ error: 'Race Day record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

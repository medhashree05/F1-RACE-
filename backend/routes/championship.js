const express = require('express');
const router = express.Router();
const Championship = require('../models/championship');

// GET all championship records
router.get('/', async (req, res) => {
  try {
    const championships = await Championship.findAll();
    res.json(championships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a specific championship record by driver_id
router.get('/:driver_id', async (req, res) => {
  try {
    const championship = await Championship.findByPk(req.params.driver_id);
    if (championship) {
      res.json(championship);
    } else {
      res.status(404).json({ error: 'Driver not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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

const express = require('express');
const router = express.Router();
const FinalPractice = require('../models/final_practice');

// GET all final practice records
router.get('/', async (req, res) => {
  try {
    const practices = await FinalPractice.findAll();
    res.json(practices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a specific final practice record by track_id and finishing_position
router.get('/:track_id/:finishing_position', async (req, res) => {
  try {
    const practice = await FinalPractice.findOne({
      where: {
        track_id: req.params.track_id,
        finishing_position: req.params.finishing_position
      }
    });
    if (practice) {
      res.json(practice);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new final practice record
router.post('/', async (req, res) => {
  try {
    const newPractice = await FinalPractice.create(req.body);
    res.status(201).json(newPractice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a final practice record
router.put('/:track_id/:finishing_position', async (req, res) => {
  try {
    const [updated] = await FinalPractice.update(req.body, {
      where: {
        track_id: req.params.track_id,
        finishing_position: req.params.finishing_position
      }
    });
    if (updated) {
      const updatedPractice = await FinalPractice.findOne({
        where: {
          track_id: req.params.track_id,
          finishing_position: req.params.finishing_position
        }
      });
      res.json(updatedPractice);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a final practice record
router.delete('/:track_id/:finishing_position', async (req, res) => {
  try {
    const deleted = await FinalPractice.destroy({
      where: {
        track_id: req.params.track_id,
        finishing_position: req.params.finishing_position
      }
    });
    if (deleted) {
      res.json({ message: 'Record deleted' });
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

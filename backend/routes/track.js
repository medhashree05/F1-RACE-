const express = require('express');
const router = express.Router();
const Track = require('../models/track');

// GET all tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a specific track by track_id
router.get('/:track_id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.track_id);
    if (track) {
      res.json(track);
    } else {
      res.status(404).json({ error: 'Track not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new track
router.post('/', async (req, res) => {
  try {
    const newTrack = await Track.create(req.body);
    res.status(201).json(newTrack);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a track
router.put('/:track_id', async (req, res) => {
  try {
    const [updated] = await Track.update(req.body, {
      where: { track_id: req.params.track_id }
    });
    if (updated) {
      const updatedTrack = await Track.findByPk(req.params.track_id);
      res.json(updatedTrack);
    } else {
      res.status(404).json({ error: 'Track not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a track
router.delete('/:track_id', async (req, res) => {
  try {
    const deleted = await Track.destroy({
      where: { track_id: req.params.track_id }
    });
    if (deleted) {
      res.json({ message: 'Track deleted' });
    } else {
      res.status(404).json({ error: 'Track not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

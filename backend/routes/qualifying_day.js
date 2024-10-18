const express = require('express');
const axios = require('axios');
const router = express.Router();
const QualifyingDay = require('../models/qualifying_day');

const Finalpractice = require('../models/final_practice');

// Function to format milliseconds to hh:mm:ss.sss
function formatTimeToHHMMSS(milliseconds) {
  const hours = Math.floor(milliseconds / 3600000); // 1 hour = 3600000 ms
  const minutes = Math.floor((milliseconds % 3600000) / 60000); // 1 minute = 60000 ms
  const seconds = Math.floor((milliseconds % 60000) / 1000); // 1 second = 1000 ms
  const ms = milliseconds % 1000; // Remaining milliseconds

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

// Helper function to convert lap time string (e.g., "1:29.374") to milliseconds
function parseLapTimeToMilliseconds(lapTimeStr) {
  // Check if the lap time is valid before parsing
  if (!lapTimeStr || !lapTimeStr.includes(':')) {
    console.error('Invalid lap time format:', lapTimeStr);
    return null; // Handle error
  }

  // Split into minutes and seconds
  const [minutesStr, secondsMsStr] = lapTimeStr.split(':');
  const [secondsStr, millisecondsStr] = secondsMsStr.split('.');

  const minutes = parseInt(minutesStr, 10) || 0;
  const seconds = parseInt(secondsStr, 10) || 0;
  const milliseconds = parseInt(millisecondsStr.padEnd(3, '0'), 10) || 0;

  return (minutes * 60000) + (seconds * 1000) + milliseconds;
}



// GET all qualifying day records
router.get('/', async (req, res) => {
  try {
    const qualifyingDays = await QualifyingDay.findAll();
    res.json(qualifyingDays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a specific qualifying day record by track_id and quali_finishing_position
router.get('/:track_id/:quali_finishing_position', async (req, res) => {
  try {
    const qualifying = await QualifyingDay.findOne({
      where: {
        track_id: req.params.track_id,
        quali_finishing_position: req.params.quali_finishing_position
      }
    });
    if (qualifying) {
      res.json(qualifying);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new qualifying day record
router.post('/', async (req, res) => {
  try {
    const newQualifying = await QualifyingDay.create(req.body);
    res.status(201).json("Successfully created");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/fetch/:season/:round/qualifying', async (req, res) => {
  const { season, round } = req.params;
  try {
    const response = await axios.get(`http://ergast.com/api/f1/${season}/${round}/qualifying.json`);
    console.log('Fetched Qualifying Results:', response.data);

    if (!response.data || !response.data.MRData.RaceTable.Races.length) {
      return res.status(404).json({ error: "No qualifying results found." });
    }

    console.log('Fetching data for season:', season, 'and round:', round);
    
    const qualifyingResults = response.data.MRData.RaceTable.Races[0].QualifyingResults;
    console.log('Full API Response:', response.data);

    // Find the driver with the highest Q1 time
    let firstPlaceResult = null; // Initialize a variable to store the highest Q1 time
    let fastestQ1Time = Infinity; // Start with an infinitely high time

    // Loop through the qualifyingResults array
    for (let i = 0; i < qualifyingResults.length; i++) {
      const q1TimeStr = qualifyingResults[i].Q1; // Get Q1 time string
      const q1TimeMs = parseLapTimeToMilliseconds(q1TimeStr); // Convert it to milliseconds
      
      // Check if this Q1 time is faster than the current fastest
      if (q1TimeMs < fastestQ1Time) {
        fastestQ1Time = q1TimeMs; // Update the fastest Q1 time
        firstPlaceResult = q1TimeStr; // Store the corresponding Q1 time string
      }
    }

    const firstPlaceQ3TimeStr = firstPlaceResult; // Q1 time of the fastest driver
    const firstPlaceQ3TimeMs = parseLapTimeToMilliseconds(firstPlaceQ3TimeStr);
    const firstPlaceQ3Time = formatTimeToHHMMSS(firstPlaceQ3TimeMs);

    console.log(`Highest lap: ${firstPlaceResult}`);

    // Initialize array to store qualifying details
    const qualifying_details = [];

    // Iterate through all qualifying results
    for (const result of qualifyingResults) {
      const track_id = `t${round}`;
      const driver_name = `${result.Driver.givenName} ${result.Driver.familyName}`;

      // Find practice record for the driver on this track
      const practiceRecord = await Finalpractice.findOne({ 
        where: { 
          driver_name,
          track_id 
        }
      });

      const grid_position = practiceRecord ? practiceRecord.finishing_position : null;
      const chassis = practiceRecord ? practiceRecord.chassis : null;
      const team_name = practiceRecord ? practiceRecord.team_name : null;
      const lapTimeStr = result.Q1; // Best lap time from Q1
      const lapTimeMs = lapTimeStr ? parseLapTimeToMilliseconds(lapTimeStr) : null;

      // Format lap time and calculate gap
      const formattedLapTime = lapTimeMs ? formatTimeToHHMMSS(lapTimeMs) : null;
      const gapMs = firstPlaceQ3Time ? (lapTimeMs - firstPlaceQ3TimeMs) : null;
      const formattedGap = gapMs ? formatTimeToHHMMSS(gapMs) : null;

      const quali_finishing_position = result.position;

      console.log(`Driver: ${driver_name}, Grid Position: ${grid_position}, Team: ${team_name}, Chassis: ${chassis}, Lap Time: ${lapTimeStr}, Qualifying Position: ${quali_finishing_position}`);

      // Prepare the record for bulk insertion
      qualifying_details.push({
        grid_position,
        track_id,
        driver_name,
        team_name,
        chassis,
        lap_time: formattedLapTime,
        gap: formattedGap,
        quali_finishing_position: quali_finishing_position
      });
    }

    // Bulk create all qualifying records
    await QualifyingDay.bulkCreate(qualifying_details);
    res.status(200).json({ message: 'Qualifying data successfully stored' });

  } catch (error) {
    console.error('Error fetching or storing data:', error);
    res.status(500).json({ error: 'Failed to fetch and store qualifying data.' });
  }
});



// PUT update a qualifying day record
router.put('/:track_id/:quali_finishing_position', async (req, res) => {
  try {
    const [updated] = await QualifyingDay.update(req.body, {
      where: {
        track_id: req.params.track_id,
        quali_finishing_position: req.params.quali_finishing_position
      }
    });
    if (updated) {
      const updatedQualifying = await QualifyingDay.findOne({
        where: {
          track_id: req.params.track_id,
          quali_finishing_position: req.params.quali_finishing_position
        }
      });
      res.json(updatedQualifying);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a qualifying day record
router.delete('/:track_id/:quali_finishing_position', async (req, res) => {
  try {
    const deleted = await QualifyingDay.destroy({
      where: {
        track_id: req.params.track_id,
        quali_finishing_position: req.params.quali_finishing_position
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

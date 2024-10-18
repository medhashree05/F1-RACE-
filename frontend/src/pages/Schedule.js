import React, { useState, useEffect } from 'react';
import { 
  AUSTRIA, AZERBAIJAN, BAHRAIN, BELGIUM, CANADA, 
  CHINA, EMILIA, HUNGARY, ITALY, JAPAN, MIAMI, 
  MONACO, NETHERLANDS, SAUDI, SINGAPORE, SPAIN, UK, AUSTRALIA 
} from '../schedule'; 
import './Schedule.css'; 

// Normalize the filename
const normalizeFilename = (filename) => filename.replace(/\.[^/.]+$/, "").toLowerCase();

// Import all images from the schedule-images folder
const importAll = (r) => {
  let images = {};
  r.keys().map((item) => { 
    const normalizedKey = normalizeFilename(item);
    images[normalizedKey] = r(item);
  });
  return images;
};

// Use require.context to dynamically import images
const images = importAll(require.context('../schedule-images', false, /\.(png|jpe?g|svg)$/));
console.log(images); // Log to check imported images


const Schedule = () => {
  const [driversData, setDriversData] = useState([]);

  // Fetch driver names based on pole positions from the backend
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('/api/drivers'); // Replace with your actual API endpoint
        const data = await response.json();
        setDriversData(data); // Assuming data is an array of driver names corresponding to each flashcard
      } catch (error) {
        console.error('Error fetching driver names:', error);
      }
    };

    fetchDrivers();
  }, []);

  const flashcards = [
    { name: 'Bahrain', date: '29 FEB 2024 - 02 MAR 2024', component: BAHRAIN },
    { name: 'Saudi Arabia', date: '07 MAR 2024 - 09 MAR 2024', component: SAUDI },
    { name: 'Australia', date: '22 MAR 2024 - 24 MAR 2024', component: AUSTRALIA },
    { name: 'China', date: '05 APR 2024 - 07 APR 2024', component: CHINA },
    { name: 'Japan', date: '19 APR 2024 - 21 APR 2024', component: JAPAN },
    { name: 'Miami', date: '03 MAY 2024 - 05 MAY 2024', component: MIAMI },
    { name: 'Emilia-Romagna', date: 'M17 MAY 2024 - 19 MAY 2024', component: EMILIA },
    { name: 'Monaco', date: '24 MAY 2024 - 26 MAY 2024', component: MONACO },
    { name: 'Canada', date: '07 JUN 2024 - 09 JUN 2024', component: CANADA },
    { name: 'Spain', date: '21 JUN 2024 - 23 JUN 2024', component: SPAIN },
    { name: 'Austria', date: '28 JUN 2024 - 30 JUN 2024', component: AUSTRIA },
    { name: 'Great-Britain', date: '05 JUL 2024 - 07 JUL 2024', component: UK },
    { name: 'Hungary', date: '19 JUL 2024 - 21 JUL 2024', component: HUNGARY },
    { name: 'Belgium', date: '26 JUL 2024 - 28 JUL 2024', component: BELGIUM },
    { name: 'Netherlands', date: '23 AUG 2024 - 25 AUG 2024', component: NETHERLANDS },
    { name: 'Italy', date: '30 AUG 2024 - 01 SEP 2024', component: ITALY },
    { name: 'Azerbaijan', date: '15 SEP 2024 - 17 SEP 2024', component: AZERBAIJAN },
    { name: 'Singapore', date: '20 SEP 2024 - 22 SEP 2024', component: SINGAPORE },
  ];  

  return (
    <div>
      <div className='schedule'>SCHEDULE</div> {/* Schedule title above flashcards */}
      <div className="schedule-container">
        {flashcards.map((card, index) => (
          <div 
            key={index} 
            className={`flashcard ${normalizeFilename(card.name)}`}
            onClick={() => window.location.href = `./schedule/${card.name.toLowerCase()}`}
          >
            <div 
              className="flashcard-image" 
              style={{ backgroundImage: `url(${images[normalizeFilename(card.name)]})` }} // Use imported images
            >
              <div className="country-name">{card.name}</div>
              <div className="country-date">{card.date}</div> {/* Add date below the country name */}
            </div>
            <div className="card-label">
              {driversData[index] ? (
                driversData[index].map((driver, i) => (
                  <div key={i} className="driver-container">
                    <span className="driver-number">{i + 1}</span> {/* Add numbering */}
                    <span>{driver}</span>
                  </div>
                ))
              ) : (
                <span>Loading...</span> // Optional loading state
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;

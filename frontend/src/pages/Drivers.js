import React, { useState, useEffect } from 'react';
import './drivers.css'; // Importing the CSS file for styling
import {Albon, Alonso,Bottas,Gasly,Leclerc,Lewis,Norris,Tsunoda,Verstappen,Sainz,Stroll,Russel,Piastri,Ocon,Magnussen,
    Ricciardo,Perez,Sargeant,Zhou,Franco,Bearman,Niko} from '../drivers'

// Normalize the filename to make it compatible with the file system and URL structure
const normalizeFilename = (filename) => filename.replace(/\s+/g, '-').toLowerCase();

// Import all images from the drivers-images folder dynamically
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    const normalizedKey = normalizeFilename(item.replace('./', ''));
    images[normalizedKey] = r(item);
  });
  return images;
};

// Use require.context to import images from the drivers-images directory
const images = importAll(require.context('../drivers-images', false, /\.(png|jpe?g|svg|webp|avif)$/));

console.log(images); // Log the images object to verify if images are loaded correctly

const Drivers = () => {
  const [driversData, setDriversData] = useState([]);

  // Fetch driver data from the backend API
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('/api/drivers'); // Replace with the actual API endpoint
        const data = await response.json();
        setDriversData(data); // Assuming data is an array of driver names corresponding to each flashcard
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };

    fetchDrivers();
  }, []);

  const flashcards = [
    { name: 'Albon', component: Albon },
    { name: 'Alonso', component: Alonso },
    { name: 'Bearman', component: Bearman },
    { name: 'Bottas', component: Bottas },
    { name: 'Gasly', component: Gasly },
    { name: 'Lewis', component: Lewis },
    { name: 'Norris', component: Norris },
    { name: 'Ocon', component: Ocon },
    { name: 'Perez', component: Perez },
    { name: 'Piastri', component: Piastri },
    { name: 'Russel', component: Russel },
    { name: 'Sainz', component: Sainz },
    { name: 'Stroll', component: Stroll },
    { name: 'Tsunoda', component: Tsunoda },
    { name: 'Verstappen', component: Verstappen },
    { name: 'Zhou', component: Zhou },
  ];

  return (
    <div>
      <div className='drivers'>DRIVERS</div> {/* Title for drivers section */}
      <div className="drivers-container">
        {flashcards.map((card, index) => (
          <div
            key={index}
            className={`flashcard ${normalizeFilename(card.name)}`}
            onClick={() => window.location.href = `./drivers/${normalizeFilename(card.name)}`} // Navigate to individual driver page
          >
            <div
              className="flashcard-image"
              style={{ backgroundImage: `url(${images[normalizeFilename(card.name)]})` }} // Use dynamic images
            >
              <div className="driver-name">{card.name}</div> {/* Display driver name */}
            </div>
            <div className="card-label">
              {driversData[index] ? (
                driversData[index].map((driverDetail, i) => (
                  <div key={i} className="driver-container">
                    <span className="driver-number">{i + 1}</span> {/* Optional: display driver stats */}
                    <span>{driverDetail}</span>
                  </div>
                ))
              ) : (
                <span>Loading...</span> // Optional loading state while driver data is being fetched
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drivers;

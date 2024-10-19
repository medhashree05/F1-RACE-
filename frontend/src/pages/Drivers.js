import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use navigate from react-router-dom
import './drivers.css'; // Importing the CSS file for styling
import {Albon, Alonso,Bottas,Gasly,Leclerc,Lewis,Norris,Tsunoda,MaxVerstappen,Sainz,Stroll,Russel,Piastri,Ocon,Magnussen,
    Ricciardo,Perez,Sargeant,Zhou,Franco,Bearman,Niko} from '../drivers';


// Normalize the filename to make it compatible with the file system and URL structure
const normalizeFilename = (filename) => {
  if (!filename) return ''; 
  return filename.replace(/\s+/g, '').toLowerCase(); // Remove spaces and convert to lowercase
};

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
  const navigate = useNavigate();
  // Fetch driver data from the backend API
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('https://localhost:5000/api/championship/'); // Replace with the actual API endpoint
        const data = await response.json();
        setDriversData(data); // Assuming data is an array of driver names corresponding to each flashcard
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };

    fetchDrivers();
  }, []);

  const flashcards = [
    { name: 'alexanderalbon', component: Albon },
    { name: 'fernandoalonso', component: Alonso },
    { name: 'oliverbearman', component: Bearman },
    { name: 'valtteribottas', component: Bottas },
    { name: 'pierregasly', component: Gasly },
    { name: 'lewishamilton', component: Lewis },
    { name: 'landonorris', component: Norris },
    { name: 'estebanocon', component: Ocon },
    { name: 'sergioperez', component: Perez },
    { name: 'oscarpiastri', component: Piastri },
    { name: 'georgerussell', component: Russel },
    { name: 'carlossainz', component: Sainz },
    { name: 'lancestroll', component: Stroll },
    { name: 'yukitsunoda', component: Tsunoda },
    { name: 'maxverstappen', component: MaxVerstappen },
    { name: 'zhouguanyu', component: Zhou },
    { name:'charlesleclerc'},
    { name:'nicohulkenberg'},
    {name:'danielricciardo'},
    {name:'kevinmagnussen'},
    {name:'francocolapinto'},
    {name:'logansargeant'},
    {name:'liamlawson'}
  ];

  return (
    <div>
      <div className='drivers'>DRIVERS</div> {/* Title for drivers section */}
      <div className="drivers-container"> 
            {flashcards.map((card, index) => ( 
                <div 
                    key={index} 
                    className={`team-card ${normalizeFilename(card.name)}`}
                    onClick={() => navigate(`/drivers/${normalizeFilename(card.name)}?drivername=${normalizeFilename(card.name)}`)}

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

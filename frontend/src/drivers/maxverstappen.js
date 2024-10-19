import React, { useState, useEffect } from "react";
import './index.css';
import { useParams } from 'react-router-dom';

// Utility to normalize filenames
const normalizeFilename = (filename) => {
  if (!filename) return '';
  return filename.replace(/\s+/g, '').toLowerCase(); // Remove spaces and convert to lowercase
};

// Function to import all images from a given folder
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => { // Use forEach instead of map
    const normalizedKey = item.replace('./', '').replace(/\.[^/.]+$/, "").toLowerCase();
    images[normalizedKey] = r(item);
  });
  return images;
}; 

// Import images from both driver and constructor folders
const driverImages = importAll(require.context('../drivers-images', false, /\.(png|jpe?g|svg|avif|webp)$/));
const constructorImages = importAll(require.context('../constructors', false, /\.(png|jpe?g|svg|avif|webp)$/));
console.log(driverImages);
console.log(constructorImages);
const MaxVerstappen = () => {
  const { drivername } = useParams();

  const [DriverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Normalize the driver name for consistency
  const normalizeddrivername = normalizeFilename(drivername);
  
  

  // Fetch driver data from the API
  useEffect(() => {
    const fetchDriverData = async () => { 
      if (!normalizeddrivername) return;
 
      try {
        const response = await fetch('http://localhost:5000/api/championship');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        console.log(data);

        // Find the driver data based on the driver name
        const driverData = data.find(driver => normalizeFilename(driver.driver_name) === normalizeddrivername);
     
        setDriverData(driverData);
        console.log(driverData);

      } catch (error) {
        console.error("Error fetching driver data:", error);
        setError("Error fetching driver data");
      } finally {
        setLoading(false);
      }
    };

    fetchDriverData();
  }, [normalizeddrivername]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  

  // Destructure driver data
  const { driver_id,driver_name, total_points, team_name, pole_positions, podiums, world_championships, chassis } = DriverData;
  const imgSrc1 = driverImages[normalizeFilename(driver_name)]
  const imgSrc2 = constructorImages[normalizeFilename(chassis)]; // Get constructor image based on chassis
  console.log(imgSrc2);
  return (
    <div className="driver">
      <div className="top">
        <div className="driver_info"> 
          <div className="driver_name">
            <h2>{driver_name}</h2>
          </div>
          <div className="driver_data">
            <ul>
              <li>N: {driver_id}</li>
              <li>Points: {total_points}</li>
              <li>Team Name: {team_name}</li>
              <li>Chassis: {chassis}</li>
              <li>Pole Positions: {pole_positions}</li>
              <li>Podiums: {podiums}</li>
              <li>World Championships: {world_championships}</li>
            </ul>
          </div>
        </div>
        <div className="image1">
          <img src={imgSrc1} alt={`${normalizeFilename(driver_name)}`} />
        </div>
      </div>
      <div className="bottom">
        <div className="image2">
          {imgSrc2 ? (
            <img src={imgSrc2} alt={`${normalizeFilename(chassis)}`} />
          ) : (
            <div>Error: Image not found for chassis {normalizeFilename(chassis)}.</div>
          )}
        </div>
        <div className="biography">
          {/* Add biography content if available */}
        </div>
      </div>
    </div>
  );
};

export default MaxVerstappen;

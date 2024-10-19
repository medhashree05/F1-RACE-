import React, { useState, useEffect } from 'react'; 
import { 
  Alpine, AstonMartin, Ferrari, Haas, 
  McLaren, Mercedes, RedBull, Sauber, 
  Williams, Visa 
} from '../teams'; // Import teams from your teams/index.js
import './teams.css'; // Import the Teams specific CSS 

// Normalize the filename
const normalizeFilename = (filename) => filename.replace(/\s+/g, '-').toLowerCase(); 

// Import all images from the constructor-images folder
const importAll = (r) => { 
  let images = {}; 
  r.keys().forEach((item) => { 
    const normalizedKey = normalizeFilename(item.replace('./', '')); 
    images[normalizedKey] = r(item); 
  }); 
  return images; 
};

// Use require.context to dynamically import images
const images = importAll(require.context('../constructors', false, /\.(png|jpe?g|svg|webp|avif)$/));

const Teams = () => { 
  const [teamData, setTeamData] = useState([]); 

  // Fetch team information from the backend 
  useEffect(() => { 
    const fetchTeams = async () => { 
      try { 
        const response = await fetch('/api/teams'); // Replace with your actual API endpoint 
        const data = await response.json(); 
        setTeamData(data); // Assuming data is an array of team objects with drivers and points
      } catch (error) { 
        console.error('Error fetching team data:', error); 
      } 
    }; 

    fetchTeams(); 
  }, []); 

  // Update teams array with drivers 
  const teams = [ 
    { name: 'Alpine', drivers: ['Esteban Ocon', 'Pierre Gasly'], component: Alpine }, 
    { name: 'Aston Martin', drivers: ['Fernando Alonso', 'Lance Stroll'], component: AstonMartin }, 
    { name: 'Ferrari', drivers: ['Charles Leclerc', 'Carlos Sainz'], component: Ferrari }, 
    { name: 'Haas', drivers: ['Kevin Magnussen', 'Nikita Mazepin'], component: Haas }, 
    { name: 'McLaren', drivers: ['Lando Norris', 'Oscar Piastri'], component: McLaren }, 
    { name: 'Mercedes', drivers: ['Lewis Hamilton', 'George Russell'], component: Mercedes }, 
    { name: 'Red Bull', drivers: ['Max Verstappen', 'Sergio Pérez'], component: RedBull }, 
    { name: 'Sauber', drivers: ['Valtteri Bottas', 'Guanyu Zhou'], component: Sauber }, 
    { name: 'Williams', drivers: ['Alexander Albon', 'Logan Sargeant'], component: Williams }, 
  ]; 

  return ( 
    <div> 
      <div className='teams'>TEAMS</div> {/* Teams title above flashcards */} 
      <div className="teams-container"> 
        {teams.map((team, index) => ( 
          <div 
            key={index} 
            className={`team-card ${normalizeFilename(team.name)}`} 
            onClick={() => window.location.href = `./teams/${normalizeFilename(team.name)}`} 
          > 
            <div 
              className="team-card-image" 
              style={{ backgroundImage: `url(${images[normalizeFilename(team.name)]})` }} // Use imported images 
            > 
              <div className="flashcard-number">{index + 1}</div> {/* Flashcard number in top left corner */}
              <div className="driver-names"> {/* Driver names in top right corner */}
                {team.drivers.join(' / ')}
              </div>
              <div className="points"> {/* Points in the top right corner */}
                Points: {teamData[index] ? teamData[index].points : 'Loading...'}
              </div>
              <div className="team-name">{team.name}</div> 
            </div> 
            <div className="card-label"> 
              {teamData[index] ? ( 
                <>
                  <div className="team-info1">{team.drivers[0]}</div> {/* First driver */} 
                  <div className='team-info2'>{team.drivers[1]}</div> {/* Second driver */}
                </>
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

export default Teams; 

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Carousel.css';
import '../style/Flashcards.css';
import { useNavigate } from 'react-router-dom';




const normalizeFilename = (filename) => filename.replace(/\.[^/.]+$/, "").toLowerCase();

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => { // Use forEach instead of map
    const normalizedKey = item.replace('./', '').replace(/\.[^/.]+$/, "").toLowerCase();
    images[normalizedKey] = r(item);
  });
  return images;
};

const images = importAll(require.context('../countries', false, /\.(png|jpe?g|svg)$/));
const driverImages = importAll(require.context('../drivers-images', false, /\.(png|jpe?g|svg|avif|webp)$/));

const constructorImages = importAll(require.context('../constructors', false, /\.(png|jpe?g|svg|avif|webp)$/));

const carouselTexts = {
  'a': { country: 'BAHRAIN', day: '02', month: 'MAR' },
  'b': { country: 'SAUDI ARABIA', day: '09', month: 'MAR' },
  'c': { country: 'AUSTRALIA', day: '24', month: 'MAR' },
  'd': { country: 'CHINA', day: '07', month: 'APR' },
  'e': { country: 'JAPAN', day: '21', month: 'APR' },
  'f': { country: 'MIAMI', day: '07', month: 'MAY' },
  'g': { country: 'EMILIA-ROMAGNA', day: '19', month: 'MAY' },
  'h': { country: 'MONACO', day: '26', month: 'MAY' },
  'i': { country: 'CANADA', day: '09', month: 'JUN' },
  'j': { country: 'SPAIN', day: '23', month: 'JUN' },
  'k': { country: 'AUSTRIA', day: '30', month: 'JUN' },
  'l': { country: 'GREAT BRITAIN', day: '07', month: 'JUL' },
  'm': { country: 'HUNGARY', day: '21', month: 'JUL' },
  'n': { country: 'BELGIUM', day: '28', month: 'JUL' },
  'o': { country: 'NETHERLANDS', day: '25', month: 'AUG' },
  'p': { country: 'ITALY', day: '01', month: 'SEP' },
  'q': { country: 'AZERBAIJAN', day: '15', month: 'SEP' },
  'r': { country: 'SINGAPORE', day: '22', month: 'SEP' },
};

const individualStyles = {
  'a': { height: '50px', width: '75px', borderRadius: '8%', marginTop: '120px' },
  'b': { height: '54px', width: '81px', borderRadius: '8%', marginTop: '120px' },
  'c': { height: '54px', width: '81px', borderRadius: '8%', marginTop: '120px' },
  'd': { height: '54px', width: '81px', borderRadius: '8%', marginTop: '120px' },
  'e': { height: '100px', width: '120px', borderRadius: '38%', marginTop: '98px'},
  'f': { height: '110px', width: '110px', borderRadius: '40%', marginTop: '95px'},
  'g': { height: '54px', width: '81px', borderRadius: '8%', marginTop: '123px' },
  'h': { height: '58px', width: '87px', borderRadius: '8%', marginTop: '123px' },
  'i': { height: '60px', width: '90px', borderRadius: '8%', marginTop: '123px' },
  'j': { height: '60px', width: '90px', borderRadius: '8%', marginTop: '123px' },
  'k': { height: '60px', width: '90px', borderRadius: '8%', marginTop: '123px' },
  'l': { height: '60px', width: '90px', borderRadius: '8%', marginTop: '123px' },
  'm': { height: '60px', width: '90px', borderRadius: '8%', marginTop: '123px' },
  'n': { height: '60px', width: '90px', borderRadius: '8%', marginTop: '123px' },
  'o': { height: '60px', width: '90px', borderRadius: '8%', marginTop: '123px' },
  'p': { height: '60px', width: '90px', borderRadius: '8%', marginTop: '123px' },
  'q': { height: '90px', width: '90px', borderRadius: '8%', marginTop: '110px' },
  'r': { height: '60px', width: '90px', borderRadius: '8%', marginTop: '123px'},
  
};

const Home = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [driversData, setDriversData] = useState([]);
  const [constructorsData, setConstructorsData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('drivers');

  const carouselItems = Object.keys(images).map((imageKey, index) => {
    const normalizedKey = normalizeFilename(imageKey);
    return {
      image: images[imageKey],
      text: carouselTexts[normalizedKey] || { country: `Item ${index + 1}`, day: 'Unknown Days', month: 'Unknown Months' },
      style: individualStyles[imageKey] || {},
    };
  });

  const itemsPerPage = 6;

  const startDrag = (e) => {
    setIsDragging(true);
    const pageX = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX;
    setStartX(pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const duringDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const pageX = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
    const x = pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const endDrag = () => {
    setIsDragging(false);
  };
  const [standingsData, setStandingsData] = useState([]);

  // Fetch driver standings
  useEffect(() => {
    const fetchStandings = async () => {
        try {
            let response1,response2;
            if (selectedOption === 'drivers') {
                response1 = await axios.get('http://localhost:5000/api/championship/top-3-drivers');
                response2 = await axios.get('http://localhost:5000/api/championship');
                setDriversData(response1.data);
                setStandingsData(response2.data); // Set standings data for drivers
            } else {
                response1 = await axios.get('http://localhost:5000/api/championship/top-3-constructors');
                response2 = await axios.get('http://localhost:5000/api/championship/top-3-constructors');
                setConstructorsData(response1.data);
                setStandingsData(response2.data); // Set standings data for constructors
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchStandings();
}, [selectedOption]);


  const renderFlashcards = () => {
    const data = selectedOption === 'drivers' ? driversData : constructorsData;
    const images = selectedOption === 'drivers' ? driverImages : constructorImages;
  
    // Limit the data to top 3 drivers or constructors
    return (
      <div className="flashcard-wrapper">
        <div className="flashcard-left-container">
          {data.length > 2 && (
            <div className={`flashcard flashcard-left`}>
              {(() => {
                const name =selectedOption === 'drivers' ? data[1].driver_name : data[1].chassis;
                const normalizedName = name.toLowerCase().replace(/\s+/g, ''); // Normalize to lowercase and remove spaces
                const imgSrc = images[normalizedName]; // Fetch the image using normalized name
                return (
                  <>
                    <img src={imgSrc} alt={name} />
                    <div className="card-label" >{name}</div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
        <div className="flashcard-middle-container">
          {data.length > 0 && (
            <div className={`flashcard flashcard-middle`}>
              {(() => {
                const name =  selectedOption === 'drivers' ? data[0].driver_name : data[0].chassis;
                const normalizedName = name.toLowerCase().replace(/\s+/g, ''); // Normalize to lowercase and remove spaces
                const imgSrc = images[normalizedName]; // Fetch the image using normalized name
                return (
                  <>
                    <img src={imgSrc} alt={name} />
                    <div className="card-label" >{name}</div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
        <div className="flashcard-right-container">
          {data.length > 1 && (
            <div className={`flashcard flashcard-right`}>
              {(() => {
                const name = selectedOption === 'drivers' ? data[2].driver_name : data[2].chassis;
                const normalizedName = name.toLowerCase().replace(/\s+/g, ''); // Normalize to lowercase and remove spaces
                const imgSrc = images[normalizedName]; // Fetch the image using normalized name
                return (
                  <>
                    <img src={imgSrc} alt={name} />
                    <div className="card-label" >{name}</div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  

  const displayStandings = () => {
    if (selectedOption === 'drivers') {
      return <div className="standing-content">DRIVER STANDINGS</div>;
    } else {
      return <div className="standing-content">CONSTRUCTOR STANDINGS</div>;
    }
  };
  const navigate = useNavigate();
  const renderStandingsTable = () => {
    return (
        <table className="standings-table">
            
            <tbody>
                {standingsData.slice(0,8).map((item, index) => (
                    <tr key={index} onClick={() => navigate(`/drivers/${normalizeFilename(item.driver_name)}`)}>
                        <td>{index + 1}</td>
                        <td >{item.driver_name || item.chassis}  </td> {/* Adjust based on your API response */}
                        
                        <td>{item.total_points}</td>
                        <td >{">"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
  return (
    <div className="Home">
      <div
        className="carousel-container"
        ref={carouselRef}
        onMouseDown={startDrag}
        onMouseMove={duringDrag}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={startDrag}
        onTouchMove={duringDrag}
        onTouchEnd={endDrag}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap', cursor: isDragging ? 'grabbing' : 'grab' }} 
      >
        <div className="carousel-wrapper">
          {carouselItems.map((item, index) => (
            <div
              className={`carousel-item ${index % itemsPerPage === 0 ? 'first-item' : ''} ${(index + 1) % itemsPerPage === 0 ? 'last-item' : ''}`}
              key={index}
              style={{
                display: 'inline-block', 
                width: 'calc(100% / 6)', 
              }}
            >
              <img src={item.image} alt={item.text.country || 'Unknown'} style={item.style} />
              <div className="overlay-text">
                <div className='country_name'>{item.text.country || 'Unknown Country'}</div>
                <div className='day'>{item.text.day || 'Unknown Dates'}</div>
                <div className='month'>{item.text.month || 'Unknown months'}</div>
              </div>
              {index < carouselItems.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    height: '400%',
                    width: '2px',
                    backgroundColor: 'white',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="heading">
        <ul className="button-list">
         <li>
           <button onClick={() => setSelectedOption('drivers')}>Drivers</button>
         </li>
         <div className="vertical-line"></div> 
         <li>
           <button onClick={() => setSelectedOption('constructors')}>Constructors</button>
         </li>
        </ul>
      </div>
      
      <div className='standings'>
      {displayStandings()}
      <div className="check-pattern"></div>
      </div>
      <div className="flashcard-container">
        {renderFlashcards()}
      </div>
      <div className="standings-table-container">
        {renderStandingsTable()}
      </div>
      <div className="viewfull" onClick={() => navigate(`/results?option=${selectedOption}`)}>View full results</div>
    </div>
    
  );
};



export default Home;

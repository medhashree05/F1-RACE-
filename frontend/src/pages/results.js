import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios
import { useNavigate } from 'react-router-dom';

const normalizeFilename = (filename) => filename.replace(/\.[^/.]+$/, "").toLowerCase();

const Results = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialOption = queryParams.get('option') || 'drivers'; // Default to 'drivers' if not set

    const [standingsData, setStandingsData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(initialOption);
  
    useEffect(() => {
        const fetchStandings = async () => {
            try {
                let response1, response2;
                if (selectedOption === 'drivers') {
                    response1 = await axios.get('http://localhost:5000/api/championship/top-3-drivers');
                    response2 = await axios.get('http://localhost:5000/api/championship');
                    setStandingsData(response2.data); // Set standings data for drivers
                } else {
                    response1 = await axios.get('http://localhost:5000/api/championship/top-3-constructors');
                    response2 = await axios.get('http://localhost:5000/api/championship/top-3-constructors');
                    setStandingsData(response2.data); // Set standings data for constructors
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchStandings();
    }, [selectedOption]);
    
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
                    {standingsData.map((item, index) => (
                        <tr key={index} onClick={() => navigate(`/drivers/${normalizeFilename(item.driver_name)}`)}>
                            <td>{index + 1}</td>
                            <td>{item.driver_name || item.chassis}</td>
                            <td>{item.total_points}</td>
                            <td>{">"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };
  
    return (
        <div className="result-body">
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
            <div className='standings'>
                {displayStandings()}
            </div>
            <div className="standings-table-container">
                {renderStandingsTable()}
            </div>
        </div>
        </div>
    );
};

export default Results;

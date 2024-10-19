import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Schedule from './pages/Schedule';  // Corrected import
import Results from './pages/results';
import Teams from './pages/Teams';
import Drivers from './pages/Drivers';
import './App.css';  // Import CSS for the overall app styles
import  MaxVerstappen   from './drivers/maxverstappen';


function App() {
    return (
        <Router>
            <Header /> {/* Common Header */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/results" element={<Results />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/drivers/:drivername" element={<MaxVerstappen />} />
            </Routes>
        </Router>
    );
}

export default App;

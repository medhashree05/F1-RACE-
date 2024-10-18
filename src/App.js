import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import DriverStandings from './pages/driver-standings';
import ConstructorStandings from './pages/constructor-standings';
import * as Teams from './teams'; // Import all teams
import * as Drivers from './drivers'; // Import all drivers
import './App.css';

function App() {
    return (
        <Router>
            <Header /> {/* Common Header */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/pages/driver-standings" element={<DriverStandings />} />
                <Route path="/pages/constructor-standings" element={<ConstructorStandings />} />
                <Route path="/teams/alpine" element={<Teams.Alpine />} />
                <Route path="/teams/astonmartin" element={<Teams.AstonMartin />} />
                <Route path="/teams/ferrari" element={<Teams.Ferrari />} />
                <Route path="/teams/haas" element={<Teams.Haas />} />
                <Route path="/teams/mclaren" element={<Teams.McLaren />} />
                <Route path="/teams/mercedes" element={<Teams.Mercedes />} />
                <Route path="/teams/redbull" element={<Teams.RedBull />} />
                <Route path="/teams/kicksauber" element={<Teams.Sauber />} />
                <Route path="/teams/williams" element={<Teams.Williams />} />

                {/* Driver Routes */}
                <Route path="/drivers/albon" element={<Drivers.Albon />} />
                <Route path="/drivers/alonso" element={<Drivers.Alonso />} />
                <Route path="/drivers/bearman" element={<Drivers.Bearman />} />
                <Route path="/drivers/bottas" element={<Drivers.Bottas />} />
                <Route path="/drivers/gasly" element={<Drivers.Gasly />} />
                <Route path="/drivers/lewis" element={<Drivers.Lewis />} />
                <Route path="/drivers/norris" element={<Drivers.Norris />} />
                <Route path="/drivers/ocon" element={<Drivers.Ocon />} />
                <Route path="/drivers/perez" element={<Drivers.Perez />} />
                <Route path="/drivers/piastri" element={<Drivers.Piastri />} />
                <Route path="/drivers/russel" element={<Drivers.Russel />} />
                <Route path="/drivers/sainz" element={<Drivers.Sainz />} />
                <Route path="/drivers/stroll" element={<Drivers.Stroll />} />
                <Route path="/drivers/tsunoda" element={<Drivers.Tsunoda />} />
                <Route path="/drivers/verstappen" element={<Drivers.Verstappen />} />
                <Route path="/drivers/zhou" element={<Drivers.Zhou />} />
            </Routes>
        </Router>
    );
}

export default App;

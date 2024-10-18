import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';  // Import CSS for header styles
import f1_Logo from '../assets/f1-logo.jpg';

const Header = () => {
    return (
        <header className="header">
            <div className='ct'>
            </div>
            <div className='nav_bar'>
            <div className="logo">
                <img src={f1_Logo} alt="F1 Logo" width={80} height = {80} className="f1-logo" />
            </div>
            <nav>
                <ul>
                    <li></li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/schedule">Schedule</Link></li>
                    <li><Link to="/results">Results</Link></li>
                    <li><Link to="/teams">Teams</Link></li>
                    <li><Link to="/drivers">Drivers</Link></li>
                </ul>
            </nav>
            </div>
        </header>
    );
}

export default Header;

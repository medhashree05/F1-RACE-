import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';  // Import CSS for header styles
import f1_Logo from '../assets/f1-logo.jpg';
import { Dropdown } from 'react-bootstrap';

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
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/schedule">Schedule</Link></li>
                    <li className="dropdown results-dropdown">
                            <Link to="/pages">Results</Link>
                            <div className="dropdown-menu-results">
                                <div><Link to="/pages/driver-standings">Driver Standings</Link></div>
                                <div><Link to="/pages/constructor-standings">Constructor Standings</Link></div>
                            </div>
                        </li>
                        
                        {/* Dropdown for Teams */}
                        <li className="dropdown teams-dropdown">
                            <Link to="/teams">Teams</Link>
                            <div className="dropdown-menu-teams">
                                <div><Link to="/teams/alpine">Alpine</Link></div>
                                <div><Link to="/teams/astonmartin">Aston Martin</Link></div>
                                <div><Link to="/teams/ferrari">Ferrari</Link></div>
                                <div><Link to="/teams/haas">Haas</Link></div>
                                <div><Link to="/teams/mclaren">McLaren</Link></div>
                                <div><Link to="/teams/mercedes">Mercedes</Link></div>
                                <div><Link to="/teams/redbull">Red Bull</Link></div>
                                <div><Link to="/teams/sauber">Sauber</Link></div>
                                <div><Link to="/teams/williams">Williams</Link></div>
                            </div>
                        </li>

                        {/* Dropdown for Drivers */}
                        <li className="dropdown drivers-dropdown">
                            <Link to="/drivers">Drivers</Link>
                            <div className="dropdown-menu-drivers">
                                <div><Link to="/drivers/albon">Alexander Albon</Link></div>
                                <div><Link to="/drivers/alonso">Fernando Alonso</Link></div>
                                <div><Link to="/drivers/bearman">Oliver Bearman</Link></div>
                                <div><Link to="/drivers/bottas">Valtteri Bottas</Link></div>
                                <div><Link to="/drivers/gasly">Pierre Gasly</Link></div>
                                <div><Link to="/drivers/hamilton">Lewis Hamilton</Link></div>
                                <div><Link to="/drivers/norris">Lando Norris</Link></div>
                                <div><Link to="/drivers/ocon">Esteban Ocon</Link></div>
                                <div><Link to="/drivers/perez">Sergio Perez</Link></div>
                                <div><Link to="/drivers/piastri">Oscar Piastri</Link></div>
                                <div><Link to="/drivers/russell">George Russell</Link></div>
                                <div><Link to="/drivers/sainz">Carlos Sainz</Link></div>
                                <div><Link to="/drivers/stroll">Lance Stroll</Link></div>
                                <div><Link to="/drivers/tsunoda">Yuki Tsunoda</Link></div>
                                <div><Link to="/drivers/verstappen">Max Verstappen</Link></div>
                                <div><Link to="/drivers/zhou">Zhou Guanyu</Link></div>
                            </div>
                        </li>
                </ul>
            </nav>
            </div>
        </header>
    );
}

export default Header;

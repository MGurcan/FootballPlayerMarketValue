import React from "react";
import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="menu2">
            <menu>
                <li><Link to="/">Model</Link></li>
                <li><Link to="/eda">EDA</Link></li>
            </menu>
        </nav>
    )
}

export default Navbar;
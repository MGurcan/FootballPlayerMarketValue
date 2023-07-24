import React from "react";
import './Navbar.css'
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="menu2">
            <menu>
                <li><NavLink activeClassName="selected" to="/">Model</NavLink></li>
                <li><NavLink activeClassName="selected" to="/eda">EDA</NavLink></li>
            </menu>
        </nav>
    )
}

export default Navbar;
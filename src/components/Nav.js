import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = (props) => {
    // Setting up our two toggle states
    const navToggle = props.showNav ? "nav-links nav-active" : "nav-links";

    const hamburgerToggle = props.showNav ? "nav-button-container nav-showing" : "nav-button-container";

    return (
        // Nav Container starts
        <div className="nav-container">

            {/* Nav Button */}
            <div className={hamburgerToggle}>
                <button 
                type="button"
                onClick={props.handleNavShow}
                className="nav-button"
                >
                    <span className="hamburger bun top"></span>
                    <span className="hamburger chez"></span>
                    <span className="hamburger meet"></span>
                    <span className="hamburger lettus"></span>
                    <span className="hamburger bun bottom"></span>
                    
                </button>
            </div>

            {/* Nav Links */}
            <div className={navToggle}>
                {/* Exit menu button */}
                <button className="exit-button nav-link" onClick={props.handleNavShow}>
                    <i className="fas fa-times exit"></i>
                </button>

                <NavLink 
                to='/' 
                onClick={props.handleNavShow}
                className="nav-link"> Home </NavLink>

                <NavLink 
                to='dailyjoke' 
                onClick={props.handleNavShow}
                className="nav-link"> Daily Joke </NavLink>

                <NavLink 
                to='submitjoke'
                onClick={props.handleNavShow}
                className="nav-link"> Submit a Joke </NavLink>

                <NavLink 
                to='vote'
                onClick={props.handleNavShow}
                className="nav-link"> Vote on Joke </NavLink>
            
            </div>

        {/* Nav Container ends */}
        </div>
    )
}

export default Nav;
import React from 'react';
import {NavLink} from 'react-router-dom';



const Nav = (props) => {
    const navToggle = props.showNav ? "nav-links nav-active" : "nav-links";

    const hamburgerToggle = props.showNav ? "nav-button-container nav-showing" : "nav-button-container";

    return (
        // Nav Container starts
        <div className="nav-container">

            {/* Nav */}
            <div className={hamburgerToggle}>
                <button 
                type="button"
                onClick={props.handleNavShow}
                className="nav-button"
                >
                    <span class="hamburger bun top"></span>
                    <span class="hamburger chez"></span>
                    <span class="hamburger meet"></span>
                    <span class="hamburger lettus"></span>
                    <span class="hamburger bun bottom"></span>
                    
                </button>
            </div>

            {/* Nav Links */}
            <div className={navToggle}>
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
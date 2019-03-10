import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = (props) => {
    return (
        // Nav Container starts
        <div className="nav-container">

            {/* Nav */}
            <div className="nav-button">
                <button 
                type="button"
                onClick={props.handleNavShow}><i className="fas fa-hamburger"
                ></i></button>
            </div>

            {/* Nav Links */}
            {props.showNav === true && (
            <div className="nav-links">
                <NavLink to='/'> Home </NavLink>
                <NavLink to='dailyjoke'> Daily Joke </NavLink>
                <NavLink to='submitjoke'> submit joke </NavLink>
                <NavLink to='vote'> Voting </NavLink>
            
            </div>
            )}

        {/* Nav Container ends */}
        </div>
    )
}

export default Nav;
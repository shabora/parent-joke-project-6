import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => {
    return (
        <React.Fragment>
        <button type="button"><i className="fas fa-hamburger"></i></button>
        <NavLink to='/'> Home </NavLink>
        <NavLink to='dailyjoke'> Daily Joke </NavLink>
        <NavLink to='submitjoke'> submit joke </NavLink>
        <NavLink to='vote'> Voting </NavLink>
        </React.Fragment>
    )
}

export default Nav;
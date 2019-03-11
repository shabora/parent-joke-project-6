import React from 'react';

// header component needs props in order to use what we're referencing from the parent component (app.js)
const Header = (props) => {
    return (
        <div className="logo-text">
            <h1>{props.textLanding}</h1>
        </div>
    )
}

export default Header;
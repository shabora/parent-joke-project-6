import React from 'react';

const DisplayDailyJoke = props => {
return (
    <div>
        <h2>{props.dailyJoke}</h2>
        <button onClick={props.handleDailyJoke}>Generate another joke</button>
    </div>
)
}

export default DisplayDailyJoke
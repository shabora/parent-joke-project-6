import React from 'react';

const DisplayDailyJoke = props => {
    return (
        <div className="daily-joke-container">
            {props.jokeButtonShow === true && (
                <button
                    onClick={props.handleDailyJoke}
                    className="button">
                    Click Me
                </button>
            )}

            {props.jokeButtonShow === false && (
                <div className="joke-card">
                    <p>{props.dailyJoke}</p>
                    <button
                        onClick={props.handleDailyJoke}
                        className="button">
                        Get another joke
                    </button>
                </div>
            )}
        </div>
    )
}

export default DisplayDailyJoke;
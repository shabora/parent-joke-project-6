import React from 'react';
import GetJokeButton from './GetJokeButton';

const DisplayDailyJoke = props => {
return (


    <div>
        {props.jokeButtonShow === true && (
            <GetJokeButton handleDailyJoke={props.handleDailyJoke}
            jokeButtonShow={props.jokeButtonShow}

            />
        )}

        {props.jokeButtonShow === false && (
            <div>
                <h2>{props.dailyJoke}</h2>
                <button onClick={props.handleDailyJoke}>Generate another joke</button>
            </div>
            
        )}
        
    </div>
)
}

export default DisplayDailyJoke;
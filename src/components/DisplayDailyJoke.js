import React from 'react';
import GetJokeButton from './GetJokeButton';

const DisplayDailyJoke = props => {
return (


    <div>
        {/* {props.jokeButtonShow === true && ( */}
            <GetJokeButton handleDailyJoke={props.handleDailyJoke}
            />
        
        {/* {props.state.jokeButtonShow === false && ( */}
            <h2>{props.dailyJoke}</h2>
                <button onClick={props.handleDailyJoke}>Generate another joke</button>
          {/* )} */}
        
    </div>
)
}

export default DisplayDailyJoke;
import React from 'react';
import Chart from './Chart.js';


const PrintJoke = (props) =>{
    return(
        <React.Fragment>
    
    { props.jokesFirebaseUse.map((joke, index) =>{
        return(
            <div key={joke.key} index={index} id={joke.key}>
                <p>{joke.userJoke}</p>
                <h2>{joke.userName}</h2>
                <h2>{joke.userDepartment}</h2>
            <button className="counter-action increment" onClick={()=>props.incrementScore(joke.key, joke.likeCount, joke.userValue)}>Like is at{joke.likeCount}</button>
            <button className="counter-action neutral" onClick={()=>props.neutralScore(joke.key, joke.neutralCount )}>Don't Get It:{joke.neutralCount}</button>
            <button className="counter-action decrement" onClick={()=>props.decrementScore(joke.key, joke.dislikeCount, joke.userValue )}>Don't Like it is {joke.dislikeCount}</button>
            <Chart/>
            </div>

        )
    })}
    </React.Fragment>
    )
}

export default PrintJoke;
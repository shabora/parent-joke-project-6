import React from 'react';


const PrintJoke = (props) =>{
    return(
        <React.Fragment>
    
    { props.jokesFirebaseUse.map((joke, index) =>{
        return(
            <div key={joke.key} index={index} id={joke.key}>
                <p>{joke.userJoke}</p>
                <h2>{joke.userName}</h2>
                <h2>{joke.userDepartment}</h2>
            <button className="counter-action increment" onClick={()=>props.incrementScore(joke.key, joke.likeCount)}>Like is at{joke.likeCount}</button>
            <button onClick={props.neutralScore}>Don't Get It:{joke.neutralCount}</button>
            <button className="counter-action decrement" onClick={props.decrementScore}>Don't Like it is {joke.dislikeCount}</button>
            </div>
        )
    })}
     </React.Fragment>
    )
}

export default PrintJoke;
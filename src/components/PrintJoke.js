import React from 'react';
import Counter from './Counter.js';

const PrintJoke = (props) =>{
    return(
        <React.Fragment>
    
    { props.jokesFirebaseUse.map((joke, index) =>{
        return(
            <div key={joke.key} index={index} id={joke.key}>
                <p>{joke.userJoke}</p>
                <h2>{joke.userName}</h2>
                <h2>{joke.userDepartment}</h2>
                <Counter  
                jokesFirebaseUse={props.jokesFirebaseUse}
                jokeId={joke.key} 
                incrementScore={props.incrementScore}
                decrementScore={props.decrementScore}
                neutralScore={props.neutralScore}
                />


            </div>
        )
    })}
     </React.Fragment>
    )
}

export default PrintJoke;
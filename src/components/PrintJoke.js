import React from 'react'

const PrintJoke = (props) =>{
    return(
        <React.Fragment>
    
    { props.jokesFirebaseUse.map((joke, index) =>{
        return(
            <div key={joke.key} index={index} id={joke.key}>
                <p>{joke.userJoke}</p>
                <h2>{joke.userName}</h2>
                <h2>{joke.userDepartment}</h2>
                <button onClick={props.handleLike}>Like</button>
                <button>Dont Like</button>
                <button>Do not get it?</button>


            </div>
        )
    })}
     </React.Fragment>
    )
}

export default PrintJoke;
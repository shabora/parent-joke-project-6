import React from 'react';

const LandingPage = (props) => {
    return (
        <React.Fragment>
        {
            props.jokesFirebaseUse.slice(0,1).map((joke=>{
                return(
                    <div>
                        <p>{joke.userJoke}</p>
                        <p>{joke.userName}</p>
                        <p>{joke.userDepartment}</p>
                    </div>
                )
            }))
        }
    </React.Fragment>
    )
    
}

export default LandingPage;
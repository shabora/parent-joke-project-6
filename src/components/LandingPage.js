import React from 'react';

const LandingPage = (props) => {
    return (
        <React.Fragment>
            {
                props.jokesFirebaseUse.slice(0,1).map((joke => {
                    return (
                        <div className="landing-page-container">

                            {/* Section instructions */}
                            <h2>Welcome to Parent Joke</h2>
                            <p>Some background about why we made the page.</p>

                            <div className="joke-card top-joke-container">
                                {/* Joke */}
                                <p>{joke.userJoke}</p>

                                {/* Name and Department */}
                                <h3>{joke.userName}, {joke.userDepartment}</h3>
                            </div>
                        </div>
                    )
                }))
            }
        </React.Fragment>
    )

}

export default LandingPage;
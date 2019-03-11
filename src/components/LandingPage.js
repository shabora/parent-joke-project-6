import React from 'react';

const LandingPage = (props) => {
    return (
        <React.Fragment>
        {
            props.jokesFirebaseUse.slice(0,1).map((joke=>{
                return(
                    <div className="landing-page-container">

                        {/* Section instructions */}
                        <h2>Welcome to Parent Joke</h2>
                        <p>Some background about why we made the page.</p>

                        <div className="joke-card top-joke-container">
                            <div className="joke-card-header clearfix">

                                <div className="joke-card-user">
                                    <h3>Our current top joke!</h3>
                                </div>
                            </div>
                            <div className="joke-card-joke">
                                <h3>{joke.userName} from {joke.userDepartment}</h3> <p>{joke.userJoke}</p>
                            </div>
                        </div>
                    </div>
                )
            }))
        }
    </React.Fragment>
    )
    
}

export default LandingPage;
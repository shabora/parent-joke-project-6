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
                        <p className="landing-para">We, the fun committee of <span className="bold">Shabora Global</span>, have been tasked with making the company funnier. We love 'dad jokes', but that term isn't the most inclusive, so we're proud to bring you <span className="bold">Parent Joke</span>! </p>
                        
                        <p className="landing-para">On this page, you'll find our Top Joke (congrats <span className="underline">{joke.userName}</span> from <span className="underline">{joke.userDepartment}</span>. Feel free to click the menu in the upper right hand corner and take a peak around!</p>

                        <div className="joke-card top-joke-container">
                            <div className="joke-card-header clearfix">

                                <div className="joke-card-user">
                                    <h3>Our top joke!</h3>
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
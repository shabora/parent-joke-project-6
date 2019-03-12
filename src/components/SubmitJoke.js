import React from 'react';

const SubmitJoke = (props) => {
    return(

        // Submit Joke Container Starts
        <div className="submit-joke-container">

            {/* Joke Submit instructions */}
            <div className="desc">
                <p>In the form below, please submit your name, department and joke</p>
            </div>

                {/* Form starts */}
                <form action="submit" onSubmit={props.handleJokeSubmit}>

                    {/* Form div starts */}
                    <div className="form clearfix">

                        {/* Input starts */}
                        <div className="input">
                            <div className="header">
                                <h2>Submit A Joke!</h2>
                            </div>

                            {/* Name input */}
                            <div className="form-name clearfix">
                                <label htmlFor="name" name="name" className="visually-hidden">Name</label>
                                <input type="text" id="name" name="userName" required placeholder="Name"
                                onChange={props.handleChange}
                                value={props.userSubmittedJoke.userName}
                                />
                            <i className="fas fa-user" aria-required="false"></i>
                            </div>

                            {/* Department input */}
                            <div className="form-department">
                                <label htmlFor="department" name="department" className="visually-hidden">Department</label>
                                <input
                                type="text" id="department" name="userDepartment" required placeholder="Department" 
                                onChange={props.handleChange}
                                value={props.userSubmittedJoke.userDepartment}  
                                />
                            <i className="fas fa-map-signs" aria-required="false"></i>
                            </div>

                        {/* Input ends */}
                        </div>
                        
                        {/* Textfield */}
                        <div className="textfield">
                            <label htmlFor="joke" name="joke" className="visually-hidden">Tell us your joke!</label>
                            <textarea name="userJoke" id="joke" cols="30" rows="10" resize="none" required placeholder="Tell us your joke!"
                            onChange={props.handleChange}
                            value={props.userSubmittedJoke.userJoke}></textarea>
                        <i className="fas fa-pencil-alt" aria-required="false"></i>
                        </div>

                        {/* Submit button */}
                        <div className="submit">
                            <button type="submit" className="button">Submit</button>
                        </div>

                    {/* Form div ends */}
                    </div>
                    
                {/* Form ends */}
                </form>
            
            {/* Submit Joke Container ends */}
            </div>

    )
}

export default SubmitJoke;
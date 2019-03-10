import React from 'react';

const SubmitJoke = (props) => {
return(
    // Form to submit your joke
    <div className="submit-joke-container">
        <div className="form-description">
            <h2>Submit A Joke!</h2>
            <p>In the form below, please submit your name, department and joke</p>
        </div>
        {/* FORM STARTS */}
        <div className="form">
            <form action="submit" onSubmit={props.handleJokeSubmit}>
                {/* Name */}
                <div className="input clearfix">
                    <label htmlFor="name" name="name" className="visually-hidden">Name</label>
                    <input  type="text" id="name" name="userName" required placeholder="Name"
                    onChange={props.handleChange}
                    value={props.userSubmittedJoke.userName}
                    />
                    {/* Department */}
                    <label htmlFor="department" name="department" className="visually-hidden">Department</label>
                    <input type="text" id="department" name="userDepartment" required placeholder="Department" 
                    onChange={props.handleChange}
                    value={props.userSubmittedJoke.userDepartment}  
                    />
                </div>
                <div className="textfield">
                    {/* Joke */}
                    <label htmlFor="joke" name="joke" className="visually-hidden">Tell us your joke!</label>
                    <textarea name="userJoke" id="joke" cols="30" rows="10" required placeholder="Tell us your joke!"
                    onChange={props.handleChange}
                    value={props.userSubmittedJoke.userJoke}></textarea>
                </div>
                <div className="submit">
                    <button type="submit" className="button">Submit</button>
                </div>
            </form>
        </div>
    
    </div>

)
}

export default SubmitJoke;
import React from 'react';

const SubmitJoke = (props) => {
return(
    // Form to submit your joke
    <div className="submit-joke-container">

        {/* Section instructions */}
        <h2>Submit A Joke!</h2>
        <p>Some instructions about what to do on the page.</p>


        {/* FORM STARTS */}
        <form action="submit" onSubmit={props.handleJokeSubmit}>
        {/* Name */}
        <label htmlFor="name" name="name" className="visually-hidden">Please enter your name</label>

        <input  type="text" id="name" name="userName" required placeholder="name"
        onChange={props.handleChange}
        value={props.userSubmittedJoke.userName}
        />

        {/* Department */}
        <label htmlFor="department" name="department" className="visually-hidden">Please enter your department</label>
        <input type="text" id="department" name="userDepartment" required placeholder="Your department" 
        onChange={props.handleChange}
        value={props.userSubmittedJoke.userDepartment}  
        />

        {/* Joke */}
        <label htmlFor="joke" name="joke" className="visually-hidden">Give us your joke!</label>
        <textarea name="userJoke" id="joke" cols="30" rows="10" required placeholder="Give us your joke!"
        
        onChange={props.handleChange}
        value={props.userSubmittedJoke.userJoke}></textarea>

        <button 
        type="submit"
        className="button">
        Submit it!</button>
        </form>
    
    </div>

)
}

export default SubmitJoke;
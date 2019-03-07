import React from 'react';
const SubmitJoke = (props) => {
return(
    // Form to submit your joke
    <form action="submit" onSubmit={props.handleJokeSubmit}>
    {/* Name */}
    <label htmlFor="name" name="name">Please enter your name</label>

    <input  type="text" id="name" name="userName" required placeholder="name"
    onChange={props.handleChange}
    value={props.userSubmittedJoke.userName}
    />

    {/* Department */}
    <label htmlFor="department" name="department">Please enter your department</label>
    <input type="text" id="department" name="userDepartment" required placeholder="Your department" 
    onChange={props.handleChange}
    value={props.userSubmittedJoke.userDepartment}  
    />

    {/* Joke */}
    <label htmlFor="joke" name="joke">Give us your joke!</label>
    <textarea name="userJoke" id="joke" cols="30" rows="10" required placeholder="Give us your joke!"
      
    onChange={props.handleChange}
    value={props.userSubmittedJoke.userJoke}></textarea>

    <button type="submit">Submit it!</button>
    </form>
)
}

export default SubmitJoke;
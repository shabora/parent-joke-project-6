import React from 'react';


const SubmitJoke = (props) => {
return(
    <div className="submit-joke-container">
        <div className="desc">
            <p>In the form below, please submit your name, department and joke</p>
        </div>
            <form action="submit" onSubmit={props.handleJokeSubmit}>
                <div className="form clearfix">
                    <div className="input">
                        <div className="header">
                            <h2>Submit A Joke!</h2>
                        </div>
                        <div className="form-name clearfix">
                            <label htmlFor="name" name="name" className="visually-hidden">Name</label>
                            <input type="text" id="name" name="userName" required placeholder="Name"
                            onChange={props.handleChange}
                            value={props.userSubmittedJoke.userName}
                            />
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="form-department">
                            <label htmlFor="department" name="department" className="visually-hidden">Department</label>
                            <input
                            type="text" id="department" name="userDepartment" required placeholder="Department" 
                            onChange={props.handleChange}
                            value={props.userSubmittedJoke.userDepartment}  
                            />
                            <i className="fas fa-map-signs"></i>
    
                        </div>
                    </div>
                    <div className="textfield">
                        <label htmlFor="joke" name="joke" className="visually-hidden">Tell us your joke!</label>
                        <textarea name="userJoke" id="joke" cols="30" rows="10" resize="none" required placeholder="Tell us your joke!"
                        onChange={props.handleChange}
                        value={props.userSubmittedJoke.userJoke}></textarea>
                        <i className="fas fa-pencil-alt"></i>
                    </div>
                    <div className="submit">
                        <button type="submit" className="button">Submit</button>
                    </div>
                </div>
            </form>
        </div>

)
}

export default SubmitJoke;
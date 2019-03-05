import React from 'react';

const GetJokeButton = (props) => {
return (
    <div>
    <button onClick={props.handleDailyJoke}>Click Me</button>
    </div>
)
}

export default GetJokeButton;
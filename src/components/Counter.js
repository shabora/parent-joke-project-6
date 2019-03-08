import React from 'react';

const Counter = (props) => {
    return (
        <div className="counter">
            <button className="counter-action increment" onClick={props.incrementScore}>Like is at{props.jokesFirebaseUse.likeCount}</button>
            <button onClick={props.neutralScore}>Don't Get It {props.jokesFirebaseUse.neutralCount}</button>
            <button className="counter-action decrement" onClick={props.decrementScore}>Don't Like it is {props.jokesFirebaseUse.dislikeCount}</button>

        </div>
    );
}
export default Counter;
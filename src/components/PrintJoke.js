import React from 'react';

const PrintJoke = props => {
    return (
        <React.Fragment>
            {props.print.map((jokeItem, index) => {
                return (
                    <div key={jokeItem.id} index={index} id={jokeItem.id}>
                        <p>{jokeItem.joke}</p>
                        <button onClick={props.handleLikeVote}>Like</button>
                        <button>Don't Get It</button>
                        <button>Dislike</button>
                    </div>
                )
            })}
        </React.Fragment>
    )
}

export default PrintJoke;
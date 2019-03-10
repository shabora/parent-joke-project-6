import React from 'react';
import Chart from './Chart.js';


const PrintJoke = (props) =>{
    return(
        <React.Fragment>
    
    { props.jokesFirebaseUse.map((joke, index) =>{
        return(
            // Print Joke Container Starts
            <div className="print-joke-container">

                {/* Section instructions */}
                <h2>Joke Vote</h2>
                <p>Some instructions about what to do on the page.</p>

                {/* Joke Card */}
                <div key={joke.key} index={index} id={joke.key} className="joke-card">
                    
                    {/* Joke Container */}
                        <div className="joke-container">
                        {/* Joke */}
                        <p>{joke.userJoke}</p>

                        {/* Name and Department*/}
                        <h3>{joke.userName}, {joke.userDepartment}</h3>

                    </div>
                    
                    {/* Like Button */}
                    <button 
                    className="counter-action increment button" 
                    onClick={() => props.incrementScore(joke.key, joke.likeCount, joke.userValue)}><i class="far fa-thumbs-up"></i>{joke.likeCount}</button>

                    {/* Neutral Button */}
                    <button 
                    className="counter-action neutral button" 
                    onClick={() => props.neutralScore(joke.key, joke.neutralCount)}>
                    <i class="far fa-meh"></i>
                    {joke.neutralCount}</button>

                    {/* Dislike button */}
                    <button className="counter-action decrement button" 
                    onClick={() => props.decrementScore(joke.key, joke.dislikeCount, joke.userValue)}>
                    <i class="far fa-thumbs-down"></i> {joke.dislikeCount}</button>

                    {/* Joke Heat Chart */}
                    <Chart
                    dislikeCount={joke.dislikeCount}
                    likeCount={joke.likeCount}
                    neutralCount={joke.neutralCount}
                    />
                </div>
            
            {/* Print Joke Container ends */}
            </div>


        )
    })}
    </React.Fragment>
    )
}

export default PrintJoke;
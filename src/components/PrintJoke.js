import React from 'react';
import Chart from './Chart.js';


const PrintJoke = (props) =>{
    return(
        <React.Fragment>
            <div className="voting-instructions-container">
                {/* Section instructions */}
                <h2>Welcome to Parent Joke</h2>
                <p>Some background about why we made the page.</p>
            </div>
    
    { props.jokesFirebaseUse.map((joke, index) =>{
        return(
            // Print Joke Container Starts
            <div className="print-joke-container">

                {/* Joke Card */}
                <div key={joke.key} index={index} id={joke.key} className="joke-card">
                    
                    {/* Flip Container starts */}
                    <div className="flip-container">
                    
                    {/* Flip Container Inner starts */}
                    <div className="flip-container-inner">
                        
                        {/* Joke Container starts */}
                        <div className="joke-container">
                            {/* Joke */}
                            <p>{joke.userJoke}</p>

                            {/* Name and Department*/}
                            <h3>{joke.userName}, {joke.userDepartment}</h3>
                        {/* Joke Container ends */}
                        </div>

                        {/* Chart Container starts */}
                        <div className="chart-container">
                            {/* Legend */}
                            <p className="legend">Purple = Like</p>

                            <p className="legend dislike-legend">Blue = Dislike</p>

                            <p className="legend neutral-legend">Grey = Neutral</p>

                            {/* Joke Heat Chart */}
                            <Chart
                                dislikeCount={joke.dislikeCount}
                                likeCount={joke.likeCount}
                                neutralCount={joke.neutralCount}
                            />
                        {/* Chart container ends */}
                        </div>

                    {/* Flip Container Inner ends */}
                    </div>

                    {/* Flip Container ends */}
                    </div>


                    
                    
                    {/* VOTING CONTAINER */}
                    <div className="voting-container">
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

                        {/* Hover button */}
                        <button className="button">Hover for data!</button>
                    </div>

                    
                </div>
            
            {/* Print Joke Container ends */}
            </div>


        )
    })}
    </React.Fragment>
    )
}

export default PrintJoke;
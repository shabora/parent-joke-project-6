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
            <div key={joke.key}className="print-joke-container">

                {/* Joke Card */}
                <div  index={index} id={joke.key}>
                    
                    {/* Flip Container starts */}
                    <div className="flip-container">
                    
                    {/* Flip Container Inner starts */}
                    <div className="flip-container-inner">
                        
                        {/* Joke Container starts */}
                        <div className="joke-container">
                            {/* Joke */}
                            <p>{joke.userJoke}</p>

                            {/* Name and Department*/}
                            <h3 className="print-joke-name-department">{joke.userName}, {joke.userDepartment}</h3>
                        {/* Joke Container ends */}
                        </div>

                        {/* Chart Container starts */}
                        <div className="chart-container">

                            {/* Mobile/Tablet text */}
                            <h4 className="view-stats">View the Stats:</h4>
                            {/* Legend */}
                            <p className="legend">
                            <span className="box purple"></span> Like
                            <span className="box blue"></span> Dislike
                            <span className="box grey"></span> Neutral</p>

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
                        className="counter-action increment vote-button" 
                        onClick={() => props.incrementScore(joke.key, joke.likeCount, joke.userValue)}><i className="far fa-thumbs-up vote-icon"></i>{joke.likeCount}</button>

                        {/* Neutral Button */}
                        <button 
                        className="counter-action neutral vote-button" 
                        onClick={() => props.neutralScore(joke.key, joke.neutralCount)}>
                        <i className="far fa-meh vote-icon"></i>
                        {joke.neutralCount}</button>

                        {/* Dislike button */}
                        <button className="counter-action decrement vote-button" 
                        onClick={() => props.decrementScore(joke.key, joke.dislikeCount, joke.userValue)}>
                        <i className="far fa-thumbs-down vote-icon"></i> {joke.dislikeCount}</button>
                    </div>

                {/* Joke Card ends */}
                </div>
            
            {/* Print Joke Container ends */}
            </div>


        )
    })}
    </React.Fragment>
    )
}

export default PrintJoke;
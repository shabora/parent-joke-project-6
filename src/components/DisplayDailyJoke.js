
import React, { Component } from 'react'
import GetJokeButton from './GetJokeButton';
import Typed from 'react-typed';



class DisplayDailyJoke extends Component {
    
    
    render() {
        const strings = this.props.dailyJoke
    return (
    <div>
        {this.props.jokeButtonShow === true && (
            <GetJokeButton handleDailyJoke={this.props.handleDailyJoke}
            jokeButtonShow={this.props.jokeButtonShow}

            />
        )}

        {this.props.jokeButtonShow === false && (
            <div>
                <Typed 
                    strings={[strings]} 
                    typeSpeed={50} 
                />
                <button onClick={this.props.handleDailyJoke}>Generate another joke</button>
            </div>
            
        )}
    </div>
    )
}
}

export default DisplayDailyJoke













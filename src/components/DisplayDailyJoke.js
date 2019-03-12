import React, { Component } from 'react';
import Typed from 'react-typed';
import axios from 'axios';


class DisplayDailyJoke extends Component {
  constructor() {
    super()
    this.state = {
      jokesList: null,
      jokeButtonShow: true,
    }
  }


  handleDailyJoke = () => {
    console.log(this, 'this')
    if (this.typed) {
      this.typed.reset()
    }
    axios({
      url: 'https://icanhazdadjoke.com/',
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }).then(results => {
      const returnedJoke = results.data.joke
      this.setState({
        jokesList: returnedJoke,
        jokeButtonShow: false
      })
    })
  }

  render() {

    return (
      <div className="daily-joke-container">
        <h2>Get a Joke!</h2>
        <p>Click the icon below to get your daily dose of funny!</p>

        {this.state.jokeButtonShow === true && (
          <div>
          <button
            onClick={this.handleDailyJoke}
            className="get-joke-button">
            <i class="far fa-laugh-squint"></i></button>
            <p className='lol'>Click me!</p>
            </div>
        )}

        {this.state.jokeButtonShow === false && (
          <div className="daily-joke-container">
          <div className="joke-card">
            <p><Typed
              strings={[this.state.jokesList]}
              typeSpeed={50}
              typedRef={(typed) => { this.typed = typed; }}
            /></p>
            </div>
            <button
              onClick={this.handleDailyJoke}
              className="button">Another One!</button>
          </div>
        )}
      </div>

    )
  }
}

export default DisplayDailyJoke













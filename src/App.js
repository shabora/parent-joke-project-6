import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header.js';
import Nav from './components/Nav.js';
import firebase from './components/firebase.js';
import DisplayDailyJoke from './components/DisplayDailyJoke.js';
import GetJokeButton from './components/GetJokeButton'





class App extends Component {
  constructor () {
    super()

    this.state = {
      jokesList: null,
      jokeButtonShow: true,
    }
  }


  handleDailyJoke = () => {
    axios({
      url: 'https://icanhazdadjoke.com/',
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }).then(results => {
      const returnedJoke = results.data.joke
      console.log(returnedJoke)
      this.setState({
        jokesList: returnedJoke,
        jokeButtonShow: false,
      })
    })
  }


  render () {
    return (
      <div className='App'>
        <header>
          <Header textLanding='Welcome to Shabora' />
          <nav>
            <Nav />
          </nav>
        </header>
        {/* Daily Joke Page */}
        {(this.state.jokeButtonShow === true) && <GetJokeButton handleDailyJoke={this.handleDailyJoke} />}
        {(this.state.jokeButtonShow === false) && <DisplayDailyJoke dailyJoke={this.state.jokesList} handleDailyJoke={this.handleDailyJoke} />}
        
      </div>
    )
  }
}

export default App

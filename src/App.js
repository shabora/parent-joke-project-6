import React, { Component } from 'react'
import axios from 'axios'
import Header from './components/Header.js'
import Nav from './components/Nav.js'
import firebase from './components/firebase.js'
import DisplayDailyJoke from './components/DisplayDailyJoke.js'
import GetJokeButton from './components/GetJokeButton'

const PrintJokes = props => {
  return (
    <React.Fragment>
      {props.print.map(jokeItem => {
        return (
          <div key={jokeItem.id} id={jokeItem.id}>
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



class App extends Component {
  constructor () {
    super()
    this.state = {
      jokesList: null,
      jokeButtonShow: true,
      jokesFirebase: [],
      jokesFirebaseUse: [],
      value:0
    }
  }
  /* inital function to populate firebase */
  pushToFirebase = () => {
    const dbRef = firebase.database().ref()
    dbRef.push(this.state.jokesFirebase)
    this.setState({
      jokesFirebase: []
    })
  }
  /* inital function to populate firebase */
  /* Delete before submitting */
  componentDidMount () {
    axios({
      url: 'https://icanhazdadjoke.com/search',
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      params: {
        limit: 30,
        page: 1
      }
    }).then(results => {
      console.log(results.data.results)
      this.setState({
        jokesFirebase: results.data.results
      })
    })

    // setting state with our firebase jokes
    const dbRef = firebase.database().ref()
    dbRef.on('value', response => {
      let data = response.val()
      const newList = []
      console.log(newList)

      /* console.log(data) */

      for (let key in data) {
        const newItem = data[key]
        newItem.forEach(joke => {
          newList.push({
            id: joke.id,
            joke: joke.joke,
            value: 0,
    
          })
          this.setState({
            jokesFirebaseUse: newList
          })
        })
      }
    })
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
      /*  console.log(returnedJoke) */
      this.setState({
        jokesList: returnedJoke,
        jokeButtonShow: false
      })
    })
  }

  // event handling for joke voting
  handleLikeVote = () => {
    console.log('hello')
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
        {this.state.jokeButtonShow === true && (
          <GetJokeButton handleDailyJoke={this.handleDailyJoke} />
        )}
        {this.state.jokeButtonShow === false && (
          <DisplayDailyJoke
            dailyJoke={this.state.jokesList}
            handleDailyJoke={this.handleDailyJoke}
          />
        )}
        {/* display list of jokes */}
        <PrintJokes print={this.state.jokesFirebaseUse} handleLikeVote={this.handleLikeVote} />
      </div>
    )
  }
}

export default App

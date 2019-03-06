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
      {props.print.map((jokeItem, index) => {
        return (
          <div key={jokeItem.id} index={index} id={jokeItem.id}>
            <p>{jokeItem.joke}</p>
            <button onClick={props.handleLikeVote(jokeItem.id)}>Like</button>
            <button>Don't Get It</button>
            <button onClick={props.handleLikeVote}>Dislike</button>
          </div>
        )
      })}
    </React.Fragment>
  )
}


class App extends Component {
  constructor() {
    super()
    this.state = {
      jokesList: null,
      jokeButtonShow: true,
      jokesFirebase: [],
      jokesFirebaseUse: [],
    }
  }

  // DELETE BEFORE SUBMITTING
  /* inital function to populate firebase */
  // pushToFirebase = () => {
  //   const dbRef = firebase.database().ref()
  //   dbRef.push(this.state.jokesFirebase)
  //   this.setState({
  //     jokesFirebase: [],
  //   })
  // }

  /* inital function to populate firebase */
  /* Delete before submitting */
  componentDidMount() {
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
      // console.log(results.data.results)
      const returnedArray = results.data.results;

      // returnedArray.forEach((joke) => {
      //   console.log(joke);
      // });

      returnedArray.forEach((joke) => {
        joke.index = 0
        joke.value = 0
        joke.likeCount = 0
        joke.dislikeCount = 0
        joke.neutralCount = 0
      })
      console.log(returnedArray);

      this.setState({
        jokesFirebase: returnedArray
      })
    })

    // setting state with our firebase jokes
    const dbRef = firebase.database().ref()
    dbRef.on('value', response => {
      let data = response.val()
      const newList = []
      console.log(newList)


      for (let key in data) {
        const newItem = data[key]
        newItem.forEach(joke => {
          newList.push({
            id: joke.id,
            joke: joke.joke,
            value: joke.value,
            index: joke.index,
            likeCount: joke.likeCount,
            dislikeCount: joke.dislikeCount,
            neutralCount: joke.neutralCount
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
  // after clicking like, update the like count,value and index of that joke on firebase, update the value, and the index.
  // clear firebaseuse array and then pushing the latest data from firebase.
  handleLikeVote = (id) => {
    const dbRef = firebase.database().ref(id)
    console.log(dbRef)

    }


  render() {
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
          <GetJokeButton handleDailyJoke={this.handleDailyJoke}
            pushToFirebase={this.pushToFirebase}
          />
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

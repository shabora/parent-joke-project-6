import React, { Component } from 'react'
import axios from 'axios'
import Header from './components/Header.js'
import Nav from './components/Nav.js'
import firebase from './components/firebase.js'
import DisplayDailyJoke from './components/DisplayDailyJoke.js'
import GetJokeButton from './components/GetJokeButton'
import PrintJoke from './components/PrintJoke.js';

const SubmitJoke = (props) => {
  return(
    // Form to submit your joke
    <form action="submit">
      {/* Name */}
      <label htmlFor="name" name="name">Please enter your name</label>
      <input type="text" id="name" name="userName" required placeholder="name"
      />

      {/* Department */}
      <label htmlFor="department" name="department">Please enter your department</label>
      <input type="text" id="department" name="userDepartment" required placeholder="Your department" 
      />

      {/* Joke */}
      <label htmlFor="joke" name="joke">Give us your joke!</label>
      <textarea name="userJoke" id="joke" cols="30" rows="10" required placeholder="Give us your joke!"
      
      ></textarea>

      <button type="submit">Submit it!</button>
    </form>
  )
}


class App extends Component {
  constructor() {
    super()
    this.state = {
      jokesList: null,
      jokeButtonShow: true,
      jokesFirebaseUse: [],
      userName: "",
      userDepartment: "",
      userJoke: "",
    }
  }

  // Handle change to get text inputs from submit joke
  handleChange = (event) => {
    event.preventDefault();
    const userName = event.target.userName.value;
    const userDepartment = event.target.userDepartment.value;
    const userJoke = event.target.userJoke.value;
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
  componentDidMount() {




    // setting state with our firebase jokes
    const dbRef = firebase.database().ref()
    dbRef.on('value', response => {
      let data = response.val()
      console.log("This is data", data);
      const newList = []
      // console.log(newList)

      /* console.log(data) */

      for (let key in data) {
        const newItem = data[key]
        console.log("This is new item", newItem);
        newItem.forEach(joke => {
          newList.push({
            id: joke.id,
            joke: joke.joke,
            index: joke.index,
            value: joke.value, 
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
  handleLikeVote = (jokeId) => {
    console.log(jokeId);

    const dbRef = firebase.database().ref(jokeId);
    dbRef.update({value: 2});
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

        <SubmitJoke />

        {/* {/* display list of jokes */}
        <PrintJoke print={this.state.jokesFirebaseUse} handleLikeVote={this.handleLikeVote} />
      </div>
    )
  }
}

export default App
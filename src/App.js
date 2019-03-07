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
    <form action="submit" onSubmit={props.handleJokeSubmit}>
      {/* Name */}
      <label htmlFor="name" name="name">Please enter your name</label>

      <input  type="text" id="name" name="userName" required placeholder="name"
      onChange={props.handleChange}
      value={props.userSubmittedJoke.userName}
      />

      {/* Department */}
      <label htmlFor="department" name="department">Please enter your department</label>
      <input type="text" id="department" name="userDepartment" required placeholder="Your department" 
      onChange={props.handleChange}
      value={props.userSubmittedJoke.userDepartment}  
      />

      {/* Joke */}
      <label htmlFor="joke" name="joke">Give us your joke!</label>
      <textarea name="userJoke" id="joke" cols="30" rows="10" required placeholder="Give us your joke!"
      
      onChange={props.handleChange}
      value={props.userSubmittedJoke.userJoke}></textarea>

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
      userSubmittedJoke: {
        userName: "",
        userDepartment: "",
        userJoke: "",
        userValue:0,
        userIndex:0,
        likeCount:0,
        dislikeCount:0,
        neutralCount:0,
        key:'',
      }
      
    }
  }

  // Handle change to get text inputs from submit joke
  handleChange = (event) => {
    
    const newObject = Object.assign(this.state.userSubmittedJoke)
    newObject[event.target.name] = event.target.value
 
  
     this.setState({
      userSubmittedJoke:newObject
    }) 
  }

  handleJokeSubmit = (event) =>{
    event.preventDefault();
    const dbRef = firebase.database().ref()
    dbRef.push(this.state.userSubmittedJoke)
    this.setState({
      userSubmittedJoke: {
        userName: '',
        userDepartment: '',
        userJoke:'',
      }
    })
  }

  /* inital function to populate firebase */

  /* inital function to populate firebase */
  /* Delete before submitting */
 

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

  // event handling for joke votin

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

        <SubmitJoke
        handleChange={this.handleChange}
        handleJokeSubmit={this.handleJokeSubmit}
        userSubmittedJoke={this.state.userSubmittedJoke} />

        {/* {/* display list of jokes */}
        <PrintJoke print={this.state.jokesFirebaseUse} handleLikeVote={this.handleLikeVote} />
      </div>
    )
  }
}

export default App
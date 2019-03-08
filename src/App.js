import React, {
  Component
} from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Header from './components/Header.js'
import Nav from './components/Nav.js'
import firebase from './components/firebase.js'
import DisplayDailyJoke from './components/DisplayDailyJoke.js'
import PrintJoke from './components/PrintJoke.js';
import SubmitJoke from './components/SubmitJoke.js';
import LandingPage from './components/LandingPage.js';




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
        userValue: 0,
        userIndex: 0,
        likeCount: 0,
        dislikeCount: 0,
        neutralCount: 0,
        key: '',
      }

    }
  }



  componentDidMount() {
    const dbRef = firebase.database().ref()
    dbRef.on('value', response => {
      let data = response.val()
      // console.log("This is data", data);
      // console.log(data)
      const newList = []
      for (let key in data) {
        // console.log(data[key])
        data[key].key = key

        newList.push(data[key])
      }
      // console.log(newList);
      this.setState({
        jokesFirebaseUse: newList,
      })
      const newArray = this.state.jokesFirebaseUse.sort((a, b) => parseFloat(b.userValue) - parseFloat(a.userValue));
      console.log(newArray)

    })
  }

  sortObject = () => {


  }


  /* function compare(a, b) {
    if (a.last_nom < b.last_nom)
      return -1;
    if (a.last_nom > b.last_nom)
      return 1;
    return 0;
  } */




  // Counter Handling
  incrementScore = (id, like, value) => {
    const dbRef = firebase.database().ref(id);
    dbRef.update({

      likeCount: like + 1,
      userValue: value + 1
    })
  }

  decrementScore = (id, dislike, value) => {
    const dbRef = firebase.database().ref(id);
    dbRef.update({
      dislikeCount: dislike + 1,
      userValue: value - 1
    })

  }

  neutralScore = (id, value) => {
    const dbRef = firebase.database().ref(id);
    dbRef.update({
      neutralCount: value + 1
    })
  }

  // Handle change to get text inputs from submit joke
  handleChange = (event) => {

    const newObject = Object.assign(this.state.userSubmittedJoke)
    newObject[event.target.name] = event.target.value


    this.setState({
      userSubmittedJoke: newObject
    })
  }

  handleJokeSubmit = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref()
    dbRef.push(this.state.userSubmittedJoke)
    this.setState({
      userSubmittedJoke: {
        userName: '',
        userDepartment: '',
        userJoke: '',

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

  // event handling for joke votin

  render() {
      return ( <
          Router >
          <
          div className = 'App' >
          <
          header >
          <
          Header textLanding = 'Welcome to Shabora' / >

          <
          nav >
          <
          Nav



          /
          >
          <
          /nav>

          <
          /header>


          {
            /* LANDING PAGE PLACE HOLDER */ } <
          Route path = "/"
          exact component = {
            LandingPage
          }
          />



          {
            /* Daily Joke Page */ } <
          Route path = "/dailyjoke"
          render = {
            () => {
              return ( < DisplayDailyJoke dailyJoke = {
                    this.state.jokesList
                  }
                  handleDailyJoke = {
                    this.handleDailyJoke
                  }
                  />)}} 

                  /
                  >

                  <
                  Route path = "/submitjoke"
                  render = {
                    () => {
                      return ( < SubmitJoke handleChange = {
                            this.handleChange
                          }
                          handleJokeSubmit = {
                            this.handleJokeSubmit
                          }
                          userSubmittedJoke = {
                            this.state.userSubmittedJoke
                          }
                          />)}}  / >


                          <
                          Route path = "/vote"
                          render = {
                            () => {
                              return ( < PrintJoke incrementScore = {
                                  this.incrementScore
                                }
                                decrementScore = {
                                  this.decrementScore
                                }
                                neutralScore = {
                                  this.neutralScore
                                }
                                jokesFirebaseUse = {
                                  this.state.jokesFirebaseUse
                                }
                                />)}}/ >





                                {
                                  /*  <SubmitJoke
                                              handleChange={this.handleChange}
                                              handleJokeSubmit={this.handleJokeSubmit}
                                              userSubmittedJoke={this.state.userSubmittedJoke} /> */
                                }

                                {
                                  /* {/* display list of jokes */ } {
                                  /*  <PrintJoke 
                                             incrementScore={this.incrementScore}
                                             decrementScore={this.decrementScore}
                                             neutralScore={this.neutralScore}
                                             jokesFirebaseUse={this.state.jokesFirebaseUse} /> */
                                } <
                                /div> <
                                /Router>

                              )
                            }
                          }

                          export default App
import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header.js';
import Nav from './components/Nav.js';
import firebase from './components/firebase.js';
import DisplayDailyJoke from './components/DisplayDailyJoke.js';
import GetJokeButton from './components/GetJokeButton'






class VoteOnJokes extends Component {
  componentDidMount(){
    const dbRef = firebase.database().ref();
    dbRef.on('value', response=>{
    const data = response.val();
    const newList = []
    console.log(data) 
  

    for(let item in data){
      console.log(item)
      newList.push({
        id: item.id,
        joke: item.joke,
        value: 0

      })
      this.setState({
        jokesFirebaseUse: newList,
      })
    } 
  
    

    })
  }
  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    )
  }
}







class App extends Component {
  constructor () {
    super()

    this.state = {
      jokesList: null,
      jokeButtonShow: true,
      jokesFirebase:[],
      jokesFirebaseUse:[]
    }
  }
  /* inital function to populate firebase */
  pushToFirebase = () =>{
    const dbRef = firebase.database().ref()
    dbRef.push(this.state.jokesFirebase);
    this.setState({
      jokesFirebase:[],
    })
  }
/* inital function to populate firebase */
/* Delete before submitting */
componentDidMount(){
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
    console.log(results.data.results);
    this.setState({
      jokesFirebase: results.data.results
    })
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
        {/* display list of jokes */}
        <VoteOnJokes/>
        
      </div>
    )
  }
}

export default App

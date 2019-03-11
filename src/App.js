import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header.js'
import Nav from './components/Nav.js'
import firebase from './components/firebase.js'
import DisplayDailyJoke from './components/DisplayDailyJoke.js'
import PrintJoke from './components/PrintJoke.js';
import SubmitJoke from './components/SubmitJoke.js';
import LandingPage from './components/LandingPage.js';
import './app.scss';


class App extends Component {
  constructor() {
    super()
    this.state = {
      jokesList: null,
      jokeButtonShow: true,
      jokesFirebaseUse: [],
      showNav: false,
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

  // once component mounts, run the .val() method on what dBRef returns and store it in a variable called data. (data is an object containing all the jokes in individual objects)
  // create an empty array (newList). run a for in loop on data and store every joke containing object in the empty array.
  // sort.() will sort the joke objects in order of highest userValue.
  // populate the setState of jokesFirebaseUse with the newList array.
  componentDidMount() {
    const dbRef = firebase.database().ref()
    dbRef.on('value', response => {
      let data = response.val()
      const newList = []
      for (let key in data) {
        data[key].key = key
        newList.push(data[key])
      }
      newList.sort((a, b) => parseFloat(b.userValue) - parseFloat(a.userValue));
      this.setState({
        jokesFirebaseUse: newList,
      })
    })
  }

  // this function will run on the click of the 'thumbs up' button. 'id' ensures only the joke with that ID gets updated.
  incrementScore = (id, like, value) => {
    const dbRef = firebase.database().ref(id);
    dbRef.update({
      likeCount: like + 1,
      userValue: value + 1
    })
  }

  // this function will run on the click of the thumbs down button.
  decrementScore = (id, dislike, value) => {
    const dbRef = firebase.database().ref(id);
    dbRef.update({
      dislikeCount: dislike + 1,
      userValue: value - 1
    })
  }

  // this function will run on the click of the :| button.
  neutralScore = (id, value) => {
    const dbRef = firebase.database().ref(id);
    dbRef.update({
      neutralCount: value + 1
    })
  }

  // this function will run when the user enters a character in a text input. 
  // this.state.userSubmittedJoke is the object with a change in the text inputs. it gets assigned to an object called newObject.
  // then instead of changing the current state of userSubmittedJoke, we update the setState of userSubmittedJoke to newObject.
  handleChange = (event) => {
    const newObject = Object.assign(this.state.userSubmittedJoke)
    newObject[event.target.name] = event.target.value
    this.setState({
      userSubmittedJoke: newObject
    })
  }

  // this function will run when the user submits the form.
  // it pushes the the  to firebase and updates the setState of userSubmittedJoke.
  // then we clear out form by providing the setState with empty properties.
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

  // this function will run when the 'click me' button in daily joke section is clicked.
  // it makes a call to the api and returns a random object which contains the joke. we store the string inside the 'joke' property inside of a variable called returnedJoke.
  // we update the setState of jokesList with returnedJoke and hide the 'click me' button.
  handleDailyJoke = () => {
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

  // this function will run when the nav button gets clicked.
  // it updates the setState of the opposite of the current boolean. (shows and hides nav)
  handleNavShow = () => {
    this.setState({
      showNav: !this.state.showNav,
    })
  }


  render() {
    return (
      <Router>
        <div className='App'>
          {/* wrapper starts */}
          <div className="wrapper">

            {/* header starts */}
            <header>
              <Header textLanding='Shabora Global' />
              <nav>
                <Nav
                  showNav={this.state.showNav}
                  handleNavShow={this.handleNavShow}
                />
              </nav>
            </header>


            {/* landing page starts */}
            <Route path="/" exact render={() => { return (<LandingPage jokesFirebaseUse={this.state.jokesFirebaseUse} />) }}
            />

            {/* daily joke page starts */}
            <Route path="/dailyjoke" render={() => {
              return (<DisplayDailyJoke dailyJoke={this.state.jokesList}
                handleDailyJoke={this.handleDailyJoke} jokeButtonShow={this.state.jokeButtonShow}
              />)
            }} />

            {/* submit joke page starts */}
            <Route path="/submitjoke" render={() => {
              return (<SubmitJoke handleChange={this.handleChange}
                handleJokeSubmit={this.handleJokeSubmit}
                userSubmittedJoke={this.state.userSubmittedJoke} />)
            }} />

            {/* joke voting page starts */}
            <Route path="/vote" render={() => {
              return (<PrintJoke incrementScore={this.incrementScore}
                decrementScore={this.decrementScore}
                neutralScore={this.neutralScore}
                jokesFirebaseUse={this.state.jokesFirebaseUse} />)
            }} />
          </div>

          {/* WRAPPER ENDS */}
        </div>
      </Router>
    )
  }
}

export default App
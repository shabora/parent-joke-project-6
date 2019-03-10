import React, { Component } from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Route} from 'react-router-dom';
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
        userValue:0,
        userIndex:0,
        likeCount:0,
        dislikeCount:0,
        neutralCount:0,
        key:'',
      }
      
    }
  }



  componentDidMount(){
    const dbRef = firebase.database().ref()
    dbRef.on('value', response => {
      let data = response.val()
      // console.log("This is data", data);
      // console.log(data)
      const newList = []  
      for(let key in data){
        // console.log(data[key])
        data[key].key = key 
    
        newList.push(data[key])
      }
      newList.sort((a, b) => parseFloat(b.userValue) - parseFloat(a.userValue));
      // console.log(newList);
      this.setState({
        jokesFirebaseUse: newList,
      })

    })
  }


  // Counter Handling
  incrementScore = (id, like, value) => {
      const dbRef = firebase.database().ref(id);
      dbRef.update({

          likeCount: like +1,
          userValue: value +1  
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

  // EVENT HANDLING

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

  handleNavShow = () => {
    this.setState({
      showNav: !this.state.showNav,
    })
  }

  // event handling for joke votin

  render() {
    return (
      <Router>
        <div className='App'>
          {/* WRAPPER STARTS */}
          <div className="wrapper">
          
          {/* HEADER STARTS */}
          <header>
            <nav>
              <Nav 
              showNav={this.state.showNav}
              handleNavShow={this.handleNavShow}    
              />
            </nav>
            
            <Header textLanding='Shabora Global' />

            
          {/* HEADER ENDS */}
          </header>
         

          {/* LANDING PAGE PLACE HOLDER */}
          <Route path="/" exact render={() => { return (<LandingPage jokesFirebaseUse={this.state.jokesFirebaseUse}/>)}} />
          
          

          {/* Daily Joke Page */}
          <Route path="/dailyjoke" render={()=>{return(<DisplayDailyJoke dailyJoke={this.state.jokesList}
            handleDailyJoke={this.handleDailyJoke} jokeButtonShow={this.state.jokeButtonShow}
          />)}} 
        
          />

          <Route path="/submitjoke" render={()=> {return(<SubmitJoke handleChange={this.handleChange}
          handleJokeSubmit={this.handleJokeSubmit}
          userSubmittedJoke={this.state.userSubmittedJoke}/>)}}  />


          <Route path="/vote" render={()=>{return(<PrintJoke incrementScore={this.incrementScore}
        decrementScore={this.decrementScore}
        neutralScore={this.neutralScore}
        jokesFirebaseUse={this.state.jokesFirebaseUse}/>)}}/> 
        </div>

          {/* WRAPPER ENDS */}
          </div>
      </Router>
      
    )
  }
}

export default App
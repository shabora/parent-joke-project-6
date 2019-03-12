import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from './components/Header.js'
import Nav from './components/Nav.js'
import firebase from './components/firebase.js'
import DisplayDailyJoke from './components/DisplayDailyJoke.js'
import PrintJoke from './components/PrintJoke.js';
import SubmitJoke from './components/SubmitJoke.js';
import LandingPage from './components/LandingPage.js';
import Footer from './components/Footer';
import './app.scss';

class App extends Component {
  constructor() {
    super()
    this.state = {
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
    // Get the jokes stored in Firebase
    const dbRef = firebase.database().ref()
    dbRef.on('value', response => {
      let data = response.val()
 
      // Set up an empty array to hold what comes back from Firebase (NewList)
      const newList = []  
      for(let key in data){
        data[key].key = key 
    
        newList.push(data[key])
      }

      // Sort through the new list to return the jokes in order of highest User Value to lowest
      newList.sort((a, b) => parseFloat(b.userValue) - parseFloat(a.userValue));

      // Set the state so that Jokes Firebase Use reflects the sorted data from Firebase
      this.setState({
        jokesFirebaseUse: newList,
      })
    })
  }

  // Counter Handling

  // When the user hits the 'like' button
  incrementScore = (id, like, value) => {
    // target the joke that the user is voting on in Firebase, using id
      const dbRef = firebase.database().ref(id);

      // Update the likeCount and userValue by 1
      dbRef.update({
          likeCount: like +1,
          userValue: value +1  
        })  
      }

    // When the user hits the 'dislike' button
    decrementScore = (id, dislike, value) => {
        // target the joke that the user is voting on in Firebase, using id
        const dbRef = firebase.database().ref(id);

         // Update the dislikeCount by adding 1 and userValue by subtracting 1
        dbRef.update({
          dislikeCount: dislike + 1,
          userValue: value - 1
        })    
      }

    // When the user hits the 'neutral' button
    neutralScore = (id, value) => {
        // target the joke that the user is voting on in Firebase, using id
        const dbRef = firebase.database().ref(id);

        // Update the neutralCount by adding 1
        dbRef.update({
          neutralCount: value + 1
        })
      }


  // EVENT HANDLING
  // Handle change to get text inputs from submit joke
  handleChange = (event) => {
    
    // Create a new variable called newObject and use it to make a copy of userSubmittedJoke
    const newObject = Object.assign(this.state.userSubmittedJoke)

    // Update newObject when the user updates an input
    newObject[event.target.name] = event.target.value

    // Set the state with the user's inputs
    this.setState({
      userSubmittedJoke:newObject
    }) 
  }

  handleJokeSubmit = (event) =>{
    // Stop the page from refreshing on submit
    event.preventDefault();

    // Update our Firebase database with the joke the user has submitted
    const dbRef = firebase.database().ref()
    dbRef.push(this.state.userSubmittedJoke)

    // Set the state back to empty strings for the three user inputs
    this.setState({
      userSubmittedJoke: {
        ...this.state.userSubmittedJoke,
        userName: '',
        userDepartment: '',
        userJoke:'',
      
      }
    })

    // Fire a Sweet Alert thanking the user for submitting a joke
    Swal.fire({
      title: 'Thank you!',
      html:
        'Your joke has been submitted! ' +
        `Please head over to <a href="vote" className="sweet-alerts-anchor">Vote on Joke</a> ` +
        'to see it live!',
      type: 'success',
    })
  }

  // When the hamburger menu or navLinks are clicked, toggle the class of showNav
  handleNavShow = () => {
    this.setState({
      showNav: !this.state.showNav,
    })
  }

  render() {
    return (
      <Router>
        <div className='App'>

          {/* WRAPPER STARTS */}
          <div className="wrapper">
          
            {/* HEADER STARTS */}
            <header>
              {/* Nav component */}
              <nav>
                <Nav 
                showNav={this.state.showNav}
                handleNavShow={this.handleNavShow}    
                />
              </nav>
              
              {/* Header component */}
              <Header textLanding='Parent Joke' />
            {/* HEADER ENDS */}
            </header>

            {/* Landing Page */}
            <Route path="/" exact render={() => { return (<LandingPage jokesFirebaseUse={this.state.jokesFirebaseUse}/>)}} />
            
            {/* Daily Joke Page */}
            <Route path="/dailyjoke" render={()=>{return(<DisplayDailyJoke/>)}} />

            {/* Submit Joke page */}
            <Route path="/submitjoke" render={()=> {return(<SubmitJoke handleChange={this.handleChange}
            handleJokeSubmit={this.handleJokeSubmit}
            userSubmittedJoke={this.state.userSubmittedJoke}/>)}}  />

            {/* Vote on Joke page */}
            <Route path="/vote" render={()=>{return(<PrintJoke incrementScore={this.incrementScore}
          decrementScore={this.decrementScore}
          neutralScore={this.neutralScore}
          jokesFirebaseUse={this.state.jokesFirebaseUse}/>)}}/> 

          <Route path="/vote" render={()=>{return(<PrintJoke incrementScore={this.incrementScore}
        decrementScore={this.decrementScore}
        neutralScore={this.neutralScore}
        jokesFirebaseUse={this.state.jokesFirebaseUse}/>)}}/>
          
        </div>
          <Footer/> 
          {/* WRAPPER ENDS */}
          
          </div>
      </Router>
      
    )
  }
}

export default App
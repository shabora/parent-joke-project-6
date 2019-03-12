import React, { Component } from 'react'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
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
    /*   jokesList: null,
      jokeButtonShow: true, */
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
        ...this.state.userSubmittedJoke,
        userName: '',
        userDepartment: '',
        userJoke:'',
      
      }
    })

    Swal.fire({
      title: 'Thank you!',
      html:
        'Your joke has been submitted! ' +
        `Please head over to <a href="vote">Vote on Joke</a> ` +
        'to see it live!',
      type: 'success',
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
            
            <Header textLanding='Parent Joke' />

            
          {/* HEADER ENDS */}
          </header>
         

          {/* LANDING PAGE PLACE HOLDER */}
          <Route path="/" exact render={() => { return (<LandingPage jokesFirebaseUse={this.state.jokesFirebaseUse}/>)}} />
          
          

          {/* Daily Joke Page */}
          <Route path="/dailyjoke" render={()=>{return(<DisplayDailyJoke/>)}} 
        
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
          <Footer/>
          </div>
      </Router>
      
    )
  }
}

export default App
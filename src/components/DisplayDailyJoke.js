import React, { Component } from 'react'
import GetJokeButton from './GetJokeButton';
import Typed from 'react-typed';
import axios from 'axios'

class DisplayDailyJoke extends Component {
   constructor(){
       super()
       this.state={
           jokesList:null,
           jokeButtonShow:true,
       }
   }



    handleDailyJoke = () => {
     console.log(this, 'this')
     if(this.typed ){
         this.typed.reset()
     }
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
    
    render() {
        
    return (
    <div>
        {this.state.jokeButtonShow === true && (
            <GetJokeButton handleDailyJoke={this.handleDailyJoke}
            jokeButtonShow={this.state.jokeButtonShow}

            />
        )}

        {this.state.jokeButtonShow === false && (
            <div>
            <p> <Typed 
                    strings={[this.state.jokesList]} 
                    typeSpeed={50} 
                    typedRef={(typed) => { this.typed = typed; }}
                /></p>        
                <button onClick={this.handleDailyJoke} >Generate another joke</button>
            </div>
            
        )}
    </div>
    )
}
}

export default DisplayDailyJoke













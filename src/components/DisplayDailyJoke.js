import React, {Component} from 'react';
import Typed from 'react-typed';
import axios from 'axios';


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
    <div className="daily-joke-container">
        {this.state.jokeButtonShow === true && (
            <button
                onClick={this.handleDailyJoke}
                className="button">
                Click Me</button>
        )}

        {this.state.jokeButtonShow === false && (
            <div className="joke-card">
                    <p><Typed
                        strings={[this.state.jokesList]}
                        typeSpeed={50}
                        typedRef={(typed) => { this.typed = typed; }}
                    /></p>
                <button 
                onClick={this.handleDailyJoke}
                className="button">Generate another joke</button>
            </div>
        )}
    </div>
    
    )
}
}

export default DisplayDailyJoke













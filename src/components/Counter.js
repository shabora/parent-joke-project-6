import React, { Component } from 'react';
import firebase from './firebase.js'

class Counter extends Component {
    constructor(){
        super()

        this.state = {
            userValue: 0,
            userIndex: 0,
            likeCount: 0,
            dislikeCount: 0,
            neutralCount: 0,
        };
    }

    componentDidMount(props){
        const dbRef = firebase.database().ref(this.props.jokeId)
        dbRef.on('value', response => {
            let data = response.val()
            console.log(data);

            const valueFromFirebase = data.userValue;
            const indexFromFirebase = data.index;
            const likeFromFirebase = data.likeCount;
            const dislikeFromFirebase = data.dislikeCount;
            const neutralFromFirebase = data.neutralCount;

            this.setState({
                userValue: valueFromFirebase,
                userIndex: indexFromFirebase,
                likeCount: likeFromFirebase,
                dislikeCount: dislikeFromFirebase,
                neutralCount: neutralFromFirebase,
            })
        })
}
    
    incrementScore = (props) => {
        this.setState(prevState => ({
            userValue: prevState.userValue + 1,
            likeCount: prevState.likeCount + 1
        }));
        console.log(this.props.jokeId);
        const dbRef = firebase.database().ref(this.props.jokeId);
            dbRef.update({
                userValue: this.state.userValue,
                likeCount: this.state.likeCount
            })
    }

    decrementScore = (props) => {
        this.setState(prevState => ({
            userValue: prevState.userValue - 1,
            dislikeCount: prevState.dislikeCount + 1
        }));
        const dbRef = firebase.database().ref(this.props.jokeId);
        dbRef.update({
            userValue: this.state.userValue,
            dislikeCount: this.state.dislikeCount
        })
    }

    neutralScore = (props) => {
        this.setState(prevState => ({
            neutralCount: prevState.neutralCount + 1
        }))
        const dbRef = firebase.database().ref(this.props.jokeId);
        dbRef.update({
            neutralCount: this.state.neutralCount
        })
    }

    render() {
        return (
            <div className="counter">
                <button className="counter-action increment" onClick={this.incrementScore}>Like is at{this.state.likeCount}</button>
                <button onClick={this.neutralScore}>Don't Get It {this.state.neutralCount}</button>
                <button className="counter-action decrement" onClick={this.decrementScore}>Don't Like it is {this.state.dislikeCount}</button>
                
            </div>
        );
    }
}

export default Counter;
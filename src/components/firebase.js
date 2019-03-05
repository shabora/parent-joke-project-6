import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA0pOgOWEorhPYkRx6foZ1bpez20yCEAXo",
    authDomain: "parent-joke.firebaseapp.com",
    databaseURL: "https://parent-joke.firebaseio.com",
    projectId: "parent-joke",
    storageBucket: "parent-joke.appspot.com",
    messagingSenderId: "79979814437"
};
firebase.initializeApp(config);

export default firebase;
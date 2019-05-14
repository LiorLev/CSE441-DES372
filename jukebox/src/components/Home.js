import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
import logo from '../logo.svg';
import '../App.css';

const firebaseApp = firebase.initializeApp(firebaseConfig);

class Home extends Component {

    constructor(props) {
        super(props);
        this.spaceFunction = this.spaceFunction.bind(this);
    }

    spaceFunction(event) {
        if (event.keyCode === 32) {
            //Do whatever when esc is pressed
            this.props.history.push("/choose-song");
            // console.log("hey");
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.spaceFunction, false);
    }

    render() {
        const {
            user,
            signOut,
            signInWithGoogle,
        } = this.props;

        return (
            <div className="App">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    {
                        user
                            ? <p>Hello, {user.displayName}! please press enter to choose a song</p>
                            : <p>Please sign in.</p>
                    }
                    {
                        user
                            ? <button onClick={signOut}>Sign out</button>
                            : <button onClick={signInWithGoogle}>Sign in with Google</button>
                    }
                </header>
            </div>
        );
    }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(Home);
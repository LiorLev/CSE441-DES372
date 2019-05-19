import React, { Component } from 'react';
import 'firebase/auth';
import '../App.css';
import { withRouter } from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);
        console.log("props", this.props);
    }

    spaceFunction = (event) => {
        if (event.keyCode === 32) {
            this.props.history.push("/choose-genre");
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
        } = this.props.firebaseAuth;

        return (
            <div className="App">
                <header className="App-header">
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

export default withRouter(Home);

// const firebaseAppAuth = firebaseApp.auth();

// const providers = {
//     googleProvider: new firebase.auth.GoogleAuthProvider(),
// };

// export default withFirebaseAuth({
//     providers,
//     firebaseAppAuth,
// })(Home);
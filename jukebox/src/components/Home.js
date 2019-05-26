import React, { Component } from 'react';
import 'firebase/auth';
import '../App.css';
import { withRouter } from 'react-router-dom';

class Home extends Component {

    spaceFunction = (event) => {
        console.log("home space click");
        if (event.keyCode === 32) {
            this.props.history.push("/choose-genre");
        }
    }

    componentDidMount() {      

        document.addEventListener("keydown", this.spaceFunction, false);


        let data = this.props.firebaseData.database().ref('jukebox/messages');

        let props = this.props;

        data.on("value", function (snapshot) {
            // console.log(snapshot.val());
            let res = snapshot.val();

            var arr = [];
            Object.keys(res).forEach(function (key) {
                arr.push(res[key]);
            });

            // console.log("array of json obj: ", arr);
            let userSent = arr[2];
            // console.log("hey", userSent);
            if (userSent != "" && props.firebaseData.auth().currentUser.displayName != userSent) {
                props.history.push('/receive-song');
            }

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        })
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.spaceFunction, false);

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
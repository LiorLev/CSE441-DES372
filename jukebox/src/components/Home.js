import React, { Component } from 'react';
import 'firebase/auth';
import '../App.css';
import { withRouter } from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {nowplaying: "", artist: ""};
    }

    spaceFunction = (event) => {
        if (event.keyCode === 32) {
            this.props.history.push("/choose-genre");
        }
    }

    componentDidMount() {
        let nameAndArtist = window.location.href.split('song=')[1];
        let arrayOfSong = nameAndArtist.split('_');

        let songartist = arrayOfSong[1].split('-').join(' ');
        let title = arrayOfSong[0].split('-').join(' ');

        title.indexOf('%27') != -1 ? title = title.replace('%27', "'") : title = title;

        songartist.indexOf('#/') != -1 ? songartist = songartist.replace('#/', "") : songartist = songartist;


        this.setState({nowplaying: title, artist: songartist})

        document.addEventListener("keydown", this.spaceFunction, false);

        let data = this.props.firebaseData.database().ref('jukebox/messages');

        let props = this.props;
        
        data.on("value", function (snapshot) {
            let res = snapshot.val();

            var arr = [];
            Object.keys(res).forEach(function (key) {
                arr.push(res[key]);
            });

            let userSent = "";
            if (arr[0] != "" && arr[2] != "" && arr[3] != "") {
                userSent = arr[4];
                songartist = arr[2];
                title = arr[3];
            }

            if (userSent && props.firebaseData.auth().currentUser.displayName != userSent) {
                props.history.push({ pathname: '/receive-song', state: { id: arr[1], title: arr[3], artist: arr[2] } });
            }


        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
        
        
    }

    componentWillUnmount() {
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
                            ? <div>
                                <p style={{ fontSize: '50px', marginBottom: '93px' }}><strong>Now Playing:</strong> {this.state.nowplaying.toString()}</p>
                                <p style={{ fontSize: '50px' }}><strong>Artist:</strong> {this.state.artist.toString()}</p>
                            </div>
                            : <p>Please sign in.</p>
                    }
                    {
                        user
                            ? <button className="sign-in" onClick={signOut}>Sign out</button>
                            : <button className="sign-in" onClick={signInWithGoogle}>Sign In with Google</button>
                    }
                </header>
            </div>
        );
    }
}

export default withRouter(Home);
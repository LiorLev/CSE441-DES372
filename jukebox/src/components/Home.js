import React, { Component } from 'react';
import 'firebase/auth';
import '../App.css';
import { withRouter } from 'react-router-dom';
import SadReact from './sadreact';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = { nowplaying: "", artist: "", react: false, reaction: '' };
    }

    spaceFunction = (event) => {
        if (event.altKey && event.code == 'AltRight') {
            this.props.history.push("/choose-genre");
        } else if (event.keyCode === 85) {
            this.setState({
                react: true,
                reaction: 'https://i.imgur.com/RsobDg4.png'
            });

            setTimeout(() => {
                this.setState({
                    react: false,
                    reaction: ''
                });
            }, 1500);

        } else if (event.keyCode === 73) {
            this.setState({
                react: true,
                reaction: 'https://i.imgur.com/kTjaDoi.png'
            });

            setTimeout(() => {
                this.setState({
                    react: false,
                    reaction: ''
                });
            }, 1500);

        } else if (event.keyCode === 80) {
            this.setState({
                react: true,
                reaction: 'https://i.imgur.com/eWkGDr0.png'
            });

            setTimeout(() => {
                this.setState({
                    react: false,
                    reaction: ''
                });
            }, 1500);

        } else if (event.keyCode === 221) {
            this.setState({
                react: true,
                reaction: 'https://i.imgur.com/ZE1J401.png'
            });

            setTimeout(() => {
                this.setState({
                    react: false,
                    reaction: ''
                });
            }, 1500);

        }
    }

    // getanimations() {
    //     return <marquee behavior="scroll" direction="down">
    //         <img src="https://i.imgur.com/T1EWZ5F.png" width="72" height="79" alt="Flying Bee" />
    //     </marquee>
    // }

    componentDidMount() {
        // if(this.state.react == true){
        //     setTimeout( () => {

        //     })
        // }
        let currUser = "";
        this.props.firebaseData.auth().onAuthStateChanged(user => {
            currUser = (user.displayName);
        });

        document.addEventListener("keydown", this.spaceFunction, false);

        let data = this.props.firebaseData.database().ref('jukebox/messages');

        let props = this.props;

        data.on("value", function (snapshot) {
            let res = snapshot.val();

            console.log("res", res);
            // var arr = [];
            // Object.keys(res).forEach(function (key) {
            //     arr.push(res[key]);
            // });

            // console.log("home", arr);
            let userSent = "";
            console.log(res[5]);
            if (res['userName']) {
                userSent = res[5];
                console.log("curr", currUser);
                // console.log("sent", userSent);




                // console.log("home" , arr);
                if (userSent != "" && currUser != userSent) {
                    console.log("in receive");
                    props.history.push({ pathname: '/receive-song', state: { id: res['id'], title: res['songName'], artist: res['songArtist'], genre: res['genre'] } });
                }
            }
            // let currUser = "";
            // props.firebaseData.auth().onAuthStateChanged(user => {
            //     currUser = user;
            // });



        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        let nowplaying = this.props.firebaseData.database().ref('jukebox/nowplaying');

        let t = this;
        nowplaying.on("value", function (snapshot) {
            let res = snapshot.val();
            var arr = [];

            if (snapshot.val()) {
                Object.keys(res).forEach(function (key) {
                    arr.push(res[key]);
                });
                t.setState({ nowplaying: arr[1], artist: arr[0] })

            }
            // console.log(arr);


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
                <div className={!this.state.react ? 'hidden' : ''}>
                    <SadReact reaction={this.state.reaction}></SadReact>
                </div>

                {/* className="App-header" */}
                <header className={(this.state.react ? 'hidden' : '') + "App-header"}>
                    {
                        user
                            ? <div>
                                <p style={{ fontSize: '30px' }}>Songs in queue: 0</p>
                                <p style={{ fontSize: '50px', marginBottom: '-40px' }}><strong>Now Playing:</strong> {this.state.nowplaying.toString()}</p>
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
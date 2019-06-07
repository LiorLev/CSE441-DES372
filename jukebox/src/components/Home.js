import React, { Component } from 'react';
import 'firebase/auth';
import '../App.css';
import { withRouter } from 'react-router-dom';
import ReactionEmojis from './ReactionEmojisAllen';
import ReactModal from 'react-modal';
import memeDatabase from '../memes';


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = { nowplaying: "", artist: "", react: false, reaction: '', userAcceptedOrRejected: false, meme: '' };
    }

    spaceFunction = (event) => {
        if (event.altKey && event.code == 'AltRight') {
            this.props.history.push("/choose-genre");
        } else if (event.keyCode === 85) {
            let emoji = this.props.firebaseData.auth().currentUser.displayName == "Allen Building" ? 'https://i.imgur.com/XEGA2Mn.png' : 'https://i.imgur.com/RsobDg4.png'

            this.setState({
                react: true,
                reaction: emoji
            });

            setTimeout(() => {
                this.setState({
                    react: false,
                    reaction: ''
                });
            }, 2000);

            let data = this.props.firebaseData.database().ref('jukebox/reaction');

            data.set({
                username: this.props.firebaseData.auth().currentUser.displayName,
                reaction: emoji
            });

        } else if (event.keyCode === 73) {
            let emoji = this.props.firebaseData.auth().currentUser.displayName == "Allen Building" ? 'https://i.imgur.com/vysfR6i.png' : 'https://i.imgur.com/kTjaDoi.png'

            this.setState({
                react: true,
                reaction: emoji
            });

            setTimeout(() => {
                this.setState({
                    react: false,
                    reaction: ''
                });
            }, 2000);

            let data = this.props.firebaseData.database().ref('jukebox/reaction');

            data.set({
                username: this.props.firebaseData.auth().currentUser.displayName,
                reaction: emoji
            });

        } else if (event.keyCode === 80) {
            let emoji = this.props.firebaseData.auth().currentUser.displayName == "Allen Building" ? 'https://i.imgur.com/r85rt33.png' : 'https://i.imgur.com/eWkGDr0.png'

            this.setState({
                react: true,
                reaction: emoji
            });

            setTimeout(() => {
                this.setState({
                    react: false,
                    reaction: ''
                });
            }, 2000);

            let data = this.props.firebaseData.database().ref('jukebox/reaction');

            data.set({
                username: this.props.firebaseData.auth().currentUser.displayName,
                reaction: emoji
            });

        } else if (event.keyCode === 221) {
            let emoji = this.props.firebaseData.auth().currentUser.displayName == "Allen Building" ? 'https://i.imgur.com/a3jnTgb.png' : 'https://i.imgur.com/ZE1J401.png'

            this.setState({
                react: true,
                reaction: emoji
            });

            setTimeout(() => {
                this.setState({
                    react: false,
                    reaction: ''
                });
            }, 2000);

            let data = this.props.firebaseData.database().ref('jukebox/reaction');

            data.set({
                username: this.props.firebaseData.auth().currentUser.displayName,
                reaction: emoji
            });

        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.spaceFunction, false);

        let data = this.props.firebaseData.database().ref('jukebox/messages');

        let props = this.props;

        let currUser = "";
        this.props.firebaseData.auth().onAuthStateChanged(user => {
            if (user) {
                currUser = (user.displayName);
                localStorage.setItem('user', currUser);
            }
        });

        let history = JSON.parse(JSON.stringify(this.props.history));
        // && this.props.history.location.state.indexOf('from sendsong') == -1
        if (this.props.history.location.state != 'from sendsong' && this.props.history.location.state != 'rejected') {
            data.on("value", function (snapshot) {
                let res = snapshot.val();
                let userSent = "";
                if (res['userName']) {
                    userSent = res['userName'];
                    if (userSent != "" && currUser != userSent && res['song']) {
                        props.history.push({
                            pathname: '/receive-song',
                            state: {
                                id: res['song'],
                                title: res['songName'],
                                artist: res['songArtist'],
                                genre: res['genre'],
                                history: history
                            }
                        });
                    }
                }

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        } else {
            if (localStorage.getItem("sendSongPage") == "true" && this.props.history.location.userShouldReceiveMeme == localStorage.getItem('user') &&  this.props.history.location.accepted == "no") {
                const rejectedMemes = memeDatabase['rejected'];

                let memes = [];
                Object.keys(rejectedMemes).forEach(function (key) {
                    memes.push(rejectedMemes[key]);
                });

                //random index between 0 and 4
                const rand = Math.floor(Math.random() * 4);

                this.setState({
                    userAcceptedOrRejected: true,
                    meme: memes[rand]['link']
                });

                setTimeout(() => {
                    this.setState({
                        userAcceptedOrRejected: false,
                        meme: ""
                    });

                }, 2500);

                this.props.history.location.accepted = "";
                // this.props.history.location.state = "";
           } else if (localStorage.getItem("sendSongPage") == "true" && this.props.history.location.userShouldReceiveMeme == localStorage.getItem('user') && this.props.history.location.accepted == "yes") {
                const acceptedMemes = memeDatabase['accepted'];

                let memes = [];
                Object.keys(acceptedMemes).forEach(function (key) {
                    memes.push(acceptedMemes[key]);
                });

                //random index between 0 and 5
                const rand = Math.floor(Math.random() * 5);

                this.setState({
                    userAcceptedOrRejected: true,
                    meme: memes[rand]['link']
                });

                setTimeout(() => {
                    this.setState({
                        userAcceptedOrRejected: false,
                        meme: ""
                    });

                }, 2500);

                this.props.history.location.accepted = "";
                // this.props.history.location.state = "";
            }

            // this.props.history.location.accepted = "";
            // this.props.history.location.userAcceptedOrRejected = "";
            localStorage.setItem("sendSongPage", "false");
        }

        // this.props.history.location.state = "";

        let nowplaying = this.props.firebaseData.database().ref('jukebox/nowplaying');

        let t = this;
        nowplaying.on("value", function (snapshot) {
            let res = snapshot.val();
            var arr = [];

            if (snapshot.val()) {
                Object.keys(res).forEach(function (key) {
                    arr.push(res[key]);
                });

                t.setState({ nowplaying: arr[0], artist: arr[1] })

            }

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        let reaction = this.props.firebaseData.database().ref('jukebox/reaction');

        reaction.on("value", function (snapshot) {
            let res = snapshot.val();

            if (res['username'] && res['username'] != '' && res['username'] != currUser) {
                t.setState({
                    react: true,
                    reaction: res['reaction']
                });

                setTimeout(() => {
                    t.setState({
                        react: false,
                        reaction: ''
                    });

                    reaction.set({
                        username: '',
                        reaction: ''
                    })
                }, 2000);
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

                <ReactModal isOpen={!this.state.react ? false : true} className="Modal" >
                    <ReactionEmojis reaction={this.state.reaction}></ReactionEmojis>
                </ReactModal>

                <ReactModal isOpen={!this.state.meme ? false : true} className="Modal" overlayClassName="overlay">
                    <div>
                        <img id="meme" src={this.state.meme}></img>
                    </div>
                </ReactModal>

                <img id="animation" src="https://i.imgur.com/3MncfYh.gif" alt="Loading" title="Loading" />
                <div className="App-header">
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
                </div>

                {/* <iframe src="https://giphy.com/embed/IRFQYGCokErS0" width="377" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/download-IRFQYGCokErS0">via GIPHY</a></p> */}
            </div>
        );
    }
}

export default withRouter(Home);
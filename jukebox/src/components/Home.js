import React, { Component } from 'react';
import 'firebase/auth';
import '../App.css';
import { withRouter } from 'react-router-dom';
import ReactionEmojis from './ReactionEmojisAllen';
// import ReactionEmojisGates from './ReactionEmojisGates';

import ReactModal from 'react-modal';


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = { nowplaying: "", artist: "", react: false, reaction: '' };
    }

    spaceFunction = (event) => {
        if (event.altKey && event.code == 'AltRight') {
            this.props.history.push("/choose-genre");
        } else if (event.keyCode === 85) {
            let emoji = this.props.firebaseData.auth().currentUser.displayName == "Allen Building" ? 'https://i.imgur.com/1KKBBW1.png' :'https://i.imgur.com/RsobDg4.png'

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
            let emoji = this.props.firebaseData.auth().currentUser.displayName == "Allen Building" ? 'https://i.imgur.com/aE4OUta.png' :'https://i.imgur.com/kTjaDoi.png'

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
            let emoji = this.props.firebaseData.auth().currentUser.displayName == "Allen Building" ? 'https://i.imgur.com/yzBjrds.png' :'https://i.imgur.com/eWkGDr0.png'

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
            let emoji = this.props.firebaseData.auth().currentUser.displayName == "Allen Building" ? 'https://i.imgur.com/JNspSA8.png' :'https://i.imgur.com/ZE1J401.png'

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
        console.log("idk: ", this.props.history.location.state);

        document.addEventListener("keydown", this.spaceFunction, false);

        let data = this.props.firebaseData.database().ref('jukebox/messages');

        let props = this.props;

        let currUser = "";
        this.props.firebaseData.auth().onAuthStateChanged(user => {
            if (user) {
                currUser = (user.displayName);
            }
        });

        let history = JSON.parse(JSON.stringify(this.props.history));

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
            this.props.history.location.state = "";
        }


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
            console.log(res);

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

                <header className="App-header">
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
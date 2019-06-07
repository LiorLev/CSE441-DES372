import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Routes from './routes';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';
import Home from './components/Home';
import ChooseGenre from './components/ChooseGenre';
import ChooseSong from './components/ChooseSong';
import SendSong from './components/SendSong';
import ReceiveSong from './components/ReceiveSong';

import YouTube from 'react-youtube';


const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songId: "",
      title: "",
      artist: "",
      vid: null
    };
  }

  //event1 = video
  volumeControl = (event) => {
    let currVol = this.state.vid.getVolume();
    if (event.keyCode == '32') {
      this.state.vid.setVolume(currVol + 5);
    } else if (event.keyCode == '66') {
      this.state.vid.setVolume(currVol - 5);
    }
  }

  saveVideo = (video) => {
    this.setState({ vid: video.target })
  }


  componentDidMount() {
    document.addEventListener("keydown", this.volumeControl, false);
    let msgs = firebaseApp.database().ref('jukebox/messages');
    msgs.set({
      userName: "",
      message: "",
      song: ""
    });

    let rcvd = firebaseApp.database().ref('jukebox/received');
    rcvd.set({
      userAccepted: ""
    });

    let song = firebaseApp.database().ref('jukebox/songId');

    song.on("value", snapshot => {
      this.setState({ songId: snapshot.val().songId });
    });

    // let lastsent = firebaseApp.database().ref('jukebox/lastsent');
    // lastsent.set({
    //   lastSentBy: "",
    //   times: 0
    // });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.volumeControl, false);
  }


  matchRoute() {
    return (
      <Switch>
        <Route exact path={Routes.home} render={props => <Home {...props} song={this.state} firebaseAuth={this.props} firebaseData={firebaseApp} />} />
        <Route exact path={Routes.sendSong} render={props => <SendSong {...props} firebaseAuth={this.props} firebaseData={firebaseApp} />} />
        <Route exact path={Routes.chooseGenre} render={props => <ChooseGenre {...props} firebaseData={firebaseApp} />} />
        <Route exact path={Routes.chooseSong} render={props => <ChooseSong {...props} firebaseAuth={this.props} firebaseData={firebaseApp} />} />
        <Route exact path={Routes.receiveSong} render={props => <ReceiveSong song={this.state} {...props} firebaseAuth={this.props} firebaseData={firebaseApp} changeSongId={this.changeSongId} />} />
      </Switch>
    );
  }

  changeSongId = (song) => {
    let data = firebaseApp.database().ref('jukebox/songId');

    // alert("yo " + song);
    data.set({
      songId: song
    }).then(() => {
      // let msgs = firebaseApp.database().ref('jukebox/messages');
      // msgs.set({
      //   userName: "",
      //   message: "",
      //   song: ""
      // });

      window.location.href = `/`;
    });
  }

  // _onReady(event) {
  //   // access to player in all event handlers via event.target
  //   // event.target.setVolume(0.2);
  // }

  _onReady(event) {
    // access to player in all event handlers via event.target
    console.log(event.target);
    console.log(event.target.getPlayerState());
  }

  render() {
    const opts = {
      height: '0',
      width: '0',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <Router>
        {this.matchRoute()}
        {/* <iframe width="0" height="0" src={`https://www.youtube.com/embed/${this.state.songId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen /> */}
        <YouTube
          videoId={this.state.songId}
          opts={opts}
          onReady={this.saveVideo}
        />
      </Router>
    );
  }
}

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);

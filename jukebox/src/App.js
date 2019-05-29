import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Routes from './routes';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

// import './App.css';

import Home from './components/Home';
import ChooseGenre from './components/ChooseGenre';
import ChooseSong from './components/ChooseSong';
import SendSong from './components/SendSong';
import ReceiveSong from './components/ReceiveSong';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songId: "",
      title: "",
      artist: ""
    };
  }

  componentDidMount() {

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
    })
  }

  matchRoute() {
    return (
      <Switch>
        <Route exact path={Routes.home} render={props => <Home {...props} song={this.state} firebaseAuth={this.props} firebaseData={firebaseApp} />} />
        <Route exact path={Routes.chooseGenre} render={props => <ChooseGenre {...props} firebaseData={firebaseApp} />} />
        <Route exact path={Routes.chooseSong} render={props => <ChooseSong {...props} firebaseAuth={this.props} firebaseData={firebaseApp} />} />
        <Route exact path={Routes.sendSong} render={props => <SendSong {...props} firebaseAuth={this.props} firebaseData={firebaseApp} />} />
        <Route exact path={Routes.receiveSong} render={props => <ReceiveSong song={this.state} {...props} firebaseAuth={this.props} firebaseData={firebaseApp} changeSongId={this.changeSongId} />} />
      </Switch>
    );
  }

  changeSongId = (songId) => {
    // this.setState({ title: songName, artist: songArtist });
    let data = firebaseApp.database().ref('jukebox/songId');

    data.set({
      songId: songId
    }).then(() => {
      window.location.href = `/`;
    });
  }

  render() {
    return (
      <Router>
        {this.matchRoute()}
        <iframe width="0" height="0" src={`https://www.youtube.com/embed/${this.state.songId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
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

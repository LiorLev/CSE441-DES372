import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
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


// import SignIn from './components/SignIn';

const firebaseApp = firebase.initializeApp(firebaseConfig);
// console.log("firebase ", firebaseApp.database());
const firebaseAppAuth = firebaseApp.auth();


class App extends Component {
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
  }

  matchRoute() {
    return (
      <Switch>
        <Route exact path={Routes.home} render={props => <Home {...props} firebaseAuth={this.props} firebaseData={firebaseApp} />} />
        <Route exact path={Routes.chooseGenre} render={props => <ChooseGenre {...props} firebaseData={firebaseApp} />} />
        <Route exact path={Routes.chooseSong} render={props => <ChooseSong {...props} firebaseAuth={this.props} firebaseData={firebaseApp} />} />
        <Route exact path={Routes.sendSong} render={props => <SendSong {...props} firebaseAuth={this.props} firebaseData={firebaseApp} />} />
        <Route exact path={Routes.receiveSong} render={props => <ReceiveSong {...props} firebaseAuth={this.props} firebaseData={firebaseApp} />} />
      </Switch>
    );
  }

  render() {
    return (
      <Router>
        {this.matchRoute()}
      </Router>
    );
  }
}


const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
// export default App;

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);

// import withFirebaseAuth from 'react-with-firebase-auth'
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import firebaseConfig from './firebaseConfig';
// import logo from './logo.svg';
// import './App.css';

// const firebaseApp = firebase.initializeApp(firebaseConfig);

// class App extends Component {
//   render() {
//     const {
//       user,
//       signOut,
//       signInWithGoogle,
//     } = this.props;

//     console.log(this.props);

//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           {
//             user
//               ? <p>Hello, {user.displayName}</p>
//               : <p>Please sign in.</p>
//           }
//           {
//             user
//               ? <button onClick={signOut}>Sign out</button>
//               : <button onClick={signInWithGoogle}>Sign in with Google</button>
//           }
//         </header>
//       </div>
//     );
//   }
// }

// const firebaseAppAuth = firebaseApp.auth();

// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider(),
// };

// export default withFirebaseAuth({
//   providers,
//   firebaseAppAuth,
// })(App);
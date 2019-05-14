import React, { Component } from 'react';
import { HashRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import Routes from './routes';
// import './App.css';

import Home from './components/Home';
import ChooseSong from './components/ChooseSong';
// import SignIn from './components/SignIn';


class App extends Component {
  componentDidMount() {
    // console.log(this.props);
    //   let databaseRef = this.props.firebase.database().ref(`jukebox/messages`);
    //   // databaseRef.on('value', (snapshot) => {
    //   //   if (snapshot) {
    //   //     this.setState({
    //   //       foodBankInfo: snapshot.val(),
    //   //       info: {}
    //   //     })
    //   //   }
    //   // })
  }

  // signin() {
  //   return (
  //     <SignIn firebase={this.props.firebase}/>
  //   );
  // }

  // requireAuth(nextState, replaceState) {
  //   console.log("yo");
  //   // if (!auth.loggedIn())
  //   //   replaceState({ nextPathname: nextState.location.pathname }, '/signin')
  // }

  matchRoute() {
    return (
      <Switch>
        <Route exact path={Routes.home} component={Home}  />
        <Route exact path={Routes.chooseSong} component={ChooseSong} />
        {/* <Route exact path={Routes.home} component={() => this.browseView()} />
        <Route exact path={Routes.foodbank} component={() => this.foodbankInfo()} />
        <Route exact path={Routes.res} component={() => this.foodbankHome()} /> */}
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

export default App;

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
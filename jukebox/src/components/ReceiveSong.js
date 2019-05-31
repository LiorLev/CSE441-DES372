import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';
import ChooseSong from '../components/ChooseSong';
import Home from '../components/Home';


class ReceiveSong extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: null, songReceived: false };
    }

    testing = (ans) => {
        if (ans == "no") {
            this.props.history.push({pathname: '/', state: 'rejected'});
        }
    }

    arrowFunction2 = (event) => {
        if (event.ctrlKey && event.keyCode == '17') {
            this.setState({ selected: 0 });
        } else if (event.altKey && event.code == 'AltLeft') {
            this.setState({ selected: 1 });
        }

        let data = this.props.firebaseData.database().ref('jukebox/received');


        data.set({
            userAccepted: this.state.selected == 0 ? "true" : "false"
        }).then(() => {

            if (this.state.selected == 0) {
                let nowPlaying = this.props.firebaseData.database().ref('jukebox/nowplaying');
                nowPlaying.set({
                    songName: this.props.history.location.state['artist'].toString(),
                    songArtist: this.props.history.location.state['title'].toString()
                });

                this.props.changeSongId(this.props.history.location.state['id'].toString(), this.props.history);


            } else if (this.state.selected == 1) {
                this.testing("no");
            }
        })
    }

    componentDidMount() {
        document.addEventListener("keydown", this.arrowFunction2, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.arrowFunction2, false);
    }

    render() {
        let currUser = this.props.firebaseData.auth().currentUser.displayName;

        return (
            <div>
                <h1 style={{ color: 'white', fontSize: '50px' }}>Your Ph.d peers from the {currUser == "Allen Building" ? 'Research Commons' : 'Jaech'} sent you</h1>
                <h1 style={{ color: 'white', fontSize: '50px' }}>a {this.props.history.location.state['genre']} song by {this.props.history.location.state['artist']}</h1>
                <h1 style={{ color: 'white', marginTop: '120px', fontSize: '50px' }}>Do you want to find out what it is?</h1>
            </div>
        );

    }
}

export default withRouter(ReceiveSong);
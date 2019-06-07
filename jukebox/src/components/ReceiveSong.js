import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';
import ChooseSong from '../components/ChooseSong';
import Home from '../components/Home';


class ReceiveSong extends Component {
    accepted = null;

    constructor(props) {
        super(props);
        this.state = { selected: null, songID: "" };
    }

    testing = (ans) => {
        let rcvd = this.props.firebaseData.database().ref('jukebox/received');

        if (ans == "no") {
            rcvd.set({
                userAccepted: ""
            });
            this.props.history.push({ pathname: '/', state: 'rejected' });
        } else {
            // alert("here");
            // alert(this.props.history.location.state['id']);
            rcvd.set({
                userAccepted: ""
            });

            this.props.changeSongId(this.state.songID);
            

            
        }
    }

    arrowFunction2 = (event) => {
        if (event.ctrlKey && event.keyCode == '17') {
            // this.accepted = true;
            let data = this.props.firebaseData.database().ref('jukebox/received');

            let nowPlaying = this.props.firebaseData.database().ref('jukebox/nowplaying');



            data.set({
                userAccepted: "true",
                songName: this.props.history.location.state['artist'].toString(),
                songArtist: this.props.history.location.state['title'].toString()
            }).then(() => {


                // nowPlaying.set({
                //     songName: this.props.history.location.state['artist'].toString(),
                //     songArtist: this.props.history.location.state['title'].toString()
                // })

                this.testing("yes");

            })




            // this.setState({ selected: 0 });
        } else if (event.altKey && event.code == 'AltLeft') {
            let data = this.props.firebaseData.database().ref('jukebox/received');


            data.set({
                userAccepted: "false"
            }).then(() => {
                this.testing("no");
            });

            // this.accpeted = false;
            // this.setState({ selected: 1 });
        }

        // let data = this.props.firebaseData.database().ref('jukebox/received');


        // data.set({
        //     userAccepted: this.accepted == true ? "true" : "false"
        // }).then(() => {

        //     if (this.accepted == true) {
        //         let nowPlaying = this.props.firebaseData.database().ref('jukebox/nowplaying');
        //         nowPlaying.set({
        //             songName: this.props.history.location.state['artist'].toString(),
        //             songArtist: this.props.history.location.state['title'].toString()
        //         }).then(
        //             this.props.changeSongId(this.props.history.location.state['id'].toString())
        //         );




        //     } else if (this.accepted == false) {
        //         this.testing("no");
        //     }

        //     // localStorage.setItem('times', 0);
        // })
    }

    componentDidMount() {
        console.log(this.props.history.location.state);
        this.setState({songID : this.props.history.location.state['id']})
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
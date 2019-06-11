import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';

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
            rcvd.set({
                userAccepted: ""
            });

            this.props.changeSongId(this.state.songID);
        }
    }

    arrowFunction2 = (event) => {
        //accept
        if (event.ctrlKey && event.code == 'ControlLeft') {
            let data = this.props.firebaseData.database().ref('jukebox/received');

            let nowPlaying = this.props.firebaseData.database().ref('jukebox/nowplaying');



            data.set({
                userAccepted: "true",
                songName: this.props.history.location.state['artist'].toString(),
                songArtist: this.props.history.location.state['title'].toString()
            }).then(() => {

                this.testing("yes");

            })


        //reject
        } else if (event.altKey && event.code == 'AltLeft') {
            let data = this.props.firebaseData.database().ref('jukebox/received');


            data.set({
                userAccepted: "false"
            }).then(() => {
                this.testing("no");
            });

        }       
    }

    componentDidMount() {
        console.log(this.props.history.location.state);
        this.setState({ songID: this.props.history.location.state['id'] })
        document.addEventListener("keydown", this.arrowFunction2, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.arrowFunction2, false);
    }

    grammarCheck = (genre) => {
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        if(vowels.indexOf(genre.substring(0, 1)) != -1){
            return 'an';
        }
        return 'a';
    }

    render() {
        let currUser = this.props.firebaseData.auth().currentUser.displayName;

        let genre = this.props.history.location.state['genre'].toLowerCase();

        return (
            <div style={{ margin: '0 auto', marginTop: '7%', textAlign: 'center' }}>
                <h1 style={{ color: 'white', fontSize: '60px', marginBottom: '7px'}}>Your friends from the {currUser == "Allen Building" ? 'Research Commons' : 'Jaech'} </h1>
                <h1 style={{ color: 'white', fontSize: '60px', width: '70%', margin: '0 auto'}}>
                    sent you {this.grammarCheck(genre)} {genre} song by {this.props.history.location.state['artist']}
                </h1>
                <div style={{ color: 'white', marginTop: '120px', textAlign: 'center' }}>
                    
                    <p style = {{fontSize: '60px', marginBottom: '-19px'}}>Press
                    {currUser == "Allen Building" ? <span style = {{color: '#FFF170'}}> Accept/Reject!</span> : <span style={{ color: '#46C4D3' }}> Accept/Reject!</span>}</p>
                    <p style = {{fontSize: '30px'}}>Once accepted, the song will play in both buildings.</p>
                </div>

                {currUser == "Gates Center" ? <img style={{ marginTop: '18px', width: '77%' }} src="https://i.imgur.com/23bOuZT.gif"></img> :
                    <img style={{ marginTop: '35px', width: '77%' }} src="https://i.imgur.com/g3u6Jpv.gif"></img>}
            </div>
        );

    }
}

export default withRouter(ReceiveSong);
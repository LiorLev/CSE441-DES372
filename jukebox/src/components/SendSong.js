import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';

class SendSong extends Component {
    constructor(props) {
        super(props);
    }

    testing = (ans, song, artist) => {

        let nowPlaying = this.props.firebaseData.database().ref('jukebox/nowplaying');
        let rcvd = this.props.firebaseData.database().ref('jukebox/received');

        if (ans == 'no') {
            localStorage.setItem('userToReceiveMeme', this.props.firebaseData.auth().currentUser.displayName);

            this.props.history.push({
                pathname: `/`,
                state: 'from sendsong',
                accepted: 'no'
            });
        } else if (ans == 'yes') {
            localStorage.setItem('userToReceiveMeme', this.props.firebaseData.auth().currentUser.displayName);

            nowPlaying.set({
                songName: song.toString(),
                songArtist: artist.toString()
            })

            this.props.history.push({
                pathname: `/`,
                state: 'from sendsong',
                accepted: 'yes'
            });


        }

    }

    componentDidMount() {
        localStorage.setItem("sendSongPage", "true");

        let lock = this.props.firebaseData.database().ref('jukebox/lock');

        lock.set({
            username: "",
        });

        let data = this.props.firebaseData.database().ref('jukebox/received');

        let t = this;
        data.on("value", function (snapshot) {
            let res = snapshot.val();

            if (res['userAccepted']) {
                if (res['userAccepted'] == "true") {
                    t.testing('yes', res['songName'], res['songArtist']);
                } else if (res['userAccepted'] == "false") {
                    t.testing('no');
                }
            }

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    render() {
        let currUser = this.props.firebaseData.auth().currentUser.displayName;

        return (
            <div style={{ margin: '0 auto', marginTop: '7%', textAlign: 'center' }}>
                {currUser == "Allen Building" ?
                    <div>
                        <h1 style={{ color: 'white', fontSize: '60px', marginBottom: '7px' }}>Please wait as your song is</h1>
                        <h1 style={{ color: 'white', fontSize: '60px', margin: '0 auto' }}>being sent to the Research Commons.</h1>
                        <p style={{ marginTop: '45px', color: 'white', marginTop: '120px', fontSize: '30px' }}>Will they <span style={{ color: '#FFF170' }}>accept/reject</span>? The meme tells it all!</p>
                    </div>

                    :

                    <div>
                        <h1 style={{ color: 'white', fontSize: '60px', marginBottom: '7px'  }}>Please wait as your song is</h1>
                        <h1 style={{ color: 'white', fontSize: '60px', margin: '0 auto'}}>being sent to the Jaech.</h1>
                        <p style={{ marginTop: '45px', color: 'white', fontSize: '30px', marginTop: '120px' }}>Will they <span style={{ color: '#46C4D3' }}>Accept/Reject</span>? The meme tells it all!</p>
                    </div>}




                {currUser == "Allen Building" ? <img style={{ marginTop: '101px', width: '77%' }} src="https://i.imgur.com/23bOuZT.gif"></img> :
                    <img style={{ marginTop: '101px', width: '77%' }} src="https://i.imgur.com/g3u6Jpv.gif"></img>}
            </div>
        );
    }
}

export default withRouter(SendSong);
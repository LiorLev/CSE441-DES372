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
        // rcvd.set({
        //   userAccepted: ""
        // });

        if (ans == 'no') {
            localStorage.setItem('userToReceiveMeme', this.props.firebaseData.auth().currentUser.displayName);
            // data.set({
            //     userAccepted: ""
            // });
            // rcvd.set({
            //     userAccepted: ""
            // });
            this.props.history.push({
                pathname: `/`,
                state: 'from sendsong',
                accepted: 'no'
            });
        } else if (ans == 'yes'){
            // localStorage.setItem('times', 0);
            localStorage.setItem('userToReceiveMeme', this.props.firebaseData.auth().currentUser.displayName);
            
            // rcvd.set({
            //     userAccepted: ""
            // });

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

        // let data = this.props.firebaseData.database().ref('jukebox/received');
        // let rcvd = this.props.firebaseData.database().ref('jukebox/received');
        // rcvd.set({
        //   userAccepted: ""
        // });


    }

    componentDidMount() {
        localStorage.setItem("sendSongPage", "true");

        let data = this.props.firebaseData.database().ref('jukebox/received');

        let t = this;
        data.on("value", function (snapshot) {
            let res = snapshot.val();

            if (res['userAccepted']) {
                if (res['userAccepted'] == "true") {
                    
                    t.testing('yes', res['songName'], res['songArtist']);
                    // window.location.href = '/';
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
            <div style={{ textAlign: 'center', marginRight: '160px' }}>
                {currUser == "Allen Building" ? <div><h1 style={{ color: 'white', fontSize: '50px' }}>Selected song was sent to your peers in the <span style={{ color: '#46C4D3' }}>Research Commons</span></h1> </div> :
                    <div><h1 style={{ color: 'white', fontSize: '50px' }}>Selected song was sent to your peers in the <span style={{ color: '#FFF170' }}>Jaech</span> </h1></div>}
                <h1 style={{ marginTop: '45px', color: 'white' }}>They only know the genre and artist of the song</h1>
                {currUser == "Allen Building" ? <img style={{ marginTop: '10px' }} src="https://i.imgur.com/3xhwCSf.png"></img> :
                    <img style={{ marginTop: '10px' }} src="https://i.imgur.com/DlebHZY.png"></img>}
            </div>
        );
    }
}

export default withRouter(SendSong);
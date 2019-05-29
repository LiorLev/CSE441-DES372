import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';

class SendSong extends Component {
    constructor(props) {
        super(props);
        // this.state = { selected: 0 };
    }

    componentDidMount() {
        let data = this.props.firebaseData.database().ref('jukebox/received');

        let props = this.props;

        data.on("value", function (snapshot) {
            let res = snapshot.val();

            // var arr = [];
            // Object.keys(res).forEach(function (key) {
            //     arr.push(res[key]);
            // });
            if (res['userAccepted'] != "") {

                if (res['userAccepted'] == "true" ) {
                    // console.log("accepted");
                    // props.history.push({pathname: '/', state: {id: props.history.location.state['id'], title: props.history.location.state['title'], artist: props.history.location.state['artist']}});
                    // let title = props.history.location.state['title'].split(' ').join('-');
                    // let artist = props.history.location.state['artist'].split(' ').join('-');
                    window.location.href  = `/`;
                } else if (res['userAccepted'] == "false") {
                    // console.log("rejected");
                    // let title = props.history.location.state['title'].split(' ').join('-');
                    // let artist = props.history.location.state['artist'].split(' ').join('-');
                    window.location.href  = `/`;

                }
            }

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    render() {
        let currUser = "";
        this.props.firebaseData.auth().onAuthStateChanged(user => {
            currUser = user.displayName;
        });

        return (
            <div style={{ textAlign: 'center', marginRight: '160px' }}>
                {/* <h1 style={{ color: 'white', fontSize: '50px' }}>Selected song was sent to your peers </h1> */}
                {currUser == "Allen Building" ? <div><h1 style={{ color: 'white', fontSize: '50px' }}>Selected song was sent to your peers in the <span style={{ color: '#46C4D3' }}>Research Commons</span></h1> </div> :
                    <div><h1 style={{ color: 'white', fontSize: '50px' }}>Selected song was sent to your peers in the <span style={{ color: '#FFF170' }}>Jaech</span> </h1></div>}
                <h1 style={{ marginTop: '45px', color: 'white' }}>They only know the genre and artist of the song</h1>
                {currUser == "Allen Building" ? <img style={{ marginTop: '10px' }} src="https://i.imgur.com/3xhwCSf.png"></img> :
                    <img style={{ marginTop: '10px' }} src="https://i.imgur.com/DlebHZY.png"></img>}
                {/* <img src = "https://i.imgur.com/3xhwCSf.png"></img> */}
            </div>
        );
    }
}

export default withRouter(SendSong);
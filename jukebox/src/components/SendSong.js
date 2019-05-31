import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';

class SendSong extends Component {
    constructor(props) {
        super(props);
        // this.state = { selected: 0 };
    }

    testing = (ans) => {
        if (ans == 'yes') {
            this.props.history.push({
                pathname: `/`,
                state: 'from sendsong'
            });
        }else{
            this.props.history.push({
                pathname: `/`,
                state: 'from sendsong'
            });
        }
    }

    componentDidMount() {
        let data = this.props.firebaseData.database().ref('jukebox/received');

        let props = this.props;
        let t = this;
        data.on("value", function (snapshot) {
            let res = snapshot.val();

            if (res['userAccepted']) {
                if (res['userAccepted'] == "true") {
                    // console.log("accepted");
                    // props.history.push({pathname: '/', state: {id: props.history.location.state['id'], title: props.history.location.state['title'], artist: props.history.location.state['artist']}});
                    // let title = props.history.location.state['title'].split(' ').join('-');
                    // let artist = props.history.location.state['artist'].split(' ').join('-');
                    // window.location.href = `/`;
                    t.testing('yes');
                    // props.history.push({pathname:'/'});
                } else if (res['userAccepted'] == "false") {
                    // console.log("rejected");
                    // let title = props.history.location.state['title'].split(' ').join('-');
                    // let artist = props.history.location.state['artist'].split(' ').join('-');
                    // window.location.href = `/`;
                    t.testing('no');

                    // props.push('/');
                }
                //     props.history.push('/');

                // }
                // props.history.push('/');
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
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

            var arr = [];
            Object.keys(res).forEach(function (key) {
                arr.push(res[key]);
            });

            if (arr[0] == 'true' && props.history.location.state) {
                // console.log("accepted");
                // props.history.push({pathname: '/', state: {id: props.history.location.state['id'], title: props.history.location.state['title'], artist: props.history.location.state['artist']}});
                // let title = props.history.location.state['title'].split(' ').join('-');
                // let artist = props.history.location.state['artist'].split(' ').join('-');
                props.history.push(`/`)
            } else if (arr[0] == 'false') {
                // console.log("rejected");
                // let title = props.history.location.state['title'].split(' ').join('-');
                // let artist = props.history.location.state['artist'].split(' ').join('-');
                props.history.push(`/`)
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
            <div style = {{marginTop: '166px', marginLeft: '158px'}}>
                <h1 style={{ color: 'white' }}>Selected song was sent to your peers </h1>
                {currUser == "Allen Building" ? <h1 style={{ color: 'white' }}>in the <span style={{ color: '#FFF170' }}>Jaech</span></h1> : 
                                                <h1 style={{ color: 'white' }}>in the <span style={{ color: '#46C4D3' }}>Research Commons</span></h1>}
                <h2 style = {{marginTop: '120px', color: 'white'}}>They only know the genre and artist of the song</h2>
            </div>
        );
    }
}

export default withRouter(SendSong);
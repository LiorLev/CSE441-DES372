import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import '../App.css';
// import ChooseGenre from './ChooseGenre';

class ChooseSong extends Component {
    songs = ["Old Town Road", "Love on the Brain", "Homicide", "Sucker"];
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            redirect1: null,
            sent: null,
            sentBy: null
            // database: this.props.firebaseData.database().ref('jukebox/messages')
        };
    }

    arrowFunction1 = (event) => {
        if (event.keyCode == '32') {
            let data = this.props.firebaseData.database().ref('jukebox/messages');
            data.set({
                userName: this.props.firebaseData.auth().currentUser.displayName,
                message: "song was sent",
                song: this.songs[this.state.selected]
            });
            // this.setState({ redirect1: '/send-song' });
            // document.removeEventListener("keydown", this.arrowFunction1, false);

            this.props.history.push('/send-song');
            document.removeEventListener("keydown", this.arrowFunction1, false);



        } else if (event.keyCode == '38' && this.state.selected >= 1 && this.state.selected <= 3) {
            // up arrow
            this.setState({ selected: this.state.selected - 1 });
        } else if (event.keyCode == '40' && this.state.selected >= 0 && this.state.selected < 3) {
            // down arrow
            this.setState({ selected: this.state.selected + 1 });
        } 
        // else if (event.keyCode == '37') {
        //     // left arrow
        // } else if (event.keyCode == '39') {
        //     // right arrow
        // }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.arrowFunction1, false);

        // let data = this.props.firebaseData.database().ref('jukebox/messages');

        // let props = this.props;

        // data.on("value", function (snapshot) {
        //     // console.log(snapshot.val());
        //     let res = snapshot.val();

        //     var arr = [];
        //     Object.keys(res).forEach(function (key) {
        //         arr.push(res[key]);
        //     });

        //     // console.log("array of json obj: ", arr);

        //     let userSent = arr[2];
        //     // console.log("hey", userSent);
        //     if (userSent != "" && props.firebaseData.auth().currentUser.displayName != userSent) {
        //         props.history.push('/receive-song');
        //         // this.setState({redirect1: '/receive-song'});
        //     }

        // }, function (errorObject) {
        //     console.log("The read failed: " + errorObject.code);
        // });
    }

    componentWillUnmount() {
    }

    render() {
        let songDivs = this.songs.map((item, index) =>
            <div className={(this.state.selected === index ? 'selectedSong ' : '') + "letters"}
                id={index} key={index}> <h1>{item}</h1> </div>)
        return (
            <div>
                {songDivs}
            </div>
        );
    }
}

export default withRouter(ChooseSong);
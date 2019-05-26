import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';
// import ChooseGenre from './ChooseGenre';

class ChooseSong extends Component {
    songs = ["Old Town Road", "Love on the Brain", "Homicide", "Sucker"];
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            uid: ""
            // sent: null
            // database: this.props.firebaseData.database().ref('jukebox/messages')
        };
        
    }

    arrowFunction1 = (event) => {
        if (event.keyCode == '32') {
            let data = this.props.firebaseData.database().ref('jukebox/messages');

            // if(this.props.firebaseData.auth().currentUser.displayName == "Gates Center"){
            //     data = this.props.firebaseData.database().ref('jukebox/messagesFromGates');
            // }else if(this.props.firebaseData.auth().currentUser.displayName == "Allen Building"){
            //     data = this.props.firebaseData.database().ref('jukebox/messagesFromAllen');
            // }

            data.set({
                userName: this.props.firebaseData.auth().currentUser.displayName,
                message: "song was sent",
                song: this.songs[this.state.selected]
            });

            // this.setState({ redirect1: '/send-song' });
            // document.removeEventListener("keydown", this.arrowFunction1, false);

            this.props.history.push(`/send-song?id=${this.state.uid}`);
            // this.setState({sent: true});
            // document.removeEventListener("keydown", this.arrowFunction1, false);

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
        //TODO: Might want to look into this
        this.props.firebaseData.auth().onAuthStateChanged(user => {
            this.setState({
                uid: user.uid
            });
        });
        document.addEventListener("keydown", this.arrowFunction1, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.arrowFunction1, false);

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
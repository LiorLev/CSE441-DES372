import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import '../App.css';
// import ChooseGenre from './ChooseGenre';

class ChooseSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            redirect1: null
            // database: this.props.firebaseData.database().ref('jukebox/messages')
        };
        document.addEventListener("keydown", this.arrowFunction1, false);

    }

    arrowFunction1 = (event) => {
        console.log('song move ', event.keyCode);
        if (event.keyCode == '32') {
            console.log("hey ", this.props);
            let data = this.props.firebaseData.database().ref('jukebox/messages');
            data.push({
                userName: this.props.firebaseData.auth().currentUser.displayName,
                message: "song was sent",
                song: document.getElementsByClassName('selectedSong') [0].textContent
            });

            this.props.history.push('/send-song');
        }else if (event.keyCode == '38' && this.state.selected >= 1 && this.state.selected <= 3) {
            // up arrow
            // console.log("up");
            this.setState({ selected: this.state.selected - 1 });
        } else if (event.keyCode == '40' && this.state.selected >= 0 && this.state.selected < 3) {
            // down arrow
            // console.log("down");
            this.setState({ selected: this.state.selected + 1 });
        } else if (event.keyCode == '37') {
            // left arrow
            // console.log("left");
        } else if (event.keyCode == '39') {
            // right arrow
            // console.log("right");
        } 
    }

    // sendDataToFireBase = () => {
    //     console.log("sent dta");
    //     this.props.firebaseData.database().ref('jukebox/messages').push({
    //         // userName: this.props.firebaseData.auth().currentUser.displayName,
    //         message: "song was sent",
    //         song: document.getElementsByClassName('selectedSong')[0].textContent
    //     });
    // }
    // componentDidMount() {
    //     document.addEventListener("keydown", this.arrowFunction1, false);
    //     console.log("song")

    // }

    // componentWillUnmount() {
    //     document.removeEventListener("keydown", this.arrowFunction1, false);
    // }

    render() {
        // const { redirect1 } = this.state;
        // console.log(redirect1);
        // if (redirect1) {
        //     console.log(this.props);
        //     // console.log("sent dta ", this.props.firebaseData.database().ref('jukebox/messages'));
        //     let data = this.props.firebaseData.database().ref('jukebox/');
        //     data.push({
        //         // userName: this.props.firebaseData.auth().currentUser.displayName,
        //         message: "song was sent",
        //         song: document.getElementsByClassName('selectedSong')[0].textContent
        //     });
        //     return <Redirect to={redirect1} />;
        // }

        let songs = ["Old Town Road", "Love on the Brain", "Homicide", "Sucker"];
        let songDivs = songs.map((item, index) =>
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
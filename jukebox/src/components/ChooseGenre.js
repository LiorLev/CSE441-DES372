import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import '../App.css';
// import currentUser from '../globals';

class ChooseGenre extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: 0, genre: '', redirect: null };
    }

    arrowFunction = (event) => {
        if (event.keyCode == '38' && this.state.selected > 0 && this.state.selected <= 8) {
            // up arrow
            // console.log("up");
            this.setState({ selected: this.state.selected - 1 });
        } else if (event.keyCode == '40' && this.state.selected >= 0 && this.state.selected < 7) {
            // down arrow
            // console.log("down");
            this.setState({ selected: this.state.selected + 1 });
        } else if (event.keyCode == '37') {
            // left arrow
            // console.log("left");
        } else if (event.keyCode == '39') {
            // right arrow
            // console.log("right");
        } else if (event.keyCode == '32') {
            // genre: document.getElementsByClassName('selected')[0].textContent, 
            // this.setState({ redirect: '/choose-song' });
            this.props.history.push('/choose-song');
            document.removeEventListener("keydown", this.arrowFunction, false);

            // console.log("hey00");

            // this.props.history.push({
            //     pathname: "/choose-song",
            //     state: this.state.genre
            // });
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.arrowFunction, false);

        // let data = this.props.firebaseData.database().ref('jukebox/messages');

        // let props = this.props;

        // data.on("value", function (snapshot) {
        //     console.log(snapshot.val());
        //     let res = snapshot.val();

        //     var arr = [];
        //     Object.keys(res).forEach(function (key) {
        //         arr.push(res[key]);
        //     });

        //     console.log("array of json obj: ", arr);

        //     let userSent = arr[2];
        //     console.log("hey", userSent);
        //     if (userSent != "" && props.firebaseData.auth().currentUser.displayName != userSent) {
        //         props.history.push('/receive-song');
        //     }


        // }, function (errorObject) {
        //     console.log("The read failed: " + errorObject.code);
        // });
        // // console.log("genre")
    }

    componentWillUnmount() {
    }

    render() {
        // const { redirect } = this.state;
        // console.log(redirect);
        // if (redirect) return <Redirect to={{ pathname: redirect, state: { genre: this.state.genre } }} />;

        let flag = true;
        let songs = ["POP", "INDIE", "CLASSIC", "FOCUS", "COUNTRY", "ROCK", "JAZZ", "R&B"];
        let songDivs = songs.map((item, index) =>
            <div className={(this.state.selected === index ? 'selected ' : '') + "letters"}
                id={index} key={index}>
                <h1>{item}</h1> </div>)

        return (
            <div>
                {songDivs}
            </div>

        );
    }
}

export default withRouter(ChooseGenre);
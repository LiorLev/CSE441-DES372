import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';

class SendSong extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: 0 };
    }

    // arrowFunction = (event) => {
    //     if (event.keyCode == '38') {
    //         // up arrow
    //         // console.log("up");
    //         this.setState({ selected: this.state.selected - 1 });
    //     } else if (event.keyCode == '40') {
    //         // down arrow
    //         // console.log("down");
    //         this.setState({ selected: this.state.selected + 1 });

    //     } else if (event.keyCode == '32') {
    //         this.props.history.push("/");
    //     }
    // }

    componentDidMount() {
        let data = this.props.firebaseData.database().ref('jukebox/received');

        let props = this.props;
        data.on("value", function (snapshot) {
            console.log(snapshot.val());
            let res = snapshot.val();

            var arr = [];
            Object.keys(res).forEach(function (key) {
                arr.push(res[key]);
            });

            if (arr[0] == 'true') {
                console.log("accepted");
                props.history.push('/');
            } else if (arr[0] == 'false') {
                console.log("rejected");
                props.history.push('/');
            }

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    }


    render() {
        return (
            <h1>Song was sent</h1>
        );
    }
}

export default withRouter(SendSong);
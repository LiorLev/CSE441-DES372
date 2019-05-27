import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';

class SendSong extends Component {
    constructor(props) {
        super(props);
        // this.state = { selected: 0 };
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
        // document.addEventListener("keydown", this.arrowFunction, false);
        console.log(window.location.search);
        console.log(this.props.history);
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

    // componentWillUnmount(){
    //     document.removeEventListener("keydown", this.arrowFunction, false);

    // }


    render() {
        let currUser = "";
        this.props.firebaseData.auth().onAuthStateChanged(user => {
            console.log("user ", user.displayName);

            currUser = user.displayName;
        });


        return (
            <div style = {{marginTop: '166px', marginLeft: '158px'}}>
                <h1 style={{ color: 'white' }}>Selected song was sent to your peers </h1>
                {currUser == "Allen Building" ? <h1 style={{ color: 'white' }}>in the <span style={{ color: '#46C4D3' }}>Jaech</span></h1> : 
                                                <h1 style={{ color: 'white' }}>in the <span style={{ color: '#FFF170' }}>Research Commons</span></h1>}
                <h2 style = {{marginTop: '120px', color: 'white'}}>They only know the genre and artist of the song</h2>
            </div>
        );
    }
}

export default withRouter(SendSong);
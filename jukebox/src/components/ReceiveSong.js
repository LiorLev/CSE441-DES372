import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import '../App.css';

class ReceiveSong extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: 0 };
    }

    arrowFunction2 = (event) => {
        if (event.keyCode == '32') {
            console.log("enter woo");
            let data = this.props.firebaseData.database().ref('jukebox/received');

            // if (this.state.selected == 0) {
            data.set({
                userAccepted: this.state.selected == 0 ? "true" : "false"
            })

            window.location.href = "/";
            // .then(() => {
            //     console.log('Write succeeded!');
            // this.props.history.push('/');
            // });
            // console.log("accepted");

            // } else if (this.state.selected == 1) {
            //     data.set({
            //         userAccepted: "false"
            //     });
            //     console.log("rejected");
            //     // this.props.history.push('/');
            // }

            // this.props.history.push('/');

            document.removeEventListener("keydown", this.arrowFunction2, false);

        } else if (event.keyCode == '39' && this.state.selected == 0) {
            //right
            // console.log("right");
            this.setState({ selected: this.state.selected + 1 });

        } else if (event.keyCode == '37' && this.state.selected == 1) {
            //left
            // console.log("left");
            this.setState({ selected: this.state.selected - 1 });
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.arrowFunction2, false);
    }


    render() {
        let arr = ['accepted', 'rejected'];
        let receivedDivs = arr.map((item, index) =>
            <div className={(this.state.selected === index ? 'selectedChoice ' : '')} style={{ display: 'inline-block' }}
                id={index} key={index}> <h1>{item}</h1> </div>)
        return (
            <div>
                <h1>Accept/Reject</h1>
                {receivedDivs}
            </div>
        );

    }
}

export default withRouter(ReceiveSong);
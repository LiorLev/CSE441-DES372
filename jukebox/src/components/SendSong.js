import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import '../App.css';

class SendSong extends Component {
    // constructor(props) {
    //     super(props);
    //     console.log(props);
    //     this.state = { selected: 0 };
    // }

    arrowFunction = (event) => {
        if (event.keyCode == '38' ) {
            // up arrow
            // console.log("up");
            this.setState({ selected: this.state.selected - 1 });
        } else if (event.keyCode == '40' ) {
            // down arrow
            // console.log("down");
            this.setState({ selected: this.state.selected + 1 });

        } else if (event.keyCode == '32') {
            this.props.history.push("/");
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.arrowFunction, false);
    }
    
    componentWillUnmount(){
        document.removeEventListener("keydown", this.arrowFunction, false);
    }

    render() {
        // let songs = ["Old Town Road", "Love on the Brain", "Homicide", "Sucker"];
        // let songDivs = songs.map((item, index) =>
        //     <div className={(this.state.selected === index ? 'selected ' : '') + "letters"} id={index} key={index}> <h1>{item}</h1> </div>)

        return (
            <h1>Song was sent</h1>
        );
    }
}

export default withRouter(SendSong);
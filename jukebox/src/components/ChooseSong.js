import React, { Component } from 'react';
import { HashRouter as Router, Switch, Redirect, Route, withRouter } from 'react-router-dom';
import '../App.css';

class ChooseSong extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = { selected: 0 };
    }

    arrowFunction = (event) => {
        // if (this.state.selected >= 0 && this.state.selected < 4) {
            console.log(this.state.selected);
            if (event.keyCode == '38' && this.state.selected >= 1 && this.state.selected <= 3) {
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
        // }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.arrowFunction, false);
    }


    render() {
        let flag = true;
        let songs = ["a", "b", "c", "d"];
        let songDivs = songs.map((item, index) =>
            <div className={(this.state.selected === index ? 'selected ' : '') + "letters"} id={index} key={index}> <h1>{item}</h1> </div>)

        return (
            <div>
                {songDivs}
            </div>

        );
    }
}

export default withRouter(ChooseSong);
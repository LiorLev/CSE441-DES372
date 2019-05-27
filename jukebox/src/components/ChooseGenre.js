import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';

class ChooseGenre extends Component {
    genres = ["POP", "LATIN", "HIP-HOP", "COUNTRY", "ROCK", "DANCE", "INDIE", "CHILL"];
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
            this.props.history.push({pathname: '/choose-song', state: this.genres[this.state.selected]});
            document.removeEventListener("keydown", this.arrowFunction, false);

            // this.setState({genre: this.genres[this.state.selected]});

            // console.log("hey00");

            // this.props.history.push({
            //     pathname: "/choose-song",
            //     state: this.state.genre
            // });
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.arrowFunction, false);
    }

    componentWillUnmount() {
        // document.removeEventListener("keydown", this.arrowFunction, false);
    }

    render() {
        let songs = ["POP", "LATIN", "HIP-HOP", "COUNTRY"];

        let song2 = ["ROCK", "DANCE", "INDIE", "CHILL"];

        let songDivs = songs.map((item, index) =>
            <div className ={(this.state.selected  === index ? 'selected ' : '') + "letters"}
                id={index} key={index}>
                <h1>{item}</h1> </div>);

        let songDivs2 = song2.map((item, index) =>
            <div className={(this.state.selected === index + 4 ? 'selected ' : '') + "letters"}
                id={index + 4} key={index + 4}>
                <h1>{item}</h1> </div>);

        return (
            <div style = {{textAlign: 'center', marginTop: '70px'}}>
                <div style = {{display: 'inline-block'}}>{songDivs}</div>
                <div style = {{display: 'inline-block'}}>{songDivs2}</div>
            </div>
        );
    }
}

export default withRouter(ChooseGenre);
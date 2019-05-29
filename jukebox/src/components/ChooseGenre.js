import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';

class ChooseGenre extends Component {
    genres = ["POP", "LATIN", "HIP-HOP", "COUNTRY", "ROCK", "DANCE", "INDIE", "CHILL"];
    constructor(props) {
        super(props);
        this.state = { selected: 0, genre: '' };
    }

    arrowFunction = (event) => {
        if (event.keyCode == '38' && this.state.selected > 0 && this.state.selected <= 8) {
            this.setState({ selected: this.state.selected - 1 });
        } else if (event.keyCode == '40' && this.state.selected >= 0 && this.state.selected < 7) {
            this.setState({ selected: this.state.selected + 1 });
        } else if (event.keyCode == '37') {
            // left arrow
            // console.log("left");
        } else if (event.keyCode == '39') {
            // right arrow
            // console.log("right");
        } else if (event.keyCode == '32') {
            this.props.history.push({ pathname: '/choose-song', state: this.genres[this.state.selected] });
            document.removeEventListener("keydown", this.arrowFunction, false);
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.arrowFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.arrowFunction, false);
    }

    render() {
        let songs = ["Pop", "Latin", "Hip-Hop", "Country"];
        let song2 = ["Rock", "Dance", "Indie", "Chill"];

        let songDivs = songs.map((item, index) =>
            <div className={(this.state.selected === index ? 'selected ' : '') + "letters"}
                id={index} key={index}>
                <h1 style = {{marginTop: '35px'}}>{item}</h1> </div>);

        let songDivs2 = song2.map((item, index) =>
            <div className={(this.state.selected === index + 4 ? 'selected ' : '') + "letters"}
                 id={index + 4} key={index + 4}>
                <h1 style = {{marginTop: '35px'}}>{item}</h1> </div>);

        return (
            <div style={{ textAlign: 'center'}}>
                <h1 style = {{color: 'white', fontSize: '45px', marginBottom: '-28px', textAlign: 'left'}}><strong>Select song by genre</strong></h1>
                <div style={{ textAlign: 'center', marginTop: '70px' }}>
                    <div style={{ display: 'inline-block' }}>{songDivs}</div>
                    <div style={{ display: 'inline-block' }}>{songDivs2}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(ChooseGenre);
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
        //up
        if (event.keyCode == '38' && this.state.selected > 0 && this.state.selected <= 8) {
            if (this.state.selected != 4) {
                this.setState({ selected: this.state.selected - 1 });
            }

            //down
        } else if (event.keyCode == '40' && this.state.selected >= 0 && this.state.selected < 7) {
            if (this.state.selected != 3) {
                this.setState({ selected: this.state.selected + 1 });
            }

            //right
        } else if (event.keyCode == '39' && this.state.selected >= 0 && this.state.selected < 4) {
            this.setState({ selected: this.state.selected + 4 });

            //left
        } else if (event.keyCode == '37' && this.state.selected >= 4 && this.state.selected < 8) {
            this.setState({ selected: this.state.selected - 4 });

        } else if (event.altKey && event.code == 'AltRight') {
            this.props.history.push({ pathname: '/choose-song', state: this.genres[this.state.selected] });
            document.removeEventListener("keydown", this.arrowFunction, false);
        } else if (event.keyCode == '192') {
            this.props.history.goBack();
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
                <p style={{ marginTop: '35px', fontSize: '33px'}}>{item}</p> </div>);

        let songDivs2 = song2.map((item, index) =>
            <div className={(this.state.selected === index + 4 ? 'selected ' : '') + "letters"}
                id={index + 4} key={index + 4}>
                <p style={{ marginTop: '35px', fontSize: '33px' }}>{item}</p> </div>);

        return (
            <div style={{marginLeft: '64px', marginTop: '7%' }}>
                <h1 style={{ color: 'white', fontSize: '60px', marginBottom: '-28px', textAlign: 'left', marginLeft: '22px'}}><strong>Select song by genre</strong></h1>
                <div style={{ textAlign: 'center', marginTop: '70px' }}>
                    <div style={{ display: 'inline-block' }}>{songDivs}</div>
                    <div style={{ display: 'inline-block' }}>{songDivs2}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(ChooseGenre);
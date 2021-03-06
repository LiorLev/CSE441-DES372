import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';
import songDatabse from '../songs.js';

class ChooseSong extends Component {
    songs = [];
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            uid: ""
        };
    }

    getSongsBasedOnGenre() {
        let genre = this.props.history.location.state.toLowerCase();

        let x = [];
        Object.keys(songDatabse[genre]).forEach(function (key) {
            x.push(songDatabse[genre][key]);
        });

        x.forEach(elem => {
            this.songs.push(elem);
        })
    }

    arrowFunction1 = (event) => {
        let history = JSON.parse(JSON.stringify(this.props.history));

        if (event.altKey && event.code == 'AltRight') {
            let data = this.props.firebaseData.database().ref('jukebox/messages');

            data.set({
                userName: this.props.firebaseData.auth().currentUser.displayName,
                message: "song was sent",
                song: this.songs[this.state.selected]['id'],
                songName: this.songs[this.state.selected]['song'],
                songArtist: this.songs[this.state.selected]['artist'],
                genre: this.props.history.location.state
            }).then(() => {

                this.props.history.push({
                    pathname: `/send-song`,
                    state: {
                        id: this.songs[this.state.selected]['id'],
                        title: this.songs[this.state.selected]['song'],
                        artist: this.songs[this.state.selected]['artist'],
                        history: history
                    }
                });
            });
        } else if (event.code == 'Numpad1' && this.state.selected > 0 && this.state.selected <= 8) {
            // up arrow
            if (this.state.selected != 4) {
                this.setState({ selected: this.state.selected - 1 });
            }
        } else if (event.code == 'Numpad0' && this.state.selected >= 0 && this.state.selected < 7) {
            // down arrow
            if (this.state.selected != 3) {
                this.setState({ selected: this.state.selected + 1 });
            }
            //right
        } else if (event.code == 'NumpadDecimal' && this.state.selected >= 0 && this.state.selected < 4) {
            this.setState({ selected: this.state.selected + 4 });

            //left
        } else if (event.code == 'ArrowRight' && this.state.selected >= 4 && this.state.selected < 8) {
            this.setState({ selected: this.state.selected - 4 });

        } else if (event.code == 'KeyQ') {
            this.props.history.goBack();
        }
    }

    componentDidMount() {
        this.getSongsBasedOnGenre();
        //TODO: Might want to look into this
        this.props.firebaseData.auth().onAuthStateChanged(user => {
            this.setState({
                uid: user.uid
            });
        });

        document.addEventListener("keydown", this.arrowFunction1, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.arrowFunction1, false);
    }

    render() {

        let firstHalf = [];
        let secondHalf = [];

        for (let i = 0; i < this.songs.length / 2; i++) {
            firstHalf[i] = this.songs[i];
        }

        for (let i = this.songs.length / 2; i < this.songs.length; i++) {
            secondHalf[i] = this.songs[i];
        }

        let songDivs = firstHalf.map((item, index) =>
            <div className={(this.state.selected === index ? 'selected ' : '') + "letters"}
                id={index} key={index}>
                <div><p style={{ marginTop: '35px', fontSize: '33px' }}>{item['song']}</p> <p style={{ fontFamily: 'signpaintermedium', fontSize: '20px', marginTop: '-24px' }}>By {item['artist']}</p> </div></div>);

        let songDivs2 = secondHalf.map((item, index) =>
            <div className={(this.state.selected === index ? 'selected ' : '') + "letters"} style={{ display: 'relative' }}
                id={index} key={index}>
                <div><p style={{ marginTop: '35px', fontSize: '33px' }}>{item['song']}</p> <p style={{ fontFamily: 'signpaintermedium', fontSize: '20px', marginTop: '-24px' }}>By {item['artist']}</p> </div></div>);

        return (
            <div style={{ marginLeft: '64px', marginTop: '7%' }}>
                {
                    localStorage.getItem('user') == "Gates Center" ? <h1 style={{ color: 'white', fontSize: '60px', marginBottom: '-28px', textAlign: 'left', marginLeft: '22px' }}>Select <span style={{ color: '#46C4D3' }}>{this.props.history.location.state.toLowerCase()}</span> song </h1> :
                        <h1 style={{ color: 'white', fontSize: '60px', marginBottom: '-28px', textAlign: 'left', marginLeft: '22px' }}>Select <span style={{ color: '#FFF170' }}>{this.props.history.location.state.toLowerCase()}</span> song </h1>


                }
                <div style={{ textAlign: 'center', marginTop: '70px' }}>
                    <div style={{ display: 'inline-block' }}>{songDivs}</div>
                    <div style={{ display: 'inline-block' }}>{songDivs2}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(ChooseSong);
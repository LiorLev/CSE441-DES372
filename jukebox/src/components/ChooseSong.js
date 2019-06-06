import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';
import songDatabse from '../songs.js';
// import ChooseGenre from './ChooseGenre';

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
            if (localStorage.getItem('times') < 4) {
                //     this.setState({
                //         times: this.state.times + 1
                //     });

                //     alert(this.state.times);


                localStorage.setItem('times', localStorage.getItem('times') + 1);

                let data = this.props.firebaseData.database().ref('jukebox/messages');

                data.set({
                    userName: this.props.firebaseData.auth().currentUser.displayName,
                    message: "song was sent",
                    song: this.songs[this.state.selected]['id'],
                    songName: this.songs[this.state.selected]['song'],
                    songArtist: this.songs[this.state.selected]['artist'],
                    genre: this.props.history.location.state
                }).then(this.props.history.push({
                    pathname: `/send-song`,
                    state: {
                        id: this.songs[this.state.selected]['id'],
                        title: this.songs[this.state.selected]['song'],
                        artist: this.songs[this.state.selected]['artist'],
                        history: history
                    }
                }));
            } else {
                alert("try again :/");
            }

            // this.props.history.push({
            //     pathname: `/send-song`,
            //     state: {
            //         id: this.songs[this.state.selected]['id'],
            //         title: this.songs[this.state.selected]['song'],
            //         artist: this.songs[this.state.selected]['artist'],
            //         history: history
            //     }
            // });

        } else if (event.keyCode == '38' && this.state.selected >= 1 && this.state.selected <= 10) {
            // up arrow
            if (this.state.selected != 5) {
                this.setState({ selected: this.state.selected - 1 });
            }
        } else if (event.keyCode == '40' && this.state.selected >= 0 && this.state.selected < 9) {
            // down arrow
            if (this.state.selected != 4) {
                this.setState({ selected: this.state.selected + 1 });
            }
            //right
        } else if (event.keyCode == '39' && this.state.selected >= 0 && this.state.selected < 5) {
            this.setState({ selected: this.state.selected + 5 });

            //left
        } else if (event.keyCode == '37' && this.state.selected >= 5 && this.state.selected < 10) {
            this.setState({ selected: this.state.selected - 5 });

        } else if (event.keyCode == '192') {
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

        if (!localStorage.getItem('times')) {
            localStorage.setItem('times', 0);
        }

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

        // let songDivs = this.songs.map((item, index) =>
        //     <div className={(this.state.selected === index ? 'selectedSong ' : '') + "letters"}
        //         id={index} key={index}> <h1>{item['song']}</h1> <h2>{item['artist']}</h2></div>)

        let songDivs = firstHalf.map((item, index) =>
            <div className={(this.state.selected === index ? 'selected ' : '') + "letters"}
                id={index} key={index}>
                <h1 style={{ marginBottom: '-16px' }}>{item['song']}</h1> <h4>{item['artist']}</h4> </div>);

        let songDivs2 = secondHalf.map((item, index) =>
            <div className={(this.state.selected === index ? 'selected ' : '') + "letters"}
                id={index} key={index}>
                <h1 style={{ marginBottom: '-16px' }}>{item['song']}</h1> <h4>{item['artist']}</h4> </div>);

        return (
            // <div style={{ textAlign: 'center', marginTop: '70px' }}>
            //     {songDivs}
            // </div>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: 'white', fontSize: '45px', marginBottom: '-28px', textAlign: 'left' }}>Select song </h1>
                <div style={{ textAlign: 'center', marginTop: '70px' }}>
                    <div style={{ display: 'inline-block' }}>{songDivs}</div>
                    <div style={{ display: 'inline-block' }}>{songDivs2}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(ChooseSong);
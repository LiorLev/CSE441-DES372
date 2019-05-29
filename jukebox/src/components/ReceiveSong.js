import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';
import ChooseSong from '../components/ChooseSong';

class ReceiveSong extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: 0, songReceived : false};
    }

    arrowFunction2 = (event) => {
        if (event.keyCode == '32') {
            let data = this.props.firebaseData.database().ref('jukebox/received');

            let nowPlaying = this.props.firebaseData.database().ref('jukebox/nowplaying');

            data.set({
                userAccepted: this.state.selected == 0 ? "true" : "false"
            }).then(() => {
                if(this.state.selected == 0){

                    nowPlaying.set({
                        songName: this.props.history.location.state['title'],
                        songArtist: this.props.history.location.state['artist']
                    });

                    this.props.changeSongId(this.props.history.location.state['id'], this.props.history.location.state['title'], this.props.history.location.state['artist']);
                }else{
                    window.location.href = "/";
                }
            })

        } else if (event.keyCode == '39' && this.state.selected == 0) {
            this.setState({ selected: this.state.selected + 1 });

        } else if (event.keyCode == '37' && this.state.selected == 1) {
            this.setState({ selected: this.state.selected - 1 });
        }
    }

    componentDidMount() {
        console.log(this.props);
        document.addEventListener("keydown", this.arrowFunction2, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.arrowFunction2, false);
    }

    render() {
        let arr = ['accepted', 'rejected'];
        let receivedDivs = arr.map((item, index) =>
            <div className={(this.state.selected === index ? 'selectedChoice ' : '') + 'receive'} style={{ display: 'inline-block' }}
                id={index} key={index}> <h1>{item}</h1> </div>)
        return (
            <div>
                <h1 style = {{color: 'white'}}>Your Ph.d peers from the Research Commons sent you</h1>
                <h1 style = {{color: 'white'}}>a {this.props.history.location.state['genre']} song by {this.props.history.location.state['artist']}</h1>
                <h1 style = {{color: 'white', marginTop: '120px'}}>Do you want to find out what it is?</h1>
                {receivedDivs}
            </div>
        );

    }
}

export default withRouter(ReceiveSong);
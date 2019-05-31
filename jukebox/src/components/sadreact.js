import React, { Component } from 'react';
import '../App.css';

class SadReact extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <div className = "float" >
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px" }} className="floating" />
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginLeft: '40%'}} className="floating" />
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginLeft: '50%'}} className="floating" />
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginLeft: '80%' }} className="floating" />
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginLeft: '10%'}} className="floating" />
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginLeft: '30%'}} className="floating" />
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginLeft: '70%'}} className="floating" />
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginLeft: '20%'}} className="floating" />
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginLeft: '80%'}} className="floating" />
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginLeft: '40%'}} className="floating" />
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginLeft: '30%'}} className="floating" />
                </div>

                {/* <img src="https://i.imgur.com/eWkGDr0.png" style={{ width: "85px", height: "85px", marginLeft: '5%' }} className="floating" />
                <img src="https://i.imgur.com/eWkGDr0.png" style={{ width: "85px", height: "85px", marginLeft: '40%' }} className="floating" />
                <img src="https://i.imgur.com/eWkGDr0.png" style={{ width: "85px", height: "85px", marginLeft: '10%' }} className="floating" />
                <img src="https://i.imgur.com/eWkGDr0.png" style={{ width: "85px", height: "85px", marginLeft: '20%' }} className="floating" /> */}


            </div>
        );
    }
}

export default SadReact;
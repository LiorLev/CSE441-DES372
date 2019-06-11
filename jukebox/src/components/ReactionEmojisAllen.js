import React, { Component } from 'react';
import '../App.css';

class ReactionEmojis extends Component {
    constructor(props){
        super(props);
    }

    render() {

        return (
            <div style = {{marginLeft: '3%'}}>
                <div className = "float" >
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginTop: '-40px', marginLeft: '20%'}}  className="floating"/>
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginTop: '-53px', marginLeft: '76%'}}  className="floating"/>
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginTop: '15px', marginLeft: '-2%'}}  className="floating"/>
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginTop: '1%', marginLeft: '26%' }}  className="floating"/>
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginTop: '-37px', marginLeft: '55%'}}  className="floating"/>
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginTop: '5%', marginLeft: '8%'}}  className="floating"/>
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginTop: '-63px', marginLeft: '90%'}}  className="floating"/>
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginLeft: '34%'}}  className="floating"/>
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginTop: '6%', marginLeft: '2%'}}  className="floating"/>
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginTop: '-10%', marginLeft: '70%'}}  className="floating"/>
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginTop: '27px' , marginLeft: '95%'}}  className="floating"/>
                </div>
                <div className = "float">
                    <img src={this.props.reaction} style={{ width: "85px", height: "85px", marginTop: '-7%' , marginLeft: '25%'}}  className="floating"/>
                </div>
                

                {/* <img src="https://i.imgur.com/eWkGDr0.png" style={{ width: "85px", height: "85px", marginLeft: '5%' }} className="floating" />
                <img src="https://i.imgur.com/eWkGDr0.png" style={{ width: "85px", height: "85px", marginLeft: '40%' }} className="floating" />
                <img src="https://i.imgur.com/eWkGDr0.png" style={{ width: "85px", height: "85px", marginLeft: '10%' }} className="floating" />
                <img src="https://i.imgur.com/eWkGDr0.png" style={{ width: "85px", height: "85px", marginLeft: '20%' }} className="floating" /> */}


            </div>
        );
    }
}

export default ReactionEmojis;
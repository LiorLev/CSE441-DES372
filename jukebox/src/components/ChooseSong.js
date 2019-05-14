import React, { Component } from 'react';
import { HashRouter as Router, Switch, Redirect, Route, withRouter} from 'react-router-dom';
import Routes from '../routes';


class ChooseSong extends Component {
    render(){
        return(
            <h1>HEY</h1>
        );
    }
}

export default withRouter(ChooseSong);
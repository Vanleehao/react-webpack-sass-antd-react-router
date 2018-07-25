import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Login from './router/login';
import Page from './router/page';

import { Button } from 'antd';
import './App.scss';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
        }
    }

    add() {
        this.setState({ count: this.state.count + 1 });
    };

    render() {
        return (
            
            <Router>
                <div className="router">
                    <div className="container-title">
                        <h1>{this.state.count}</h1>
                        <Button type="primary" onClick={() => this.add()}>增加1</Button>
                    </div>
                    <div className="container">
                        <Route exact path="/" component={props=><Login />} />
                        <Route exact path="/page" component={props=><Page />} />
                    </div>
                </div>
            </Router>
        );
    }
}
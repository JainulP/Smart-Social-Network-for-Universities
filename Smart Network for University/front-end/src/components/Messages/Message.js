import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from '../App';
import Header from '../Header';
import SideNavBar from '../SideNavBar';

class Message extends Component {

    render() {
        return (
            <div>
                <Header/>
                <div>
                    <div className="row">
                        <div className="col-sm-3 col-md-2">
                            <SideNavBar/>
                        </div>
                        <div className="row col-sm-9 col-md-10 pt-3">
                            <h4>Messages will appear here</h4>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Message;

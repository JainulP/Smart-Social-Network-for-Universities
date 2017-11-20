import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from '../App';
import MyRequests from './MyRequests';
import AssignedToMe from './AssignedToMe';
import NewRequest from './NewRequest';
import Header from '../Header';
import SideNavBar from '../SideNavBar';

class Requests extends Component {

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
                            <div>
                                <BrowserRouter>
                                    <div>
                                        <div>
                                            <ul className="nav nav-tab">
                                                <Link className="nav-item" to="/requests">
                                                    <p className="nav-link active">My Requests</p>
                                                    {/* <a class="nav-link active" href="Requests/myrequest">My Requests</a> */}
                                                </Link>
                                                <Link className="nav-item" to="/newrequest">
                                                    <p className="nav-link">+New Request</p>
                                                    {/* <a class="nav-link active" href="Requests/myrequest">My Requests</a> */}
                                                </Link>
                                                <Link className="nav-item" to="/assignedtome">
                                                    <p className="nav-link">Assigned to Me</p>
                                                    {/* <a class="nav-link active" href="Requests/myrequest">My Requests</a> */}
                                                </Link>
                                            </ul>
                                        </div>
                                        <div>
                                            <Route exact path="/requests" render={() => (<MyRequests/>)}/>
                                            <Route exact path="/assignedtome" render={() => (<AssignedToMe/>)}/>
                                            <Route exact path="/newrequest" render={() => (<NewRequest/>)}/>
                                        </div>
                                    </div>
                                </BrowserRouter>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Requests;

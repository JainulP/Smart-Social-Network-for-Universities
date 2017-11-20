import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import App from '../App';
import MyRequests from './MyRequests';
import AssignedToMe from './AssignedToMe';
import NewRequest from './NewRequest';

class Requests extends Component {

    render() {
        return (
            <BrowserRouter basename="/Requests">
            <div>
                <nav
                    className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
                    <button
                        className="navbar-toggler navbar-toggler-right hidden-lg-up"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarsExampleDefault"
                        aria-controls="navbarsExampleDefault"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">Dashboard</a>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Settings</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Help</a>
                            </li>
                        </ul>
                        <form className="form-inline mt-2 mt-md-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>

                <div>
                    <div className="row">
                        <div className="col-sm-3 col-md-2" >
                        <nav id="navsidebar" className="hidden-xs-down bg-faded sidebar">
                            <ul className="nav nav-pills flex-column">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/App">Home
                                        <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/Messages'>Messages</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/Files'>Files</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/'>Requests</Link>
                                </li>
                            </ul>
                        </nav>
                        </div>
                        <div className="row col-sm-9 col-md-10 pt-3">
                            <div>
                                <div>
                                    <ul className="nav nav-tab">
                                        <Link className="nav-item" to="/">
                                            <p className = "nav-link active">My Requests</p>
                                            {/* <a class="nav-link active" href="Requests/myrequest">My Requests</a> */}
                                        </Link>
                                        <Link className="nav-item" to="/newrequest">
                                            <p className = "nav-link">+New Request</p>
                                            {/* <a class="nav-link active" href="Requests/myrequest">My Requests</a> */}
                                        </Link>
                                        <Link className="nav-item" to="/assignedtome">
                                            <p className = "nav-link">Assigned to Me</p>
                                            {/* <a class="nav-link active" href="Requests/myrequest">My Requests</a> */}
                                        </Link>
                                    </ul>
                                </div>
                                <div>
                                    <Route exact path="/" render={() => (<MyRequests/>)}/>
                                    <Route exact path="/assignedtome" render={() => (<AssignedToMe/>)}/> 
                                    <Route exact path="/newrequest" render={() => (<NewRequest/>)}/>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </BrowserRouter>
        );
    }
}

export default Requests;

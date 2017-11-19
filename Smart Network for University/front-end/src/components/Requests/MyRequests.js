import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class MyRequests extends Component {

    render() {
        return (
            <div>
                <nav
                    className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
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

                <div className="container-fluid">
                    <div className="row">
                        <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
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
                                    <Link className="nav-link" to='/Requests'>Requests</Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
                             <h1>MyRequests</h1>
                             Add your components here
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyRequests;

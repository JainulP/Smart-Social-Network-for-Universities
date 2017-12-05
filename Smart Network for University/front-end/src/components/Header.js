import React, {Component} from 'react';
import {withRouter, Route, Link, Switch} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Requests from './Requests/Requests';
import Home from './Home';
import '../public/style.css';
import user from '../public/user.svg';

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
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
                <Link className="navbar-brand" to="/App">Dashboard</Link>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/App">Home
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                    </ul>
                    <form className="form-inline mt-2 mt-md-0">
                        <p style={{color:'white', marginTop:0, paddin:0}}>{localStorage.EmailId}</p>
                        <button id="btnUser" type="button" className="c-btn c-btn--tertiary--2"
                            onClick = {() => this.props.history.push("/UserInfo")}>
                            <img type="image/svg+xml" src={user} height="45" alt='logo'/>
                        </button>
                    </form>
                </div>
            </nav>
        );
    }
}

export default withRouter(Header);
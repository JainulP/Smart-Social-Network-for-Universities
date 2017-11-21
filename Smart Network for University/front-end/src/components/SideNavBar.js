import React, {Component} from 'react';
import {withRouter, Route, Link, Switch} from 'react-router-dom';
import { BrowserRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Requests from './Requests/Requests';
import Home from './Home';
import '../public/style.css'
// import React, { Component } from "react";
// import { withRouter } from 'react-router-dom';
// import '.././CSS/homepagecss.css';

class SideNavBar extends  Component{
    render() {
        return (
            // <nav className="col-sm-2 bg-light profile-sidebar">
            //     {/*<div className="profile-userpic">*/}
            //         {/*<img className="maestro-nav__logo" aria-label="Home" alt="Dropbox" src="https://cfl.dropboxstatic.com/static/images/index/rebrand/logos/glyphs/glyph_blue.svg" role="img"  data-reactid="12"/>*/}
            //     {/*</div>*/}
            //     <ul className="nav nav-pills flex-column firstelement">
            //         <li className="nav-item">
            //             <a className="nav-link" href="/App">Home <span className="sr-only">(current)</span></a>
            //         </li>
            //         <li className="nav-item">
            //             <a className="nav-link" href="/Messages">Messages</a>
            //         </li>
            //         <li className="nav-item">
            //             <a className="nav-link" href="/Files">Files</a>
            //         </li>
            //         <li className="nav-item">
            //             <a className="nav-link" href="/Requests">Requests</a>
            //         </li>
            //     </ul>
            // </nav>
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
                    <Link className="nav-link" to='/requests'>Requests</Link>
                </li>
                <br/>
                <li className="nav-item">
                    <Link className="nav-link" to='/'>Logout</Link>
                </li>
            </ul>
        </nav>
        );
    }
}

export default withRouter(SideNavBar);
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import '.././CSS/homepagecss.css';

class SideNavBar extends  Component{
    render() {
        return (
            <nav className="col-sm-2 bg-light profile-sidebar">
                {/*<div className="profile-userpic">*/}
                    {/*<img className="maestro-nav__logo" aria-label="Home" alt="Dropbox" src="https://cfl.dropboxstatic.com/static/images/index/rebrand/logos/glyphs/glyph_blue.svg" role="img"  data-reactid="12"/>*/}
                {/*</div>*/}
                <ul className="nav nav-pills flex-column firstelement">
                    <li className="nav-item">
                        <a className="nav-link" href="/App">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Messages">Messages</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Files">Files</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Requests">Requests</a>
                    </li>
                </ul>

            </nav>
        );
    }
}

export default withRouter(SideNavBar);
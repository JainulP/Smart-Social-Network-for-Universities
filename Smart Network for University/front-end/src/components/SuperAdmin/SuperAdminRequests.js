import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from '../App';
import MyRequests from '../Requests/MyRequests';
import AssignedToMe from '../Requests/AssignedToMe';
import NewRequest from '../Requests/NewRequest';
import Header from '../Header';
import SideNavBar from '../SideNavBar';
import * as RequestAPI from '../../api/RequestAPI';
import {LoadMyRequests, LoadAssignedRequests} from '../../actions/requests';
import user from '../../public/user.svg';

class AdminRequests extends Component {
    

    render() {
        return (
            <div>
                {/* <Header/> */}
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
                <Link className="navbar-brand" to="/SuperAdminHome">Super Admin</Link>
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
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
                <div>
                    <div className="row">
                        <div className="col-sm-3 col-md-2">
                            <nav id="navsidebar" className="hidden-xs-down bg-faded sidebar">
                                <ul className="nav nav-pills flex-column">
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/SuperAdminHome">Home
                                            <span className="sr-only">(current)</span>
                                        </Link>
                                    </li>
                                    <br/>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/SuperAdminrequests'>Requests</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/'>Logout</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="row col-sm-9 col-md-10 pt-3">
                            <div>
                                <BrowserRouter>
                                    <div>
                                        <div>
                                            <ul className="nav nav-tab">
                                                <Link className="nav-item" to="/assignedtome">
                                                    <p className="nav-link">Assigned to Me</p>
                                                    {/* <a class="nav-link active" href="Requests/myrequest">My Requests</a> */}
                                                </Link>
                                            </ul>
                                        </div>
                                        <div>
                                            <Route exact path="/assignedtome" render={() => (<AssignedToMe/>)}/>
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


function mapDispatchToProps(dispatch){
    return bindActionCreators({LoadMyRequests: LoadMyRequests,LoadAssignedRequests : LoadAssignedRequests},dispatch);
}

function mapStateToProps(state){
    return {
        myRequests: state.myRequests,
        assignedRequests : state.myRequests
    }
}

export default connect(mapDispatchToProps)(AdminRequests);

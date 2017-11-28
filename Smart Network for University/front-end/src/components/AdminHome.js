import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as RemUserAPI from '../api/RemUserAPI';
import * as GetMembersAPI from '../api/getmembersAPI';
import deleteicon from './../public/delete.svg';
import {LoadMyRequests, LoadAssignedRequests} from '../actions/requests';
import {LoadMembers} from '../actions/user';
import AddUser from './Admin/AddUser';
import AddExistingUser from './Admin/AddExistingUser';
import user from '../public/user.svg';
import Requests from './Requests/Requests';

class AdminHome extends Component {

    componentDidMount() {
        var departmentid = this.props.userdetail.departmentid;
        GetMembersAPI
            .getMembers({departmentid})
            .then((obj) => {
                this
                    .props
                    .LoadMembers(obj);
            });
    }

    updateDelete(member){
        RemUserAPI.removeUser({member})
        .then((status) => {
            if(status == 201){
                console.log("User Deleted");
                var departmentid = this.props.userdetail.departmentid;
                GetMembersAPI
                    .getMembers({departmentid})
                    .then((obj) => {
                        this
                            .props
                            .LoadMembers(obj);
                    });
            }    
            else{
                console.log("Error Occured while updating file.");
            }   
        });
        
    }

    createMemberList() {
        if (this.props.members.members) {
            return this
                .props
                .members
                .members
                .map((memberItem) => {
                    return (
                        <tr>
                            <td>
                                {memberItem.userid}
                            </td>
                            <td>
                                {memberItem.firstname}
                            </td>
                            <td>
                                {memberItem.lastname}
                            </td>
                            <td>
                                {memberItem.emailid}
                            </td>
                            <td width="30">
                                <button className="c-btn c-btn--tertiary--2">
                                    <img type="image/svg+xml" src={deleteicon} height="17px" onClick={() => this.updateDelete(memberItem)} alt='logo'/>
                                </button>
                            </td>
                        </tr>
                    );
                });
        }
    }

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
                <Link className="navbar-brand" to="/AdminHome">Admin</Link>
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                </ul>
                <form className="form-inline mt-2 mt-md-0">
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
                                        <Link className="nav-link active" to="/AdminHome">Home
                                            <span className="sr-only">(current)</span>
                                        </Link>
                                    </li>
                                    <br/>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/requests'>Requests</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/'>Logout</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-sm-9 col-md-10 pt-3">
                            <div className="col-md-9">
                                <h4>Department Members:</h4>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>StudentId</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.createMemberList()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-md-3">
                                <AddUser/>
                            </div>
                            <div className="col-md-6">
                                <AddExistingUser/>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        LoadMyRequests: LoadMyRequests,
        LoadAssignedRequests: LoadAssignedRequests,
        LoadMembers: LoadMembers
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        myRequests: state.myrequests, 
        assignedRequests: state.assignedrequests,
        userdetail: state.userdetail,
        members: state.members
    }       
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);

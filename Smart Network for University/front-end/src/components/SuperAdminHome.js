import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as RemComAPI from '../api/RemComAPI';
import deleteicon from './../public/delete.svg';
import {LoadMyRequests, LoadAssignedRequests} from '../actions/requests';
import {LoadMembers} from '../actions/user';
import {LoadDepartments} from '../actions/files';
import AddCommunity from './SuperAdmin/AddCommunity';
import  AddAdmin from './SuperAdmin/AddAdmin';
import user from '../public/user.svg';
import * as CommunityAPI from '../api/CommunityAPI';

class SuperAdminHome extends Component {

    componentDidMount() {
        CommunityAPI.getAllCommunties()
        .then((obj) => {
            this.props.LoadDepartments(obj);
        });
    }

    updateDelete(dep){
        RemComAPI.remCom({dep})
        .then((status) => {
            if(status == 201){
                console.log("Department Deleted");
                CommunityAPI.getAllCommunties()
                .then((obj) => {
                    this.props.LoadDepartments(obj);
                });
            }    
            else{
                console.log("Error Occured while deleting department.");
            }   
        });
        
    }

    createDepartmentList() {
        if (this.props.departments.departments) {
            return this
                .props
                .departments
                .departments
                .map((departmentItem) => {
                    return (
                        <tr>
                            <td width="30">
                                {departmentItem.departmentid}
                            </td>
                            <td>
                                {departmentItem.dep_name}
                            </td>
                            <td width="30">
                                <button className="c-btn c-btn--tertiary--2">
                                    <img type="image/svg+xml" src={deleteicon} height="17px" onClick={() => this.updateDelete(departmentItem)} alt='logo'/>
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
                <Link className="navbar-brand" to="/AdminHome">Super Admin</Link>
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
                                        <Link className="nav-link" to='/AssignAdmin'>Assign Admin</Link>
                                    </li>
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
                            <div className="col-md-6">
                                <h4>Departments:</h4>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>DepartmentId</th>
                                                <th>Name</th>
                                                <th> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.createDepartmentList()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-md-3">
                                <AddCommunity/>
                            </div>
                                <div className="col-md-3">
                                    <AddAdmin/>
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
        LoadMembers: LoadMembers,
        LoadDepartments: LoadDepartments
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        myRequests: state.myrequests, 
        assignedRequests: state.assignedrequests,
        userdetail: state.userdetail,
        members: state.members,
        departments: state.departments
    }       
}

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminHome);

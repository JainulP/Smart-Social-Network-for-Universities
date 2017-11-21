import React, {Component} from 'react';
import { Route, withRouter} from 'react-router-dom';
//import './../public/scooter.css';
//import Login from './Login';
import * as AddComAPI from '../../api/AddComAPI';
//import RemCommunity from '../components/RemCommunity';
import * as CommunityAPI from '../../api/CommunityAPI';
import { LoadDepartments } from '../../actions/files';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class AddCommunity extends Component {

    state = {
        departmentdata: {
            dep_name: ''
            // dep_admin: ''
        },
        isAdded : ''
    };

    handleAddCom = () => {
        AddComAPI.addCom(this.state.departmentdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isAdded: true,
                    });
                    CommunityAPI.getAllCommunties()
                    .then((obj) => {
                        this.props.LoadDepartments(obj);
                    });
                }
                else if (status === 401) {
                    this.setState({
                        isAdded: false,
                    });
                }
            });
    }

    render() {
        return (
            <div className="container-fluid">
               
                                <form>
                                    <div className="form-group">
                                        <h3>Add Department</h3>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            label="dep_name"
                                            placeholder="Department Name"
                                            value={this.state.departmentdata.dep_name}
                                            onChange={(event) => {
                                                this.setState({
                                                    departmentdata: {
                                                        ...this.state.departmentdata,
                                                        dep_name: event.target.value
                                                    }
                                                });
                                            }}/>
                                    </div>
                                    <div className="form-group">
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => this.handleAddCom()}>
                                            Add
                                        </button>
                                    </div>
                                </form>
                            
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        LoadDepartments: LoadDepartments
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        userdetail: state.userdetail,
        members: state.members
    }       
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCommunity);
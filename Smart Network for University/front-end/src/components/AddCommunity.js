import React, {Component} from 'react';
import { Route, withRouter} from 'react-router-dom';
//import './../public/scooter.css';
//import Login from './Login';
import * as AddComAPI from './../api/AddComAPI';
import RemCommunity from "./RemCommunity";
//import RemCommunity from '../components/RemCommunity';


class AddCommunity extends Component {

    state = {
        departmentdata: {
            dep_name: '',
            dep_admin: ''
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
                    this.props.history.push("/RemCommunity");
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
                <Route
                    exact
                    path="/AddCommunity"
                    render={() => (
                        <div className="row justify-content-md-center">
                            <div className="col-md-3">
                                <form>
                                    <div className="form-group">
                                        <h3>Add Department/Admin</h3>
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
                                        <input
                                            className="form-control"
                                            type="text"
                                            label="dep_admin"
                                            placeholder="Department Admin"
                                            value={this.state.departmentdata.dep_admin}
                                            onChange={(event) => {
                                                this.setState({
                                                    departmentdata: {
                                                        ...this.state.departmentdata,
                                                        dep_admin: event.target.value
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
                        </div>
                    )}/>
                <Route exact path="/RemCommunity" render={() => (<RemCommunity/>)}/>
            </div>
        );
    }
}

export default withRouter(AddCommunity);
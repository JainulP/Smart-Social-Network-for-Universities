import React, {Component} from 'react';
import { Route, withRouter} from 'react-router-dom';
//import './../public/scooter.css';
//import Login from './Login';
import * as RemComAPI from './../api/RemComAPI';
import App from "./App";


class RemCommunity extends Component {

    state = {
        departmentdata: {
            dep_name: ''
        },
        isRemoved : ''
    };

    handleRemCom = () => {
        RemComAPI.remCom(this.state.departmentdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isRemoved: true,
                    });
                    this.props.history.push("/App");
                }
                else if (status === 401) {
                    this.setState({
                        isRemoved: false,
                    });
                }
            });
    }

    render() {
        return (
            <div className="container-fluid">
                <Route
                    exact
                    path="/RemCommunity"
                    render={() => (
                        <div className="row justify-content-md-center">
                            <div className="col-md-3">
                                <form>
                                    <div className="form-group">
                                        <h2>Remove Department</h2>
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
                                            onClick={() => this.handleRemCom()}>
                                            Remove Department
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}/>
                <Route exact path="/App" render={() => (<App/>)}/>
            </div>
        );
    }
}

export default withRouter(RemCommunity);
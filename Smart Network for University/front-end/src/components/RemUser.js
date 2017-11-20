import React, {Component} from 'react';
import { Route, withRouter} from 'react-router-dom';
import './../public/scooter.css';
//import Login from './Login';
import * as RemUserAPI from './../api/RemUserAPI';


class Signup extends Component {

    state = {
        userdata: {
            emailid: '',
        },
        isRemoved : ''
    };

    handleRemUser= () => {
        RemUserAPI.removeUser(this.state.userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isRemoved: true,
                    });
                    this.props.history.push("/");
                } else if (status === 401) {
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
                    path="/"
                    render={() => (
                        <div className="row justify-content-md-center">
                            <div className="col-md-3">
                                <form>
                                    <div className="form-group">
                                        <h1>Delete User</h1>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="email"
                                            label="emailid"
                                            placeholder="Email ID"
                                            value={this.state.userdata.emailid}
                                            onChange={(event) => {
                                                this.setState({
                                                    userdata: {
                                                        ...this.state.userdata,
                                                        emailid: event.target.value
                                                    }
                                                });
                                            }}/>
                                    </div>
                                    <div className="form-group">
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => this.handleRemUser()}>
                                            Delete
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}/>
                <Route exact path="/" render={() => (<Login/>)}/>
            </div>
        );
    }
}

export default withRouter(RemUser);
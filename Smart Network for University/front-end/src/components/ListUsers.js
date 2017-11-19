import React, {Component} from 'react';
import { Route, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as LoginAPI from '../api/LoginAPI';
import App from "./App";

class Login extends Component {

    handleLogin = () => {


        var payload;
        payload = {
            EmailId:this.state.userdata.EmailId,
            Password:this.state.userdata.Password
        }


        LoginAPI.doLogin(payload)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!"
                    });
                    this.props.history.push("/App");

                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    }

    render() {
        return (
            <div>
                <Route
                    exact
                    path="/"
                    render={() => (
                        <div className="row justify-content-md-center">
                            <div className="col-md-3">
                                <form>
                                    <div className="form-group">
                                        <h1>Users List</h1>
                                    </div>
                                    <div className="form-group">

                                    </div>
                                </form>
                            </div>
                        </div>
                    )}/>
                <Route exact path="/" render={() => (<App/>)}/>
            </div>
        );
    }
}



export default withRouter(ListUsers);
import React, {Component} from 'react';
import { Route, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as LoginAPI from '../api/LoginAPI';
import App from "./App";
import MyRequests from './Requests/MyRequests';
import Files from './Files/FileGrid';
import {LoadFiles, LoadShared} from '../actions/files'
import * as FilesAPI from '../api/GetFilesAPI';
import PropTypes from 'prop-types';


class Login extends Component {

    state = {
        userdata: {
            EmailId: '',
            Password: ''
        },
        isLoggedIn: false,
        message: '',
    };

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

// var userId = 1;
//                 FilesAPI.getFiles({userId})
//                     .then((obj) => {
//                     this.setState({
//                         ...this.state,
//                         files:obj
//                     });
//                         //this.props.LoadFiles(obj);
//                     });
//                 console.log("*******");
//                 console.log(this.state);
//                 console.log("*******");
//                 FilesAPI.getSharedFiles({userId})
//                     .then((obj) => {
//                         //this.props.LoadShared(obj);
//                     });
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
                                    <h1>Login</h1>
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        label="Username"
                                        placeholder="Enter Username"
                                        value={this.state.userdata.EmailId}
                                        onChange={(event) => {
                                        this.setState({
                                            userdata: {
                                                ...this.state.userdata,
                                                EmailId: event.target.value
                                            }
                                        });
                                    }}/>
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="password"
                                        label="password"
                                        placeholder="Enter Password"
                                        value={this.state.userdata.Password}
                                        onChange={(event) => {
                                        this.setState({
                                            userdata: {
                                                ...this.state.userdata,
                                                Password: event.target.value
                                            }
                                        });
                                    }}/>
                                </div>
                                <div className="form-group">
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => this.handleLogin()}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                            <p>Don't have an account yet? 
	                	        <a href="Signup">Sign Up</a>
	                        </p>
                        </div>
                    </div>
                )}/>
                <Route exact path="/App" render={() => (<App/>)}/>
                <Route exact path="/Requests" render={() => (<MyRequests/>)}/>
                {/* <Route exact path="/Messages" render={() => (<Messages/>)}/> */}
                 <Route exact path="/Files" render={() => (<Files/>)}/>
            </div>
        );
    }
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({LoadFiles : LoadFiles, LoadShared: LoadShared}, dispatch);
// }


export default withRouter(Login);
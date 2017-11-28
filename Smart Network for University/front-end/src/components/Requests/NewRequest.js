import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {LoadMyRequests} from '../../actions/requests';
import * as RequestAPI from '../../api/RequestAPI';

class NewRequests extends Component {

    state = {
        subject: "",
        description: "",
        department: "",
        assignedTo: ""
    };

    createRequest = () => {
        var userId = localStorage.EmailId;
        RequestAPI
            .createRequest(this.state)
            .then((status) => {
                if (status === 200) {
                    console.log("Request Created!");
                    RequestAPI
                    .getRequest({userId})
                    .then((obj) => {
                        this.props.LoadMyRequests(obj);
                });
                } else if (status === 400) {
                    console.log("Unable to create request!");
                }
            });
    }

    render() {
        return (
            <div>
                <h3>New Request</h3>
                <div class="form-group row">
                    <label for="subject" class="col-3 col-form-label">Subject</label>
                    <div class="col-9">
                        <input
                            class="form-control"
                            type="text"
                            placeholder="Request Subject"
                            id="subject"
                            onChange={(event) => {
                            this.setState({subject: event.target.value});
                        }}/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="description" class="col-3 col-form-label">Description</label>
                    <div class="col-9">
                        <textarea
                            class="form-control"
                            id="description"
                            rows="3"
                            placeholder="Request Description"
                            onChange={(event) => {
                            this.setState({description: event.target.value});
                        }}></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="department" class="col-3 col-form-label">Department</label>
                    <div class="col-9">
                        <input
                            class="form-control"
                            type="text"
                            placeholder="Requested Department"
                            id="department"
                            onChange={(event) => {
                            this.setState({department: event.target.value});
                        }}/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="assignedTo" class="col-3 col-form-label">Assign To</label>
                    <div class="col-9">
                        <input
                            class="form-control"
                            type="text"
                            placeholder="Assign request to.."
                            id="assignedTo"
                            onChange={(event) => {
                            this.setState({assignedTo: event.target.value});
                        }}/>
                    </div>
                </div>
                <div className="form-group">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => this.createRequest()}>
                        Raise Request
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        myRequests: state.myrequests,
        assignedRequests : state.assignedrequests
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({LoadMyRequests: LoadMyRequests},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRequests);

import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {LoadMyRequests, LoadAssignedRequests} from '../../actions/requests';
import * as RequestAPI from '../../api/RequestAPI';


class AssignedToMe extends Component {

    state={
        status:''
    }

    componentDidMount() {
        var userId = localStorage.EmailId;
        RequestAPI.getAssignedToMe({userId})
            .then((obj) => {
                this.props.LoadAssignedRequests(obj);
            });
    }

    completeRequest(requestItem){
        var userId = localStorage.EmailId;
        RequestAPI.completeRequest({requestItem})
            .then((status) => {
                if (status === 200) {
                    console.log("Request Complete!");
                    RequestAPI.getAssignedToMe({userId})
                    .then((obj) => {
                        this.props.LoadAssignedRequests(obj);
                });
                } else if (status === 400) {
                    console.log("Unable to Complete request!");
                }
            });
    }

    createRequestList(){
        if(this.props.assignedRequests.assignedrequests){
        return this.props.assignedRequests.assignedrequests.map((requestItem) => {
            return(
                    <tr>
                        <td width = "30">
                            {requestItem.requestid}
                        </td>
                        <td>
                            {requestItem.description}
                        </td>
                        <td width = "120">
                            {requestItem.status}
                        </td>
                        <td width = "60">
                            {requestItem.createdby}
                        </td>
                        <td width = "60">
                            {requestItem.generated_date}
                        </td>
                        <td width = "60">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => this.completeRequest(requestItem)}>
                            Mark Complete
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
                {/* <h3>My Requests</h3> */}
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ReqId</th>
                                <th>Request</th>
                                <th>Status</th>
                                <th>Created By</th>
                                <th>Created Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.createRequestList()}
                            {/* <tr onClick={(event) => {alert("rowclicked");}}>
                                <td>1</td>
                                <td>Lorem</td>
                                <td>ipsum</td>
                                <td>dolor</td>
                                <td>sit</td>
                            </tr> */}
                        </tbody>
                    </table>
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
    return bindActionCreators({LoadAssignedRequests : LoadAssignedRequests},dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(AssignedToMe);

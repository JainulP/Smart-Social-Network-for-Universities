import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {LoadMyRequests, LoadAssignedRequests} from '../../actions/requests';
import * as RequestAPI from '../../api/RequestAPI';


class AssignedToMe extends Component {

    componentDidMount() {
        var userId = localStorage.EmailId;
        RequestAPI.getAssignedToMe({userId})
            .then((obj) => {
                this.props.LoadAssignedRequests(obj);
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
                        <td width = "60">
                            {requestItem.status}
                        </td>
                        <td width = "60">
                            {requestItem.createdby}
                        </td>
                        <td width = "60">
                            {requestItem.generated_date}
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

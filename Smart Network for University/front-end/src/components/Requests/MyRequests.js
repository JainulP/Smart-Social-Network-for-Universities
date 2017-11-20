import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SideNavBar from '../SideNavBar';
import * as RequestAPI from '../../api/RequestAPI';
import {LoadMyRequests, LoadAssignedRequests} from '../../actions/requests';

class MyRequests extends Component {

    componentWillMount() {
        var userId = "t@gmail.com";
        RequestAPI.getRequest({userId})
            .then((obj) => {
                this.props.LoadMyRequests(obj);
            });
        RequestAPI.getAssignedToMe({userId})
            .then((obj) => {
                this.props.LoadAssignedRequests(obj);
            });
    }

    createRequestList(){
        if(this.props.myRequests.myrequests){
        return this.props.myRequests.myrequests.map((requestItem) => {
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
                            {requestItem.assignedto}
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
                <h3>My Requests</h3>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ReqId</th>
                                <th>Request</th>
                                <th>Status</th>
                                <th>Assigned To</th>
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

function mapDispatchToProps(dispatch){
    return bindActionCreators({LoadMyRequests: LoadMyRequests,LoadAssignedRequests : LoadAssignedRequests},dispatch);
}

function mapStateToProps(state){
    return {
        myRequests: state.myrequests,
        assignedRequests : state.assignedrequests
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRequests);

import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {LoadMyRequests} from '../../actions/requests';

class AssignedToMe extends Component {

    // createRequestList(){
    //     return this.props.myRequests.myRequests.map((requestItem) => {
    //         return(
    //                 <tr>
    //                     <td width = "30">
    //                         {this.renderIcon(requestItem)}
    //                     </td>
    //                     <td>
    //                         <button
    //                             className="c-btn c-btn--tertiary--3"
    //                             type="button"
    //                             onClick={() => this.handleClick(requestItem)}>
    //                                 {requestItem.Name}
    //                         </button>
    //                     </td>
    //                     <td width = "40">
    //                         {this.renderStarButton(requestItem)}
    //                     </td>
    //                     <td width = "40">
    //                         <button className="c-btn c-btn--tertiary" onClick={() => this.openShare(requestItem)}>
    //                             SHARE
    //                         </button>
    //                     </td>
    //                     <td width = "40">
    //                         <button className="c-btn c-btn--tertiary--2">
    //                         </button>
    //                     </td>
    //                 </tr>
    //         );
    //     });
    // }

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
                                <th>Created Date</th>
                                <th>Created By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* this.createRequestList() */}
                            <tr onClick={(event) => {alert("rowclicked");}}>
                                <td>1</td>
                                <td>Lorem</td>
                                <td>ipsum</td>
                                <td>dolor</td>
                                <td>sit</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        myRequests: state.myRequests
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({LoadMyRequests : LoadMyRequests},dispatch);
  }

export default AssignedToMe;

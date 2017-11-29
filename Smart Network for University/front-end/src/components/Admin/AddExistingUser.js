import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../../public/scooter.css';
import * as AddUserAPI from '../../api/AddUserAPI';
import {bindActionCreators} from 'redux';
import {LoadMembers} from '../../actions/user';
import * as GetMembersAPI from '../../api/getmembersAPI';

class AddExistingUser extends Component {

    state = {
        userdata: {
            studentid: '',
            departmentid: this.props.userdetail.departmentid
        },
        isAdded: ''
    };

    handleAddExistingUser = () => {
        AddUserAPI
            .addExistingUser(this.state.userdata)
            .then((status) => {
                if (status === 201) {
                    alert("Success giving rights to department!");
                    this.setState({isAdded: true});
                    var departmentid = this.props.userdetail.departmentid;
                    GetMembersAPI
                        .getMembers({departmentid})
                        .then((obj) => {
                            this.props.LoadMembers(obj);
                        });
                } else if (status === 401) {
                    this.setState({isAdded: false});
                }
            });
    }

    render() {
        return (
            <div>

                <form>
                    <div className="form-group">
                        <h4>Give department access to student with student id</h4>
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            label="studentid"
                            placeholder="Student Id"
                            value={this.state.userdata.studentid}
                            onChange={(event) => {
                                this.setState({
                                    userdata: {
                                        ...this.state.userdata,
                                        studentid: event.target.value
                                    }
                                });
                            }}/>
                    </div>

                    <div className="form-group">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => this.handleAddExistingUser()}>
                            Add
                        </button>
                    </div>
                </form>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        LoadMembers: LoadMembers
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        userdetail: state.userdetail,
        members: state.members
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExistingUser);
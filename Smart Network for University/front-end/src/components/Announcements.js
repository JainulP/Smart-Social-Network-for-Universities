import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AnnouncementAPI from '../api/AnnouncementAPI';
import {LoadAnnouncement} from '../actions/announcement';

class Announcements extends Component {

    state = {
        description: "",
    };

    componentWillMount(){
        var departmentId = localStorage.DepartmentId;
        AnnouncementAPI
        .getAnnouncement({departmentId})
        .then((obj) => {
            this.props.LoadAnnouncement(obj);
        });
    }

    createAnnouncement = () => {
        var payload = this.state;
        var userId = localStorage.UserId;
        var departmentId = localStorage.DepartmentId;
        AnnouncementAPI
            .createAnnouncement({payload, userId, departmentId})
            .then((status) => {
                if (status === 200) {
                    console.log("Announcement Created!");
                    AnnouncementAPI
                    .getAnnouncement({departmentId})
                    .then((obj) => {
                        this.props.LoadAnnouncement(obj);
                });
                } else if (status === 400) {
                    console.log("Unable to create Announcement!");
                }
            });
    }

    createAnnouncementList(){
        if(this.props.announcements.announcements){
            return this.props.announcements.announcements.map((item) => {
                return(
                    <div>
                        <h5>{item.firstname} {item.lastname}</h5>
                        <p>{item.description}</p>
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div>
                <div class="form-group">
                    <div class="col-9" style={{padding:0, marginBottom:5}}>
                        <textarea
                            class="form-control"
                            id="description"
                            rows="2"
                            placeholder="Announcement"
                            onChange={(event) => {
                            this.setState({description: event.target.value});
                        }}></textarea>
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => this.createAnnouncement()}>
                            Post Announcement
                        </button>
                    </div>
                </div>
                <div>
                    {this.createAnnouncementList()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        announcements: state.announcements
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        LoadAnnouncement:LoadAnnouncement
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);

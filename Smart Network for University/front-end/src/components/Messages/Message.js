import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from '../App';
import Header from '../Header';
import ChatSideBar from '../ChatSideBar';
import SideNavBar from '../SideNavBar';
import * as MessagesAPI from '../../api/MessagesAPI';
import * as CommunityAPI from '../../api/CommunityAPI';
import ChatContainer from '../ChatContainer';

class Message extends Component {
    constructor(props){
        super(props);
        this.state ={
            userdata: {
                userid: 9,
                userName: 'deepa4',
            },
            chatUsers: [],
            groups: [],
        };
    }

    renderChatBar() {
        MessagesAPI.getUsersLists(this.state.userdata).then((status) => {
            this.setState({
                chatUsers : status.result
            });

        });
    }

    renderGroups(){
        var userId = this.state.userdata.userid;
        CommunityAPI.getCommunties({userId}).then((status) => {
            this.setState({
                groups : status.departments
            });
        });
    }

    componentWillMount(){
        this.renderChatBar();
        this.renderGroups();
    }

    render() {
        return (
            <div>
                <Header/>
                <div>
                    <div className="row">
                        <div className="col-sm-3 col-md-2">
                            <SideNavBar
                            />
                        </div>
                        <div className="row col-sm-9 col-md-10 pt-3">
                           <div>
                                <ChatSideBar 
                                    chatUsers = {this.state.chatUsers}
                                    userdata = {this.state.userdata}
                                    groups = {this.state.groups}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Message;

import React, {Component} from 'react';
import '../public/style.css';
import ChatContainer from './ChatContainer';
import * as MessagesAPI from '../api/MessagesAPI';

class ChatSideBar extends  Component{
	constructor(props){
		super(props);
		this.state ={
            userdata: {
                userid: '',
                userName: 0
            },
            chatUsers: [],
            groups: [],
            messages : [{"message":"Click on a chat to read the messages."}],
           	usersInChat:{
           		 toUser:'',
           		fromUser:''
           	}
        };
        this.setState({
        	...this.state,
			userdata : this.props.userdata,
			chatUsers : this.props.chatUsers,
			groups: this.props.groups,
		});
		
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			userdata : nextProps.userdata,
			chatUsers : nextProps.chatUsers,
			groups: nextProps.groups,
		});
		
	}

	loadChatContent = (e) => {
		var userList = {
			fromUser: this.state.userdata.userid,
			toUser: e
		}
        MessagesAPI.getMessages({userList}).then((status) => {
            this.setState({
                messages : status.result
            });
        });
	}

    render() {
        return (
        	<div className="row">
			    <div id="chatsidebar" className="hidden-xs-down bg-faded sidebar">
					<div>
						{
						 this.state.chatUsers.map(function(users){
							  return (<div id="users" style={{ borderTop:1, paddingLeft: 40, paddingTop:8, paddingBottom: 8 }}><a id={users.userid} onClick={()=>this.loadChatContent(users.userid)}> {users.firstname} </a></div>)
						 }, this)
						}
					</div>
					<div>
						{
						 this.state.groups.map(function(group){
							  return (<div id="users" style={{ borderTop:1, paddingLeft: 40, paddingTop:8, paddingBottom: 8 }}><a id={group.departmentid} onClick={()=>this.loadChatContent(group.departmentid)}> {group.dep_name} </a></div>)
						 }, this)
						}
					</div>
			    </div>
			    <div id="chatContainer" className="row col-sm-9 col-md-10 pt-3">
                    <ChatContainer
                    	message = {this.state.messages}
                    />
                </div>
	        </div>
        );
    }
}
export {ChatSideBar};
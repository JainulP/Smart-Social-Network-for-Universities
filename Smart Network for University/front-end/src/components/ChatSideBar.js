import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../public/style.css';
import ChatContainer from './ChatContainer';
import {bindActionCreators} from 'redux';
import * as MessagesAPI from '../api/MessagesAPI';
import {LoadMessages} from '../actions/loadMessages';

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
            toUserId: null,
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
			...this.state,
			userdata : nextProps.userdata,
			chatUsers : nextProps.chatUsers,
			groups: nextProps.groups,
		});
		
	}

	changeHandle(e){
		this.setState({
        	messages: e.target.value
    	});
	}
	sendMessages(){
		var details = {
			fromUser: this.state.userdata.userid,
			toUser: this.state.toUserId,
			msg: this.state.messages
		}
		MessagesAPI.sendMessages(details).then((status) => {
			console.log("success");
			MessagesAPI.receiveMessages().then((status) => {
				console.log(status);
				var details = {
					fromUser: this.state.userdata.userid,
					toUser: this.state.toUserId,
					msg: this.state.messages
				}
				MessagesAPI.getUser(details).then((status)=>{
						var details = {
							fromUser: status.result,
						}
						// MessagesAPI.writeMessages(details).then((status) => {
      //       			this.props.LoadMessages(status);
        			// });
				})
			});
        });
	}

	addMessagesToUI(){
		if(this.props.messages){
			console.log(this.props.messages.messages);
			return this.props.messages.messages.map((mesg) => {
				return(
						<div>
	                        <h5>{mesg.firstname1}</h5>
	                        <p>{mesg.msg}</p>
	                    </div>
					)
				 })
		    }
		    else{
		    	return <div>Click on user from the list to see the chat</div>
		    }
	}

	loadChatContent = (e) => {
		this.setState({
			toUserId: e
		});
		var userList = {
			fromUser: this.state.userdata.userid,
			toUser: e
		}
        MessagesAPI.getMessages({userList}).then((status) => {
            this.props.LoadMessages(status);
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

					<div>
		        		<div id="chats">
				        	{this.addMessagesToUI()}
		        		</div>
		        		<div id="inputMessage" className="input-group">
				      		<input 
				      			type="text" 
				      			className="form-control" 
				      			placeholder="Type a message....." 
				      			name="message"
				      			id="chatInput"
				      			onChange = {(event)=>this.changeHandle(event)}
				      		/>
					      	<div className="input-group-btn">
						       	<button className="btn btn-primary" onClick={()=>this.sendMessages()} type="submit">Send</button>
					      	</div>
			    		</div>
		        	</div>

                </div>
	        </div>
        );
    }
}

function mapStateToProps(state){
    return {
        messages: state.messages
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        LoadMessages:LoadMessages
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatSideBar);
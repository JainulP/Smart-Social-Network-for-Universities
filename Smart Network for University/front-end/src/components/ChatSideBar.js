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
            currentGroup:null,
            toUserId: null,
            messages : [{"message":"Click on a chat to read the messages."}],
           	usersInChat:{
           		 toUser:'',
           		fromUser:''
           	},
           	isGroup: false
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
	componentDidMount(){
		setInterval( () => { 
	var userList = {
		fromUser: localStorage.firstname,
		toUser: localStorage.tousr
	}
	MessagesAPI.getMessages({userList}).then((status) => {
		this.props.LoadMessages(status);
	});
	}, 3000);
}

	changeHandle(e){
		this.setState({
        	messages: e.target.value
    	});
	}

	sendMessages(){
		if(this.state.isGroup){
			var details = {
				fromUser: localStorage.firstname,
				toUser: this.state.currentGroup,
				msg: this.state.messages
			}
			
			MessagesAPI.writeGroupMessages(details).then((status) => {
	         });
		}else {
			var details = {
				fromUser: localStorage.firstname,
				toUser: this.state.toUserId,
				msg: this.state.messages
			}
			 MessagesAPI.writeMessages(details).then((status) => {
	         });
		}
	}

	addMessagesToUI(){
		if(this.props.messages){
			console.log(this.props.messages.messages);
			return this.props.messages.messages.map((mesg) => {
				return(
						<div>
	                        <h5> <strong>{mesg.firstname1}</strong></h5>
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
		localStorage.tousr = e;
		this.setState({
			toUserId: e,
			isGroup: false
		});
		var userList = {
			fromUser: localStorage.firstname,
			toUser: e
		}
        MessagesAPI.getMessages({userList}).then((status) => {
            this.props.LoadMessages(status);
        });
	}

	loadGroupContent = (e) => {
		localStorage.tousr = e;
		this.setState({
			currentGroup: e,
			isGroup: true
		});
		var userList = {
			fromUser: localStorage.firstname,
			toUser: e
		}
        MessagesAPI.getGroupMessages({userList}).then((status) => {
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
							  return (<div id="users" style={{ borderTop:1, paddingLeft: 40, paddingTop:8, paddingBottom: 8 }}><a id={users.userid} onClick={()=>this.loadChatContent(users.firstname)}> {users.firstname} </a></div>)
						 }, this)
						}
					</div>
					<div>
						{
						 this.state.groups.map(function(group){
							  return (<div id="users" style={{ borderTop:1, paddingLeft: 40, paddingTop:8, paddingBottom: 8 }}><a id={group.departmentid} onClick={()=>this.loadGroupContent(group.dep_name)}> {group.dep_name} </a></div>)
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
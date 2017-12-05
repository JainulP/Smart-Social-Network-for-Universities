import React, {Component} from 'react';
import '../public/style.css';
import * as MessagesAPI from '../api/MessagesAPI';

class ChatContainer extends  Component{
	constructor(props){
		super(props);
		this.state={
			messages:null,
		};
		this.setState({
			messages : this.props.messages
		});
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			...this.state,
			messages : nextProps.message,
		});
		console.log(this.state.messages);
	}

	sendMessages(){
		var msg = {
			message : this.state.messages
		}
		MessagesAPI.sendMessages(msg).then((status) => {
			console.log("success");
			// MessagesAPI.receiveMessages().then((status) => {
			// 	console.log(status);
			// });
        });
	}

	changeHandle(e){
		this.setState({
        	messages: e.target.value
    	});
	}


	addMessagesToUI(){
		if(this.state.messages){
			return
		         this.state.messages.map((mesg) => {
		        	 return (mesg.msg)
				 });
		    }
		    else{
		    	return "no messages so far"
		    }
	}

	 render() {
        return (
        	<div>
        		<div id="chats">
        		Click on user from the list to see the chat
        			<body>
	        			{this.addMessagesToUI()}
        			</body>
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
       	);
    }
}
export default ChatContainer;
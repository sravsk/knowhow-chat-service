import React from 'react';
import styled from 'styled-components';
import socketIOClient from 'socket.io-client';
import Messages from './Messages.jsx';

const Input = styled.input`
  resize: none;
  border-radius: 3px;
  padding: 18px;
  padding-right: 100px;
  padding-left: 29px;
  height: 100%;
  font-family: "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.33;
  border-top: 1px solid #e6e6e6;
  display: block;
  width : 100%;
`;

const Username = styled.div`
	width : 100%;
  height: 100%;
	font-family: "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 14px;
	font-weight: 400;
	line-height: 1.33;
	display: block;
	border-radius: 3px;
	border-style: solid none none;
	border-image: initial;
	padding: 18px 100px 18px 29px;
	border-top: 1px solid rgb(230, 230, 230);
	color : #777;
`;


class Chat extends React.Component{
	constructor(props){
		super(props);
		this.socket = null;
		this.state = {
			users : [],
			messages : [],
			message : '',
			username : '',
			open : false,
			showDockedWidget : true,
			knowhowChat : 'knowhow-chat-wrapper-show'
		}
	}

	componentDidMount(){
		this.initializeChat();
	}

	initializeChat(){
		//expose a standalone build of socket io client by socket.io server 
		this.socket = socketIOClient('ws://localhost:5000');
		this.socket.on('message', (message) => {
			this.setState({
				messages : this.state.messages.concat([message])
			})
		})
	}

	onChange(e) {
		this.setState({
			message : e.target.value
		})
	}

	onKeyUp(e) {
		var typing = true;
		if(e.key === 'Enter') {
			if(this.state.message.length){
				this.sendMessage({
					type : 'message',
					text : this.state.message
				})
				e.target.value = '';
				this.setState({
					username : ''
				})
			} else {
				alert('Please enter a message');
			}
		} else {
			typing = true;
			this.socket.emit('typing', typing)
			this.setState({
				username : 'Anonnymous'
			})
		}
	}

	sendMessage(message, e){
		this.setState({
			messages : this.state.messages.concat({
				message : message
				})
		})
		this.socket.emit('message', {
			message : message,
			username : this.state.username
		})
	}

	handleToggleOpen() {
		this.setState((prev) => {
			let { showDockedWidget } = prev;
			if (!prev.open) {
				showDockedWidget = false;
			}
			return {
				showDockedWidget,
				open: !prev.open
			}
		})
	}

	handleBackButton(){
		console.log("working")
		this.setState ({
			knowhowChat : 'knowhow-chat-wrapper'
		})
	}

	render(){
		const isTyping = this.state.username;
		let user;
		if(isTyping) {
			user = isTyping + ' is typing...'
		}  else {
			user = ''
		}
		return(
					<div>
					<Messages messages={this.state.messages} sendMessage={this.sendMessage.bind(this)}></Messages>
					<Input 
						autocomplete="off" 
						placeholder="write a message" 
						onChange={this.onChange.bind(this)}
						onKeyUp={this.onKeyUp.bind(this)}/>
					<Username>{user}</Username>
					</div>
		
			)
	}
}

export default Chat;
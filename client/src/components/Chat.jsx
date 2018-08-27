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
			user : '',
			open : false,
			showDockedWidget : true,
			knowhowChat : 'knowhow-chat-wrapper-show',
			uid : localStorage.getItem('uid') ? localStorage.getItem('uid') : this.generateUID()
		}
	}

	componentDidMount(){
		this.initializeChat();
	}

	// generate a random string, use it to set uid key on local storage
	// can identify users accessing chat app from different browser tabs
	generateUID(){
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 15; i++){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		localStorage.setItem('uid', text);
		return text;
	}

	initializeChat(){
		localStorage.setItem('user', this.props.customerData.name);
		localStorage.setItem('app_id', this.props.customerData.app_id)
		//expose a standalone build of socket io client by socket.io server 
		this.socket = socketIOClient('ws://localhost:5000', {
			query : 'user='+this.props.customerData.name+'&uid='+this.state.uid+'&appid='+this.props.customerData.app_id
		});
		var substring = "appid="
		var params = this.socket.query.split(substring).pop();
		this.socket.emit('join', params, (err) => {
			if(err) {
				alert(err)
			}
		});
		this.socket.on('updateUsersList', (users) => {
			this.setState({
				users : users
			})
		})
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
					user : ''
				})
			} else {
				alert('Please enter a message');
			}
		} else {
			typing = true;
			this.socket.emit('typing', typing)
			this.setState({
				user : this.props.customerData.name
			})
		}
	}

	sendMessage(message, e){
		this.socket.emit('message', {
		  user : this.props.customerData.name,
		  uid : localStorage.getItem('uid'),
			message : message,
			appid : this.props.customerData.app_id
		})
	}

	render(){
		const isTyping = this.state.user;
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
import React from 'react';
import styled from 'styled-components';
import socketIOClient from 'socket.io-client';
import Messages from './Messages.jsx';

const Wrapper = styled.div`
	box-shadow: 0 5px 40px rgba(0,0,0,.16)!important;
	border-radius: 8px!important;
	overflow-y: scroll;
	background: #fff;
	position: fixed !important;
	bottom: 20px !important;
	right: 10px !important;
	z-index: 9999 !important;
	width: 376px!important;
	height: auto !important;
	min-height: 400px;

	::-webkit-scrollbar {
		-webkit-appearance: none;
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    cursor: pointer;
    border-radius: 5px;
    background: rgba(0,0,0,.25);
    -webkit-transition: color .2s ease;
    transition: color .2s ease;
  }
`;


const Header = styled.div`
	padding: 0.4em;
  line-height: 30px !important;
  background: #159adc !important;
  color: #FFF !important;
  display: flex !important;
  align-items: stretch !important;
  overflow-x: hidden;
  overflow-y: auto;
  word-wrap: break-word;
  white-space: pre-line;
  font-family: "Open Sans", sans-serif;
  font: normal normal 100% "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 130%;
  font-style: normal;
  letter-spacing: normal;
  font-weight: 400;
  font-size: 30px;
`;

const Input = styled.input`
  resize: none;
  border-radius: 3px;
  border: none;
  resize: none;
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
	width: 64%;
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
	width: 64%;
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
			username : ''
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

	render(){
		const isTyping = this.state.username;
		let user;
		if(isTyping) {
			user = isTyping + ' is typing...'
		}  else {
			user = ''
		}
		return(
			<Wrapper>
					<Header>Chat with us!</Header>
					<Messages messages={this.state.messages} sendMessage={this.sendMessage.bind(this)}></Messages>
					<Input 
						autocomplete="off" 
						placeholder="write a message" 
						onChange={this.onChange.bind(this)}
						onKeyUp={this.onKeyUp.bind(this)}/>
					<Username>{user}</Username>
			</Wrapper>
			)
	}
}

export default Chat;
import React from 'react';

class Chat extends React.Component{
	constructor(props){
		super()
	}

	render(){
		return(
			<div>
				<ul id="messages"></ul>
						<input id="m" autocomplete="off" placeholder="write a message"/>
			</div>
			)
	}
}

export default Chat;
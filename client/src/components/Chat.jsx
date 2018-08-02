import React from 'react';

class Chat extends React.Component{
	constructor(props){
		super()
	}

	render(){
		return(
			<div>
				<ul id="messages"></ul>
					<form action="">
						<input id="m" autocomplete="off"/>
						<button>Chat</button>
					</form>
			</div>
			)
	}
}

export default Chat;
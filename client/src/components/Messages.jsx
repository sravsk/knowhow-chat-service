import React from 'react';
import styled from 'styled-components';
import Message from './Message.jsx';

const Section = styled.div`
	border-radius : 5px;
	min-height: 15em!important;
	margin: 1em;
	flex: 1;
`;

class Messages extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<Section>
			{this.props.messages.length ? (
					this.props.messages.map((message, index) => {
						return (
							<Message key={index} message={message}/>
							)
					})
					) : ''}
			</Section>
			)
	}
}

export default Messages;


	
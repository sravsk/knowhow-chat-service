import React from 'react';
import styled from 'styled-components';

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

const Section = styled.div`
	border : 1px solid #777;
	border-radius : 5px;
	min-height: 20em!important;
	margin: 1em;
	flex: 1;
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

const Textarea = styled.textarea`
  resize: none;
  border-radius: 3px;
  border: none;
  resize: none;
  padding: 18px;
  padding-right: 100px;
  padding-left: 29px;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.33;
  border-top: 1px solid #e6e6e6;
  display: block;
	width: 64%;
`;


class Chat extends React.Component{
	constructor(props){
		super()
	}

	render(){
		return(
			<Wrapper>
					<Header>Chat with us!</Header>
					<Section></Section>
					<Textarea autocomplete="off" placeholder="write a message"/>
			</Wrapper>
			)
	}
}

export default Chat;
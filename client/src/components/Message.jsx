import React from 'react';
import styled from 'styled-components';
//import avatar from 'https://s3-us-west-1.amazonaws.com/knowhow-s3/assets/nan.jpg';


const Well = styled.div`
	min-height: 2.2em;
  padding : 1em;
  font-size : 0.9em;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
  font-family: "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  `;

  const Avatar = styled.img`
    background-image: url(${'https://s3-us-west-1.amazonaws.com/knowhow-s3/assets/nan.jpg'});
    display: block;
    margin: 0 auto;
    width: 3em;
    height: 3em;
    border-radius: .25rem;
  `;

  const Wrapper = styled.div`
    float: left;
    padding : 0.5em 0.5em 0.5em;
    padding-right: 1em;
  `;

const Message = (props) => {
	return(
    <div>
    <Wrapper>
       <Avatar/>
      </Wrapper>
    <Well>
      {props.message.message.text}
    </Well>
    </div>
		)
}

export default Message;
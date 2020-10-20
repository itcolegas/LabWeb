import React from 'react';
import { Widget, renderCustomComponent } from "react-chat-widget";
import 'react-chat-elements/dist/main.css';
//import { MessageBox } from 'react-chat-elements'
import ReactHtmlParser from 'react-html-parser'
import axios from 'axios';

import './chat.css'

class Cheers extends React.Component{
  render() {
    return (
      <div className='speech-bubble'>
        {ReactHtmlParser(this.props.text)}
      </div>
    );
  }
}

class Chat extends React.Component {
  handleNewUserMessage = (newMessage) => {
    //renderCustomComponent(Cheers);
    this.handleSubmit(newMessage)
  };

  handleSubmit = (message) => {
    axios.post(`http://127.0.0.1:5002/getMessage`,{ message }).then((res) => {
      console.log(res.data);
      renderCustomComponent(Cheers, {text: res.data.text});
      return res.data;
    });
  };

  render(){
    return(
      <Widget
        handleNewUserMessage={this.handleNewUserMessage}
        title="ChatBot"
        subtitle="Pregúntame lo que quieras"
      >
      </Widget>
    )
  }    
    
}

export default Chat;
import React from 'react';
import { Widget, addResponseMessage, renderCustomComponent } from "react-chat-widget";
import 'react-chat-elements/dist/main.css';
import { MessageBox } from 'react-chat-elements'

class Cheers extends React.Component{
  render() {
    return (
      <MessageBox
      position={'left'}
      type={'photo'}
      text={'Bienvenido'}
      data={{
        uri: 'https://media.tenor.com/images/acc4116372dcc4b342cb1a00ae657151/tenor.gif'
      }
      }
      />
          
    )
  }
}

class Chat extends React.Component {
  handleNewUserMessage = (newMessage) => {
    renderCustomComponent(Cheers);
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
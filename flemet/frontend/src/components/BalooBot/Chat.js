import React from 'react';
import { Widget, renderCustomComponent } from "react-chat-widget";
import 'react-chat-elements/dist/main.css';
//import { MessageBox } from 'react-chat-elements'
import ReactHtmlParser from 'react-html-parser'
import Carousel from 'react-bootstrap/Carousel'
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

class Servicios extends React.Component{
  render() {
    return (
      <div className='speech-bubble'>
        {ReactHtmlParser(this.props.text)}
        <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/images/transporte.jpg"
    />
    <Carousel.Caption>
      <h1>Transporte</h1>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/images/almacenaje.jpg"

    />
    <Carousel.Caption>
      <h1>Almacenaje</h1>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/images/consultoria.png"
    />

    <Carousel.Caption>
      <h1>Consultoria</h1>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

  <p> Que servicio te gustaria conocer ?</p>
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
    axios.post(`http://127.0.0.1:4000/getMessage`,{ message }).then((res) => {
      console.log(res.data);
      console.log("------------------");
      if(res.data.intent == "PeticionServicio"){
        renderCustomComponent(Servicios, {text: res.data.text});
      }
      else{renderCustomComponent(Cheers, {text: res.data.text});}
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

import React from 'react';
import NavBar from "../NavBar/NavBar";
import {BrowserRouter as Router} from "react-router-dom";
import 'react-chat-widget/lib/styles.css'
import Chat from "../BalooBot/Chat";

import Cotizador from "./layouts/Cotizador/Cotizador"

export default function App(){

    return(
      <Router>
        <NavBar />
        <Cotizador />
        <Chat />
      </Router>
    );
}
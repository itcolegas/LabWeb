import React from 'react';
import NavBar from "./NavBaar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'react-chat-widget/lib/styles.css'
import Chat from "../BalooBot/Chat";
import { useAuth0 } from "@auth0/auth0-react";

export default function App(){

    return(
      <Router>
        <NavBar />
        <p>¡Ya estás dentro! :D</p>
        <Chat />
      </Router>
    );
}
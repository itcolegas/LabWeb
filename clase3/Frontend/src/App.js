import React from 'react';
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import NavBar from "./Components/NavBar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'react-chat-widget/lib/styles.css'
import Chat from "./Components/Chat";
import { useAuth0 } from "@auth0/auth0-react";

export default function App(){

    const { isLoading, isAuthenticated, loginWithRedirect} = useAuth0();

    return(
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
          <LandingPage />
          {/*isLoading?  <p> Cargando </p> : isAuthenticated? <LandingPage/> : loginWithRedirect()*/}
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
        <Chat />
      </Router>
    );
}

/*
import React from 'react';
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import NavBar from "./Components/NavBar";
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ChatBot from 'react-simple-chatbot';

<Widget handleNewUserMessage={handleNewUserMessage}
              title = "TEC"
              subtitle = "Cool subtitle"
        />


const steps = [
      {
      id: '1',
      message: 'Cual es tu nombre?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hola {previousValue}, mucho gusto!',
      trigger: '4',
    },
    {
      id: '4',
      message: 'Componentes estilo html',
      trigger: '5',
    },
    {
      id: '5',
      component: (
        <div style={{ width: '100%' }}>
        <p>Ejemplo de párrafo</p>
          <h3>Summary</h3>
          <table>
            <tbody>
              <tr>
                <td>Producto 1: </td>
                <td>Pants</td>
                <td>$5</td>
              </tr>
              <tr>
                <td>Producto 2: </td>
                <td>Blusa</td>
                <td>$7</td>
              </tr>
              <tr>
                <td>Producto 3: </td>
                <td>Shorts</td>
                <td>$3</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
      end: true,
    },
  ];

export default function App(){
    return(
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
        <ChatBot steps={steps} />
      </Router>
    );
}
*/

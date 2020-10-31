//React
import React from 'react';
 
//Layouts
import Home from './layouts/Home/Home';

//Components
import NavBar from './components/NavBar/NavBar';
import Chat from "./components/BalooBot/Chat";

//Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-chat-widget/lib/styles.css'

import './app.css'

function App() {
  return (
    <div className='app_container'>
      <NavBar/>
      <Home/>
      <Chat/>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import Checklogin from './components/LogIn/Checklogin';
import './index.css';
import { Auth0Provider } from "@auth0/auth0-react";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Auth0Provider
      domain="dev-clmv5xqq.us.auth0.com"
      clientId="qVNb9oB7Eg2yV0MEIkUOet4bNIMYfeDP"
      redirectUri={window.location.origin}
    >
      <Checklogin />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

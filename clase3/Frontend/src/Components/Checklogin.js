import React from 'react';
import App from "../App";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect} = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated?
  (
    <App/>
  ) :
  (
    //AQUI PONER LA LANDING PAGE SI EL USUARIO NO ESTA AUTENTIFICADO
    loginWithRedirect()
    //<LoginButton/>
  )
  ;
};

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

class Checklogin extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

    render(){
      return(
        <Profile />
      );
    }
}

export default Checklogin ;

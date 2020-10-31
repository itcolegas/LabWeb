import React from 'react';
import {Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./temporal.css"

const Profile = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated?
  (
    <div classname = 'temporal_style'>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <LogoutButton/>
    </div>
  ) :
  (
    //AQUI PONER LA LANDING PAGE SI EL USUARIO NO ESTA AUTENTIFICADO
    <p>Error</p>
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

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: "Que buscamos?",
    };
  }
  searchItem = (params) =>{
    console.log(params.target.value)
    this.setState = ({ //ESTE NO SIRVE
      search: params.target.value,
    });
  }
  render(){
    return(
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/user">User</Nav.Link>
          <Nav.Link href="/">{this.state.search}</Nav.Link>
        </Nav>

        <Form inline>
          <FormControl type="text" onChange={this.searchItem} placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
          <Profile/>
        </Form>
      </Navbar>
    );
  }
}
export default NavBar;

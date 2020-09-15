import React from 'react';
import {Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
        </Form>
      </Navbar>
    );
  }
}
export default NavBar;

import React from 'react';
import App from "../../App";
import TestApp from "../temporal/TestApp"
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const {isAuthenticated, isLoading} = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated? ( <TestApp/> ) : ( <App/> );
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

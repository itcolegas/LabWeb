//React
import React from 'react';

//Extensions
import { Button, Avatar } from '@material-ui/core';
import { useAuth0 } from "@auth0/auth0-react";

//Styles
import './navbar.css';

function NavBar(){

    const Profile = () => {
        const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
      
        if (isLoading) {
          return <div>Loading ...</div>;
        }
      
        return isAuthenticated?
        (
          <div className = 'nav_profile'>
            <div className = 'nav_profile_text'>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <Button 
                    classes = {{root : 'nav_logginButton'}} 
                    variant = 'contained' 
                    size = 'small' 
                    color='primary'
                    onClick={() => logout({ returnTo: window.location.origin })}>

                    CERRAR SESIÓN
                </Button>
            </div>
            <div className='avatar_img'>
                <img src={user.picture} alt={user.name} />   
            </div>
          </div>
        ) :
        (
            <div className='menu'>
                <Button classes = {{label : 'nav_button'}} size = 'small'>
                        Inicio
                    </Button>
                    <Button classes = {{label : 'nav_button'}} size = 'small'>
                        Nosotros
                    </Button>
                    <Button classes = {{label : 'nav_button'}} size = 'small'>
                        Servicios
                    </Button>
                    <Button classes = {{label : 'nav_button'}} size = 'small'>
                        Ventaja
                    </Button>
                    <Button classes = {{label : 'nav_button'}} size = 'small'>
                        Contacto
                    </Button>
                <Button 
                classes = {{root : 'nav_logginButton'}} 
                variant = 'contained' 
                size = 'small' 
                color='primary'
                onClick={() => loginWithRedirect()}>

                INICIAR SESIÓN / REGISTRARSE 
                </Button>
            </div>
        )
        ;
      };
    
    return(
        <div className='navbar'>
            <img src='images/logo/Logo.png' alt='Flemet Logo'/>
            <Profile/>
        </div>
    );
}

export default NavBar;
//React
import React from 'react';

//Extensions
import Button from '@material-ui/core/Button';
import { useAuth0 } from "@auth0/auth0-react";

//Styles
import './navbar.css';

function NavBar(){
    const { loginWithRedirect } = useAuth0();
    
    return(
        <div className='navbar'>
            <img src='images/logo/Logo.png' alt='Flemet Logo'/>
            <div className='menu'>
                <Button className = 'nav_button' size = 'small'>
                    Inicio
                </Button>
                <Button className = 'nav_button' size = 'small'>
                    Nosotros
                </Button>
                <Button className = 'nav_button' size = 'small'>
                    Servicios
                </Button>
                <Button className = 'nav_button' size = 'small'>
                    Ventaja
                </Button>
                <Button className = 'nav_button' size = 'small'>
                    Contacto
                </Button>
                <Button 
                    className = 'nav_button' 
                    variant = 'contained' 
                    size = 'small' 
                    color='primary'
                    onClick={() => loginWithRedirect()}>

                    INICIAR SESIÓN
                </Button>
            </div>
        </div>
    );
}

export default NavBar;
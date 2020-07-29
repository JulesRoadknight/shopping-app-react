import { Link, LinkContainer } from "react-router-bootstrap";
import { NavItem } from 'react-bootstrap';
import React from 'react';
import { useAppContext } from './libs/contextLib';


const LoginBar = ({data}) => {
  const setIsAuthenticated = useAppContext();
  const handleLogout = () => {
    setIsAuthenticated(false);
  }

  return(
    <div>
      <a href="/home">
        <button data-testid="homeButton" value='Home'>Home</button>
      </a>
      {data
        ? <button data-testid="logoutButton" onClick={handleLogout} value='Logout'>Logout</button>
        : <>
            <a href="/signup">
              <button data-testid="signupButton" value='Signup'>Signup</button>
            </a>
            <a href="/login">
              <button data-testid="loginButton" value='Login'>Login</button>
            </a>
          </>
      }
    </div>
  )
}

export default LoginBar;
import Button from 'react-bootstrap/Button';
import React from 'react';
import { useAppContext } from '../libs/contextLib';
import { NavLink } from "react-router-dom";

const LoginBar = ({onSend}) => {
  const { isAuthenticated, setIsAuthenticated } = useAppContext();
  const handleLogout = () => {
    onSend({});
    setIsAuthenticated(false);
  }

  return(
    <div style={loginBarStyle}>
      <div style={{gridArea: 'header'}}>
        <NavLink to="/">
          <Button data-testid="homeButton" variant='outline-primary' value='Home'>Home</Button>
        </NavLink>
      </div>
      <div style={{gridArea: 'header'}}>
        {isAuthenticated
          ? 
          <>
            <NavLink to="/account">
              <Button data-testid="accountButton" variant='outline-secondary' value='Account'>Account</Button>
            </NavLink>
            <Button data-testid="logoutButton" variant='outline-secondary' onClick={handleLogout} value='Logout'>Logout</Button>
          </>
          : <>
              <NavLink to="/signup">
                <Button data-testid="signupButton" variant='outline-secondary' value='Signup'>Signup</Button>
              </NavLink>
              <NavLink to="/login">
                <Button data-testid="loginButton" variant='secondary' value='Login'>Login</Button>
              </NavLink>
            </>
        }
      </div>
    </div>
  )
}

const loginBarStyle = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fafafa',
  justifyContent: 'stretch',
  alignItems: 'flex-end'
}

export default LoginBar;
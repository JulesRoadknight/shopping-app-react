import Button from 'react-bootstrap/Button';
import React from 'react';
import { useAppContext } from '../libs/contextLib';


const LoginBar = () => {
  const { isAuthenticated, setIsAuthenticated } = useAppContext();
  const handleLogout = () => {
    setIsAuthenticated(false);
  }

  return(
    <div style={loginBarStyle}>
      <div style={{gridArea: 'header'}}>
        <a href="/home">
          <Button data-testid="homeButton" variant='outline-primary' value='Home'>Home</Button>
        </a>
      </div>
      <div style={{gridArea: 'header'}}>
        {isAuthenticated
          ? <Button data-testid="logoutButton" variant='outline-secondary' onClick={handleLogout} value='Logout'>Logout</Button>
          : <>
              <a href="/signup">
                <Button data-testid="signupButton" variant='outline-secondary' value='Signup'>Signup</Button>
              </a>
              <a href="/login">
                <Button data-testid="loginButton" variant='secondary' value='Login'>Login</Button>
              </a>
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
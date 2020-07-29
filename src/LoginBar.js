import { Link } from "react-router-bootstrap";
import React from 'react';

const LoginBar = () => {
  return(
    <div>
      <div>
        <a href='/home'>
          <button data-testid='homeButton' value='Home'>
            Home
          </button>
        </a>
      </div>
      <div>
        <a href='/login'>
          <button data-testid='loginButton' value='Login'>
            Login
          </button>
        </a>
        <a href='/signup'>
          <button data-testid='signupButton' value='Signup'>
            Signup
          </button>
        </a>
      </div>
    </div>
  )
}

export default LoginBar;
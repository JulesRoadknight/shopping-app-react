import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useAppContext } from '../libs/contextLib';
import { onError } from '../libs/errorLib';

const Login = ({ data, onSend }) => {

  const { setIsAuthenticated } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function getUserData() {
    try {
      const userData = await fetch(
        `http://localhost:4000/users/${email}`
      )
      return await userData.json();
    } catch (e) {
      console.error(e)
    }
  }

  async function authenciateUser() {
    try {
      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([email, password])
      }
      const authenticate = await fetch(`http://localhost:4000/users/login`, config)
      return await authenticate.json();
    } catch (e) {
      console.error(e)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsAuthenticated(await authenciateUser());
      onSend((await getUserData())[0]);
    } catch (e) {
      onError(e);
    }
  }

  return (
    <div className="Login" style={loginStyle}>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            data-testid='loginEmail'
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            data-testid='loginPassword'
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <div style={buttonStyle}>
          <Button
            data-testid='loginSubmit'
            block
            type="submit"
            disabled={!validateForm()}
          >
            Login
          </Button>
          <br/>
        </div>
      </form>
    </div>
  );
}

const loginStyle = {
  marginTop: "10%",
  marginLeft: "10%",
  width: "80%",
  backgroundColor: '#fafafa',
  justifyContent: 'center',
  alignItems: 'center'
}

const buttonStyle = {
  display: "flex",
  marginLeft: "10%",
  width: "80%",
  flexDirection: 'column',
  justifyContent: 'center'
}

export default Login;
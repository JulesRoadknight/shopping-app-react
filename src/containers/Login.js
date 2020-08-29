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

  async function getUserData(email) {
    const userData = await fetch(
      `http://localhost:4000/users/${email}`
    )
    return await userData.json();
  }

  async function authenciateUser(email, password) {
    const authenticate = await fetch(
      `http://localhost:4000/users/login/${email}/${password}`
    )
    return await authenticate.json();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsAuthenticated(await authenciateUser(email, password));
      onSend(await getUserData(email));
    } catch (e) {
      onError(e);
    }
  }

  return (
    <div className="Login">
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
        <Button data-testid="loginSubmit" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
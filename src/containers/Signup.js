import React, { useState } from 'react';
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import { isUserUnique } from "../libs/checkUniqueUser";
// import axios from 'axios';

const Signup = () => {
  const MINIMUM_PASSWORD_LENGTH = 8;

  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  async function postNewUser(email, password) {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([email, password])
    }
    await fetch(`http://localhost:4000/users`, config)
    // axios.post(`http://localhost:4000/users`, [email, password])
    // .then(res => console.log(res.status))
    // .catch(err => console.log(err));
  }

  function areFieldsValid() {
    return (
      fields.email.length > 0 &&
      fields.password.length > MINIMUM_PASSWORD_LENGTH - 1 &&
      fields.password === fields.confirmPassword
    )
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    if (await isUserUnique(fields.email) === true) {
      try {
        setEmailTaken(false);
        setIsLoading(false);
        setNewUser(newUser);
        postNewUser(fields.email, fields.password);
      } catch (e) {
        onError(e);
        setIsLoading(false);
      } 
    } else {
      setEmailTaken(true);
      setIsLoading(false);
    }
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            data-testid='signupEmail'
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        { emailTaken &&
          <h4 data-testid='emailTaken' style={{color:'red'}}>
            This email is already taken
          </h4>
        }
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            data-testid='signupPassword'
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            data-testid='signupConfirmPassword'
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </FormGroup>
        <LoaderButton
          data-testid='signupSubmit'
          block
          type="submit"
          isLoading={isLoading}
          disabled={!areFieldsValid()}
        >
          Signup
        </LoaderButton>
      </form>
    );
  }

  return (
    <div className="Signup">
      {renderForm()}
    </div>
  );
}

export default Signup;

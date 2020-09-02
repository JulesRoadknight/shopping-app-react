import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { useAppContext } from '../libs/contextLib';
import { onError } from "../libs/errorLib";
import { isUserUnique } from "../libs/checkUniqueUser";
import axios from 'axios';

const Account = ({ data, onSend }) => {
  const { setIsAuthenticated } = useAppContext();
  const [deleteAccountButtonClicked, setDeleteAccountButtonClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const id = data.id;
  
  const [details, handleDetailsChange] = useFormFields({
    email: data.email,
    full_name: data.full_name,
    address: data.address,
    postcode: data.postcode,
    dob: data.dob
  });

  const toggleShowDeleteButton = () => {
    setDeleteAccountButtonClicked(!deleteAccountButtonClicked);
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }

  function areFieldsValid() {
    return (
      details.email.length > 0
    )
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    if (await isUserUnique(details.email, id) === true) {
      try {
        saveUpdates();
        setEmailTaken(false);
        setIsLoading(false);
        toggleEdit();
      } catch (e) {
        onError(e);
        setIsLoading(false);
      } 
    } else {
      setEmailTaken(true);
      setIsLoading(false);
    }
  }

  function saveUpdates() {
    for (const field in details) {
      if (details[field] !== null && details[field] !== undefined && details[field] !== '') {
        editUserDetails(field, details[field]);
      }
    }
    onSend(
      {
        id: data.id,
        email: details.email,
        full_name: details.full_name,
        address: details.address,
        postcode: details.postcode,
        dob: details.dob
      }
    );
  }

  function editUserDetails(column, detail) {
    try {
      axios.put(`http://localhost:4000/users/update/${data.id}/${column}/${detail}`, [id, column, detail]);
    } catch (e) {
      console.error(e);
    }
  }

  function deleteUser() {
    try {
      axios.delete(`http://localhost:4000/users/delete/${id}`, [id]);
      onSend({});
      setIsAuthenticated(false);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="Account">
      <div style={userDetailsStyle}>
        <br/>
        { !isEditing &&
          <>
            <h3 data-testid="userEmail" value={data.email}>
              Email: { data.email }
            </h3>
            <h3 data-testid="userFullName" value={data.full_name}>
              Name: { data.full_name }
            </h3>
            <h3 data-testid="userAddress" value={data.address}>
              Address: { data.address }
            </h3>
            <h3 data-testid="userPostcode" value={data.postcode}>
              Postcode: { data.postcode }
            </h3>
            <h3 data-testid="userDOB" value={data.dob}>
              DOB: { data.dob }
            </h3>
          </>
        }
        { isEditing &&
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="email">
              <FormLabel>Email</FormLabel>
              <FormControl
                data-testid="editEmail"
                autoFocus
                type="email"
                value={details.email}
                onChange={handleDetailsChange}
              />
            </FormGroup>
            { emailTaken &&
              <h4 data-testid='emailTaken' style={{color:'red'}}>
                This email is already taken
              </h4>
            }
            <FormGroup controlId="full_name">
              <FormLabel>Full Name</FormLabel>
              <FormControl
                data-testid='editFullName'
                type="text"
                value={details.full_name || ''}
                onChange={handleDetailsChange}
              />
            </FormGroup>
            <FormGroup controlId="address">
              <FormLabel>Address</FormLabel>
              <FormControl
                data-testid='editAddress'
                type="address"
                value={details.address || ''}
                onChange={handleDetailsChange}
              />
            </FormGroup>
            <FormGroup controlId="postcode">
              <FormLabel>Postcode</FormLabel>
              <FormControl
                data-testid='editPostcode'
                type="postcode"
                value={details.postcode || ''}
                onChange={handleDetailsChange}
              />
            </FormGroup>
            <LoaderButton
              data-testid='confirmChangesButton'
              block
              type="submit"
              isLoading={isLoading}
              disabled={!areFieldsValid()}
            >
              Confirm Changes
            </LoaderButton>
          </form>
        }
        <br/>
      </div>

      <br/>
      <div style={buttonStyle}>
        <Button data-testid='editUserDetailsButton' variant='outline-warning' onClick={toggleEdit} value='Edit Details'>{isEditing ? 'Cancel Edit' : 'Edit Details'}</Button>
        <br/>
        <Button data-testid='deleteAccountButton' variant='outline-danger' onClick={toggleShowDeleteButton} value='Delete Account'>Delete Account</Button>
      </div>

      { deleteAccountButtonClicked &&
        <div style={buttonStyle}>
          <br />
          <Button data-testid='confirmDeleteAccountButton' variant='danger' onClick={deleteUser}>Confirm Delete Account</Button>
          <br/>
          <Button data-testid='cancelDeleteAccountButton' variant='outline-secondary' onClick={toggleShowDeleteButton}>Cancel</Button>
        </div>
      }
    </div>
  );
}

const userDetailsStyle = {
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

export default Account;

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { useAppContext } from '../libs/contextLib';
import { onError } from "../libs/errorLib";
import { isUserUnique } from "../libs/checkUniqueUser";
// import axios from 'axios';

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

  async function editUserDetails(column, detail) {
    try {
      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([id, detail, column])
      }
      await fetch(`http://localhost:4000/users/update`, config)
      // axios.put(`http://localhost:4000/users/update/${data.id}/${column}/${detail}`, [id, column, detail]);
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteUser() {
    try {
      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([id])
      }
      await fetch(`http://localhost:4000/delete/${id}`, config)
      // axios.delete(`http://localhost:4000/users/delete/${id}`, [id]);
      onSend({});
      setIsAuthenticated(false);
    } catch (e) {
      console.error(e);
    }
  }

  function displayUserDetails() {
    let listOfDetails = [];

    for (const detail in details) {
      listOfDetails.push(

        <h3 data-testid={`user_${detail}`} value={data[detail]} key={`key_list_${detail}`}>
          {detail.charAt(0).toUpperCase() + detail.slice(1).replace('_', ' ')}: { data[detail] }
        </h3>

      );
    }
    return(
      listOfDetails
    )
  }

  function displayEditDetails() {
    let listOfForms = [];
    for (const detail in details) {
      listOfForms.push(

        <FormGroup controlId={detail} key={`key_edit_${detail}`}>
          <FormLabel>{detail.charAt(0).toUpperCase() + detail.slice(1).replace('_', ' ')}</FormLabel>
          <FormControl
            data-testid={`edit_${detail}`}
            type={detail}
            value={details[detail] || ''}
            onChange={handleDetailsChange}
          />
        </FormGroup>

      );
    }
    return(
      listOfForms
    )
  }

  return (
    <div className="Account">
      <div style={userDetailsStyle}>
        <br/>

        { !isEditing &&
          <>
            { displayUserDetails() }
          </>
        }

        { isEditing &&
          <form onSubmit={handleSubmit}>
          { displayEditDetails() }
            { emailTaken &&
              <h4 data-testid='emailTaken' style={{color:'red'}}>
                This email is already taken
              </h4>
            }
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

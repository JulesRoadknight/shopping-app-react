import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { useAppContext } from '../libs/contextLib';
import { onError } from "../libs/errorLib";
import { isUserUnique } from "../libs/checkUniqueUser";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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
  });
  const [dob, setDob] = useState(new Date(data.dob));

  const dateOnly = (isforDisplay = false) => {
    if (dob === null) {
      return null
    } else if (isforDisplay) {
      return dob.toDateString()
    } else {
      return `${dob.getFullYear()}-${dob.getMonth() + 1}-${dob.getDate()}`
    };
  }

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

  function isAValidDate() {
    return (
      Object.prototype.toString.call(new Date(dateOnly())) === '[object Date]'
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

  async function saveUpdates() {
    updateDetailsLoop();
    updateDOB();
    updateState();
  }

  const updateDetailsLoop = () => {
    for (const field in details) {
      if (details[field] !== null && details[field] !== undefined && details[field] !== '') {
        editUserDetail(field, details[field]);
      }
    }
  }

  const updateDOB = () => {
    if (isAValidDate()) {
      editUserDetail('dob', dateOnly());
    }
  }

  const updateState = () => {
    onSend(
      {
        id: data.id,
        email: details.email,
        full_name: details.full_name,
        address: details.address,
        postcode: details.postcode,
        dob: dateOnly()
      }
    );
  }
  
  async function editUserDetail(column, detail) {
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
      await fetch(`http://localhost:4000/users/delete/${id}`, config)
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
    listOfDetails.push(
      <h3 data-testid={`user_dob`} value={dob} key={`key_list_dob`}>
          Date of Birth: { dateOnly(true) }
      </h3>
    )
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

      )
    }
    listOfForms.push(

      <div key={'key_edit_dob'}>
        <FormLabel>Date of Birth - mm/dd/yyyy</FormLabel>
        <br/>
        <DatePicker
          selected={dob}
          onChange={setDob}
          maxDate={new Date()}
        />
        <br/>
      </div>
      
    );
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
          <br/>
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

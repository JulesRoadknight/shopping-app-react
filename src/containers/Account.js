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
  const [showDeleteAccountButton, setShowDeleteAccountButton] = useState(false);
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
      return formattedDate()
    };
  }

  const formattedDate = () => {
    return `${dob.getFullYear()}-${dob.getMonth() + 1}-${dob.getDate()}`
  }

  const toggleShowDeleteButton = () => {
    setShowDeleteAccountButton(!showDeleteAccountButton);
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
      if (fieldHasAValue(field)) {
        editUserDetail(field, details[field]);
      }
    }
  }

  const fieldHasAValue = (field) => {
    return details[field] !== null && details[field] !== undefined && details[field] !== '';
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
        header(detail)
      );
    }

    listOfDetails.push(
      dobHeader()
    )

    return(
      listOfDetails
    )
  }

  const header = (detail) => {
    return(
      <h3 data-testid={`user_${detail}`} value={data[detail]} key={`key_list_${detail}`}>
        {detail.charAt(0).toUpperCase() + detail.slice(1).replace('_', ' ')}: { data[detail] }
      </h3>
    )
  }

  const dobHeader = () => {
    return(
      <h3 data-testid={`user_dob`} value={dob} key={`key_list_dob`}>
        Date of Birth: { dateOnly(true) }
      </h3>
    )
  }

  function displayEditDetails() {
    let listOfForms = [];

    for (const detail in details) {
      listOfForms.push(
        editDetailForm(detail)
      )
    }

    listOfForms.push(
      editDobForm()
    );

    return(
      listOfForms
    )
  }

  const editDetailForm = (detail) => {
    return(
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

  const editDobForm = () => {
    return(
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
    )
  }

  const emailTakenHeader = () => {
    return (
      <h4 data-testid='emailTaken' style={{color:'red'}}>
        This email is already taken
      </h4>
    )
  }

  const displayLoaderButton = () => {
    return(
      <LoaderButton
        data-testid='confirmChangesButton'
        style={spacingStyle}
        block
        type="submit"
        isLoading={isLoading}
        disabled={!areFieldsValid()}
      >
        Confirm Changes
      </LoaderButton>
    )
  }

  const displayEditDeleteButtons = () => {
    return(
      <div style={buttonStyle}>
        <Button data-testid='editUserDetailsButton' style={spacingStyle} variant='outline-warning' onClick={toggleEdit} value='Edit Details'>{isEditing ? 'Cancel Edit' : 'Edit Details'}</Button>
        <Button data-testid='deleteAccountButton' style={spacingStyle} variant='outline-danger' onClick={toggleShowDeleteButton} value='Delete Account'>Delete Account</Button>
      </div>
    )
  }

  const displayConfirmDeleteAccountButton = () => {
    return(
      <div style={buttonStyle}>
        <Button data-testid='confirmDeleteAccountButton' variant='danger' onClick={deleteUser}>Confirm Delete Account</Button>
        <Button data-testid='cancelDeleteAccountButton' variant='outline-secondary' onClick={toggleShowDeleteButton}>Cancel</Button>
      </div>
    )
  }

  return (
    <div className="Account">
      <div style={userDetailsStyle}>
        { !isEditing &&
          <>
            { displayUserDetails() }
          </>
        }
        { isEditing &&
          <form onSubmit={handleSubmit} style={userDetailsStyle}>
            { displayEditDetails() }
            { emailTaken &&
              emailTakenHeader()
            }
            { displayLoaderButton() }
          </form>
        }
      </div>
      { displayEditDeleteButtons() }
      { showDeleteAccountButton &&
        displayConfirmDeleteAccountButton()
      }
    </div>
  );
}

const userDetailsStyle = {
  marginTop: "5%",
  paddingTop: "5%",
  paddingBottom: "5%",
  marginLeft: "10%",
  width: "80%",
  backgroundColor: '#fafafa',
  justifyContent: 'center',
  alignItems: 'center'
}

const buttonStyle = {
  display: "flex",
  marginTop: "5%",
  paddingTop: "5%",
  paddingBottom: "5%",
  marginLeft: "10%",
  width: "80%",
  flexDirection: 'column',
  justifyContent: 'center'
}

const spacingStyle= {
  marginTop: "5%",
  marginButton: "5%"
}

export default Account;

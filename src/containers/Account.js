import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAppContext } from '../libs/contextLib';
import axios from 'axios';

const Account = ({ data, onSend }) => {
  const { setIsAuthenticated } = useAppContext();
  const [deleteAccountButtonClicked, setDeleteAccountButtonClicked] = useState(false);

  const toggleShowDeleteButton = () => {
    setDeleteAccountButtonClicked(!deleteAccountButtonClicked);
  }

  const id = data[0].id;

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
        <h3 data-testid="userEmail" value={data[0].email}>
          Email: { data[0].email }
        </h3>
        <h3 data-testid="userFullName" value={data[0].full_name}>
          Name: { data[0].full_name }
        </h3>
        <h3 data-testid="userAddress" value={data[0].address}>
          Address: { data[0].address }
        </h3>
        <h3 data-testid="userPostcode" value={data[0].postcode}>
          Postcode: { data[0].postcode }
        </h3>
        <h3 data-testid="userDOB" value={data[0].dob}>
          DOB: { data[0].dob }
        </h3>
        <br/>
      </div>

      <br/>
      <div style={confirmCancelButtonStyle}>
        <Button data-testid='deleteAccountButton' variant='outline-danger' onClick={toggleShowDeleteButton} value='Delete Account'>Delete Account</Button>
      </div>

      { deleteAccountButtonClicked &&
        <div style={confirmCancelButtonStyle}>
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
  flexDirection: 'column',
  backgroundColor: '#fafafa',
  justifyContent: 'center',
  alignItems: 'center'
}

const confirmCancelButtonStyle = {
  display: "flex",
  marginLeft: "10%",
  width: "80%",
  flexDirection: 'column',
  justifyContent: 'center'
  // alignItems: 'center'
}

export default Account;
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
      <h3 data-testid="userEmail" value={data[0].email}>
        Email - { data[0].email }
      </h3>

      <Button data-testid='deleteAccountButton' variant='outline-danger' onClick={toggleShowDeleteButton} value='Delete Account'>Delete Account</Button>

      { deleteAccountButtonClicked &&
        <>
          <Button data-testid='confirmDeleteAccountButton' variant='danger' onClick={deleteUser}>Confirm Delete Account</Button>
          <br/>
          <Button data-testid='cancelDeleteAccountButton' variant='outline-secondary' onClick={toggleShowDeleteButton}>Cancel</Button>
        </>
      }
    </div>
  );
}

export default Account;
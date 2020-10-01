import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Account from '../containers/Account';

describe('<Account />', () => {
  let getByTestId;

  afterEach(cleanup);

  describe('Viewing the Account page', () => {
    let sendHandler;
    let userDetails = {address: null, dob: '1999/2/1', email: "this@that.com", postcode: null, full_name: null}

    beforeEach(() => {
      sendHandler = jest.fn();
      ({ getByTestId } = render(<Account data={userDetails} />));
    })

    it('Shows the email of the user', () => {
      expect(getByTestId('user_email').getAttribute('value')).toEqual(userDetails.email);
    });

    it('Shows the name of the user', () => {
      expect(getByTestId('user_full_name').getAttribute('value')).toEqual(userDetails.full_name);
    });

    it('Shows the dob of the user in a readable format', () => {
      expect(getByTestId('user_dob').getAttribute('value')).toContain('Mon Feb 01 1999');
    });

    it('Shows the `Delete Account` button', () => {
      expect(getByTestId('deleteAccountButton').getAttribute('value')).toEqual('Delete Account');
    });

    it('Shows the `Edit Details` button', () => {
      expect(getByTestId('editUserDetailsButton').getAttribute('value')).toEqual('Edit Details');
    });
  });

});
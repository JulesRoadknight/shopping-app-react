import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Account from '../containers/Account';

describe('<Account />', () => {
  let getByTestId;

  afterEach(cleanup);

  describe('Viewing the Account page', () => {
    let sendHandler;
    let userDetails = {address: null, dob: null, email: "this@that.com", postcode: null, full_name: null}

    beforeEach(() => {
      sendHandler = jest.fn();
      ({ getByTestId } = render(<Account data={userDetails} />));
    })

    it('Shows the details of the user', () => {
      expect(getByTestId('user_email').getAttribute('value')).toEqual(userDetails.email);
    });

    it('Shows the details of the user', () => {
      expect(getByTestId('user_full_name').getAttribute('value')).toEqual(userDetails.full_name);
    });

    it('Shows the `Delete Account` button', () => {
      expect(getByTestId('deleteAccountButton').getAttribute('value')).toEqual('Delete Account');
    });

    it('Shows the `Edit Details` button', () => {
      expect(getByTestId('editUserDetailsButton').getAttribute('value')).toEqual('Edit Details');
    });
  });

});
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Account from '../containers/Account';

describe('<Account />', () => {
  let getByTestId;

  afterEach(cleanup);

  describe('Viewing the Account page', () => {
    let sendHandler;
    let userDetails = [{address: null, dob: null, email: "this@that.com"}]

    beforeEach(() => {
      sendHandler = jest.fn();
      ({ getByTestId } = render(<Account data={userDetails} />));
    })

    it('Shows the details of the user', () => {
      expect(getByTestId('userEmail').getAttribute('value')).toEqual(userDetails[0].email);
    });

    it('Shows the `Delete Account` button', () => {
      expect(getByTestId('deleteAccountButton').getAttribute('value')).toEqual('Delete Account');
    });
  });

});
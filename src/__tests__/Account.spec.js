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

    it('Shows the dob of the user in a readable format', () => {
      expect(getByTestId('user_dob').getAttribute('value')).toContain('Mon Feb 01 1999');
    });
  });
});
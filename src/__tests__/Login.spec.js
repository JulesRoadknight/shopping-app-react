import React from 'react';
import { render, cleanup, queryByText, screen } from '@testing-library/react';
import Login from '../containers/Login';

describe('<Login />', () => {
  let getByTestId;

  afterEach(cleanup);

  describe('Viewing the Login page', () => {
    let sendHandler;

    beforeEach(() => {
      sendHandler = jest.fn();
      ({ getByTestId } = render(<Login data={sendHandler, false} />));
    })

    it('Email field renders empty', () => {
      expect(getByTestId('loginEmail').getAttribute('value')).toContain('');
    });

    it('Password field renders empty', () => {
      expect(getByTestId('loginPassword').getAttribute('value')).toContain('');
    });

    it('Submit button is disabled', () => {
      expect(getByTestId('loginSubmit')).toBeDisabled();
    });

    it('Does not render the failure header', () => {
      const failureHeader = screen.queryByText('Incorrect details, please try again');
      expect(failureHeader).toBeNull();
    });
  });
});

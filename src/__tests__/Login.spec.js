import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Login from '../containers/Login';

describe('<Login />', () => {
  let getByTestId;

  afterEach(cleanup);

  describe('Viewing the Login page', () => {
    let sendHandler;

    beforeEach(() => {
      sendHandler = jest.fn();
      ({ getByTestId } = render(<Login data={sendHandler, false} failedAuthentication={true} />));
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
  });
});

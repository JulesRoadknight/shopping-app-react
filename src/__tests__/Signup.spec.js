import React from 'react';
import { render, cleanup, queryByText, screen } from '@testing-library/react';
import Signup from '../containers/Signup';

describe('<Signup />', () => {
  let getByTestId;

  afterEach(cleanup);

  describe('Viewing the Signup page', () => {
    let sendHandler;

    beforeEach(() => {
      sendHandler = jest.fn();
      ({ getByTestId } = render(<Signup data={sendHandler, false} />));
    })

    it('Email field renders empty', () => {
      expect(getByTestId('signupEmail').getAttribute('value')).toContain('');
    });

    it('Password field renders empty', () => {
      expect(getByTestId('signupPassword').getAttribute('value')).toContain('');
    });

    it('Confirm password field renders empty', () => {
      expect(getByTestId('signupPassword').getAttribute('value')).toContain('');
    });

    it('Submit button is disabled', () => {
      expect(getByTestId('signupSubmit')).toBeDisabled();
    });

    it('Does not render the email taken header', () => {
      const failureHeader = screen.queryByText('This email is already taken');
      expect(failureHeader).toBeNull();
    });
  });
});

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import LoginBar from '../LoginBar';

describe('<LoginBar />', () => {
  let getByTestId;

  afterEach(cleanup);

  describe('Logging in', () => {
    let sendHandler;

    beforeEach(() => {
      sendHandler = jest.fn();
      ({ getByTestId } = render(<LoginBar />));
    })

    it('Shows the login button', () => {
      expect(getByTestId('loginButton').getAttribute('value')).toEqual('Login');
    });
  });

});
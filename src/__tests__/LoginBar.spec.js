import React from 'react';
import { render, cleanup } from '@testing-library/react';
import LoginBar from '../containers/LoginBar';
import { AppContext } from '../libs/contextLib';

describe('<LoginBar />', () => {
  let getByTestId;
  
  afterEach(cleanup);
  describe('Logging in', () => {
    let sendHandler;
    
    beforeEach(() => {
      sendHandler = jest.fn();
      ({ getByTestId } = render(
      <AppContext.Provider value={{ isAuthenticated: false }}>
        <LoginBar />
      </AppContext.Provider>));
    })

    it('Shows the home button', () => {
      expect(getByTestId('homeButton').getAttribute('value')).toEqual('Home');
    });

    it('Shows the login button', () => {
      expect(getByTestId('loginButton').getAttribute('value')).toEqual('Login');
    });

    it('Shows the signup button', () => {
      expect(getByTestId('signupButton').getAttribute('value')).toEqual('Signup');
    });
  });
});

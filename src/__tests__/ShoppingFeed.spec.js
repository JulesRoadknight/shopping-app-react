import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ShoppingFeed from '../ShoppingFeed';

describe('<ShoppingFeed />', () => {
  let getByTestId;

  afterEach(cleanup);

  describe('Logging in', () => {
    let sendHandler;

    beforeEach(() => {
      sendHandler = jest.fn();
      ({ getByTestId } = render(<ShoppingFeed />));
    })

    it('Shows a recommended item', () => {
      expect(getByTestId('recommendedItem').getAttribute('value')).toEqual('A Free Sample');
    });
  });

});
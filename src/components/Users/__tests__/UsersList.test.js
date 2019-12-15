import React from 'react';
import ReactDOM from 'react-dom';
import { UsersList } from '..';

describe('UsersList', () => {
  let container;

  beforeEach(() => {
    jest.clearAllMocks();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders without crashing', () => {
    ReactDOM.render(<UsersList users={[]} />, container);
  });
});

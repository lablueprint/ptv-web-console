import React from 'react';
import ReactDOM from 'react-dom';
import App from '..';
import Firebase, { FirebaseContext } from '../../Firebase';

describe('App', () => {
  jest.mock('../../Firebase');
  const mockFirebase = new Firebase();

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
    ReactDOM.render((
      <FirebaseContext.Provider value={mockFirebase}>
        <App />
      </FirebaseContext.Provider>
    ), container);
  });
});

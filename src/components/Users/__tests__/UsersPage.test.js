import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import UsersPage from '..';
import Firebase, { FirebaseContext } from '../../Firebase';

describe('UsersPage', () => {
  jest.mock('../../Firebase');
  const mockFirebase = new Firebase();
  let container;

  const componentUnderTest = (
    <FirebaseContext.Provider value={mockFirebase}>
      <UsersPage />
    </FirebaseContext.Provider>
  );

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders without crashing', () => {
    ReactDOM.render(componentUnderTest, container);
  });

  it('registers users snapshot listener', () => {
    const mockOnSnapshot = jest.fn();

    Firebase.prototype.users = jest.fn(() => ({
      onSnapshot: mockOnSnapshot,
    }));

    act(() => {
      ReactDOM.render(componentUnderTest, container);
    });

    expect(Firebase.prototype.users).toHaveBeenCalledTimes(1);
    expect(mockOnSnapshot).toHaveBeenCalledTimes(1);
  });

  it('unregisters users snapshot listener', () => {
    const mockUnregister = jest.fn();

    Firebase.prototype.users = jest.fn(() => ({
      onSnapshot: jest.fn(() => mockUnregister),
    }));

    act(() => {
      ReactDOM.render(componentUnderTest, container);
      ReactDOM.unmountComponentAtNode(container);
    });

    expect(mockUnregister).toHaveBeenCalledTimes(1);
  });
});

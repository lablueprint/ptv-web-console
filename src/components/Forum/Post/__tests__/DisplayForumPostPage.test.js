import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import DisplayForumPostPage from '../DisplayForumPostPage';
import Firebase, { FirebaseContext } from '../../../Firebase';

describe('DisplayForumPostPage', () => {
  jest.mock('../../../Firebase');
  const mockFirebase = new Firebase();
  let container;

  const componentUnderTest = (
    <FirebaseContext.Provider value={mockFirebase}>
      <DisplayForumPostPage />
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

  it('registers forum posts snapshot listener', () => {
    const mockOnSnapshot = jest.fn();

    Firebase.prototype.forumPosts = jest.fn(() => ({
      onSnapshot: mockOnSnapshot,
    }));

    act(() => {
      ReactDOM.render(componentUnderTest, container);
    });

    expect(Firebase.prototype.forumPosts).toHaveBeenCalledTimes(1);
    expect(mockOnSnapshot).toHaveBeenCalledTimes(1);
  });

  it('unregisters forum posts snapshot listener', () => {
    const mockUnregister = jest.fn();

    Firebase.prototype.forumPosts = jest.fn(() => ({
      onSnapshot: jest.fn(() => mockUnregister),
    }));

    act(() => {
      ReactDOM.render(componentUnderTest, container);
      ReactDOM.unmountComponentAtNode(container);
    });

    expect(mockUnregister).toHaveBeenCalledTimes(1);
  });
});

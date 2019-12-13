import React from 'react';
import ReactDOM from 'react-dom';
import CreateForumPostForm from '../CreateForumPostForm';
import Firebase, { FirebaseContext } from '../../../Firebase';

describe('CreateForumPostForm', () => {
  jest.mock('../../../Firebase');
  const mockFirebase = new Firebase();

  let container;

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
    ReactDOM.render((
      <FirebaseContext.Provider value={mockFirebase}>
        <CreateForumPostForm uid="" />
      </FirebaseContext.Provider>
    ), container);
  });
});

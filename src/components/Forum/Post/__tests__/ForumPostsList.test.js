import React from 'react';
import ReactDOM from 'react-dom';
import ForumPostsList from '../ForumPostsList';

describe('ForumPostsList', () => {
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
    ReactDOM.render(<ForumPostsList posts={[]} />, container);
  });
});

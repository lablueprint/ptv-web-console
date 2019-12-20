import React from 'react';
import { AuthUserContext } from '../Session';
import { CreateForumPostForm, DisplayForumPostPage } from './Post';

export default function ForumPage() {
  return (
    <AuthUserContext.Consumer>
      {({ authUser }) => (
        <div>
          <h1>
            Account:&nbsp;
            {authUser.email}
          </h1>
          <CreateForumPostForm uid={authUser.uid} />
          <DisplayForumPostPage />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
}

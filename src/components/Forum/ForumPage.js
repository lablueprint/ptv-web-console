import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import { CreateForumPostForm, DisplayForumPostPage } from './Post';
import 'firebase/auth';

export default function ForumPage() {
  const [user] = useAuthState(firebase.auth());

  return (
    <div>
      <h1>
        Account:&nbsp;
        {user && user.email}
        {user && user.uid}
      </h1>
      <CreateForumPostForm uid={user ? user.uid : null} />
      <DisplayForumPostPage />
    </div>
  );
}

import 'firebase/auth';
import React from 'react';
import CreateForumPostForm from './CreateForumPostForm';
import ForumPostsList from './ForumPostsList';

export default function ForumHomePage() {
  return (
    <div>
      <h1>Forum</h1>
      <CreateForumPostForm />
      <ForumPostsList />
    </div>
  );
}

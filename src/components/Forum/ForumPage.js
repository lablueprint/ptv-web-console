import 'firebase/auth';
import React from 'react';
import { CreateForumPostForm, ForumPostsPage } from './Post';

export default function ForumPage() {
  return (
    <div>
      <h1>Forum</h1>
      <CreateForumPostForm />
      <ForumPostsPage />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import ForumPostsList from './ForumPostsList';
import 'firebase/firestore';

export default function DisplayPostPage() {
  const [forumPosts, setForumPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setLoading(true);
    firebase.firestore().collection('forum_posts')
      .get()
      .then((snapshot) => {
        setForumPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading && <p>loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <ForumPostsList posts={forumPosts} />
    </div>
  );
}

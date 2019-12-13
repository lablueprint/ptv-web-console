import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../Firebase';
import ForumPostsList from './ForumPostsList';

export default function DisplayPostPage() {
  const firebase = useContext(FirebaseContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => firebase
    .forumPosts()
    .onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      setError(err);
    }), [firebase]);

  return (
    <div>
      {error && <p>{error.message}</p>}
      <ForumPostsList posts={posts} />
    </div>
  );
}

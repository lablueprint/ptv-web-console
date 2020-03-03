import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import ClipLoader from 'react-spinners/ClipLoader';
import 'firebase/firestore';

export default function ForumPostsList() {
  const [forumPosts, setForumPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
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

  const postItems = forumPosts.map((post) => (
    <tr key={post.id}>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.body}</td>
      <td>{post.userID}</td>
    </tr>
  ));

  return (
    <div>
      {loading && <ClipLoader />}
      {errorMessage && <p>{errorMessage}</p>}
      <table>
        <thead>
          <tr>
            <td><strong>ID</strong></td>
            <td><strong>Title</strong></td>
            <td><strong>Body</strong></td>
            <td><strong>User ID</strong></td>
          </tr>
        </thead>
        <tbody>
          {postItems}
        </tbody>
      </table>
    </div>
  );
}

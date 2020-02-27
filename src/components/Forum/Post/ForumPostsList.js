import React from 'react';
import PropTypes from 'prop-types';

export default function ForumPostsList({ posts }) {
  const postItems = posts.map((post) => (
    <tr key={post.id}>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.body}</td>
      <td>{post.userID}</td>
    </tr>
  ));

  return (
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
  );
}

ForumPostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

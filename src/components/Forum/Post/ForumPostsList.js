import React from "react";
import PropTypes from "prop-types";

export default function ForumPostsList(props) {
  const { posts } = props;
  const postData = posts.map(post => (
    <ul key={post.id}>
      <li>{post.id}</li>
      <li>{post.title}</li>
      <li>{post.body}</li>
      <li>{post.uid}</li>
    </ul>
  ));

  return <div>{postData}</div>;
}

ForumPostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      uid: PropTypes.string.isRequired
    })
  ).isRequired
};

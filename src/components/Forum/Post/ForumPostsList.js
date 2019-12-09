import React from "react";
import PropTypes from "prop-types";

export default function ForumPostsList(props) {
  const { posts } = props;
  const postData = posts.map(post => (
    <ul>
      <li>{post.title}</li>
      <li>{post.body}</li>
    </ul>
  ));

  return <div>{postData}</div>;
}

ForumPostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired
};

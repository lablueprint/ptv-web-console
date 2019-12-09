import React, { Component } from "react";
import PropTypes from "prop-types";
import Firebase, { withFirebase } from "../../Firebase";
import ForumPostsList from "./ForumPostsList";

const INITIAL_STATE = {
  posts: []
};

class DisplayPostPage extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const { firebase } = this.props;
    firebase
      .forumPosts()
      .get()
      .then(snapshot => {
        this.setState({
          posts: snapshot.docs.map(doc => doc.data())
        });
      });
  }

  render() {
    const { posts } = this.state;

    return <ForumPostsList posts={posts} />;
  }
}

DisplayPostPage.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired
};

export default withFirebase(DisplayPostPage);

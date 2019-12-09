import React, { Component } from "react";
import PropTypes from "prop-types";
import Firebase, { withFirebase } from "../../Firebase";

const INITIAL_STATE = {
  uid: "",
  title: "",
  body: "",
  approved: false,
  error: null
};

class CreateForumPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.state.uid = props.uid;
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { firebase } = this.props;
    firebase
      .createForumPost(this.state)
      .then(() => {
        this.setState(INITIAL_STATE);
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { title, body, error } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="title"
          type="text"
          value={title}
          onChange={this.onChange}
          placeholder="Title"
        />
        <input
          name="body"
          type="body"
          value={body}
          onChange={this.onChange}
          placeholder="Body"
        />
        <button type="submit">Submit Post</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

CreateForumPostForm.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  uid: PropTypes.string.isRequired
};

export default withFirebase(CreateForumPostForm);

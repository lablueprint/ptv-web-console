import React, { Component } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { withRouter } from "react-router";
import Firebase, { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class SignOutButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { firebase, history } = this.props;
    firebase.doSignOut();
    history.push(ROUTES.LANDING);
  }

  render() {
    return (
      <button type="button" onClick={this.onClick}>
        Sign Out
      </button>
    );
  }
}

SignOutButton.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(withFirebase(SignOutButton));

import React from "react";
import PropTypes from "prop-types";
import Firebase, { withFirebase } from "../Firebase";

function SignOutButton(props) {
  const { firebase } = props;
  return (
    <button type="button" onClick={firebase.doSignOut}>
      Sign Out
    </button>
  );
}

SignOutButton.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired
};

export default withFirebase(SignOutButton);

import React from 'react';
import { withFirebase } from '../Firebase';

function SignOutButton(props) {
  return (
    <button type='button' onClick={props.firebase.doSignOut}>
      Sign Out
    </button>
  );
}

export default withFirebase(SignOutButton);

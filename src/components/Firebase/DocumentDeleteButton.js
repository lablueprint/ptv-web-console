import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import PropTypes from 'prop-types';

export default function DocumentDeleteButton({ path }) {
  const onClick = (event) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      event.preventDefault();
      firebase
        .firestore()
        .doc(path)
        .delete();
    }
  };

  return (
    <button type="button" onClick={onClick}>
      Delete
    </button>
  );
}

DocumentDeleteButton.propTypes = {
  path: PropTypes.string.isRequired,
};

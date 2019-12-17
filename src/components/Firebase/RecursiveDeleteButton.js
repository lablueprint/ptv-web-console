import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/functions';
import PropTypes from 'prop-types';

export default function RecursiveDeleteButton({ path }) {
  /**
   * Call the 'recursiveDelete' callable function with a path to initiate
   * a server-side delete.
   */
  const recursiveDeleteAtPath = (_path) => {
    const deleteFn = firebase.functions().httpsCallable('recursiveDelete');
    deleteFn({ _path })
      .then((result) => {
        console.log(`Delete success: ${JSON.stringify(result)}`);
      })
      .catch((err) => {
        console.error('Delete failed', err);
      });
  };

  const onClick = (event) => {
    event.preventDefault();
    window.confirm('Are you sure you wish to delete this category? You will also delete all resources within this category.');
    recursiveDeleteAtPath(path);
  };

  return (
    <button type="button" onClick={onClick}>
      Delete
    </button>
  );
}

RecursiveDeleteButton.propTypes = {
  path: PropTypes.string.isRequired,
};

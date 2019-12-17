import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import PropTypes from 'prop-types';

export default function DeleteCategoryButton({ categoryId }) {
  const [error, setError] = useState(null);

  const onClick = (event) => {
    event.preventDefault();
    if (window.confirm('Are you sure you wish to delete this item?')) {
      const path = `resource_categories/${categoryId}`;
      firebase
        .firestore()
        .doc(path)
        .collection('resources')
        .get()
        .then((snapshot) => {
          // The category must have no resources.
          if (snapshot.docs.length > 0) {
            setError({ message: 'Cannot delete this category. You must delete all the resources first.' });
          } else {
            firebase
              .firestore()
              .doc(path)
              .delete();
          }
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  return (
    <div>
      <button type="button" onClick={onClick}>
        Delete
      </button>
      {error && <p>{error.message}</p>}
    </div>
  );
}

DeleteCategoryButton.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

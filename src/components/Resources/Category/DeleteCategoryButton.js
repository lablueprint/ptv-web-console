import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  button: {
    margin: 'auto',
    display: 'grid',
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: '#194261',
    color: 'white',
    borderWidth: 0,
    textAlign: 'center',
    justifyContent: 'center',
    paddingLeft: 45,
    paddingRight: 45,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: 'Poppins',
    outline: 0,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
});
export default function DeleteCategoryButton({ categoryFirestoreId }) {
  const [error, setError] = useState(null);
  const classes = useStyles();

  const onClick = (event) => {
    event.preventDefault();
    if (window.confirm('Are you sure you wish to delete this item?')) {
      const path = `resource_categories/${categoryFirestoreId}`;
      firebase
        .firestore()
        .doc(path)
        .collection('resources')
        .get()
        .then((snapshot) => {
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
      <button type="button" onClick={onClick} className={classes.button}>
        Delete
      </button>
      {error && <p>{error.message}</p>}
    </div>
  );
}

DeleteCategoryButton.propTypes = {
  categoryFirestoreId: PropTypes.string.isRequired,
};

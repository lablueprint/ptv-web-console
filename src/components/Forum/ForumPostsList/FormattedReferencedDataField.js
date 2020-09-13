import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from 'firebase/app';
import 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

/* Fetch and format data referenced in a different collection */
export default function FormattedReferencedDataField({
  collection, id, field, notFoundMessage, render,
}) {
  const [item, setItem] = useState(notFoundMessage);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      firebase.firestore().collection(collection).doc(id).get()
        .then((snapshot) => {
          const data = snapshot.data();
          if (data && data[field]) {
            setItem(data[field]);
          }
          setLoading(false);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setLoading(false);
        });
    }
  }, [collection, field, id]);

  return (
    <>
      {loading ? <CircularProgress /> : render(item)}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

FormattedReferencedDataField.propTypes = {
  collection: PropTypes.string.isRequired,
  id: PropTypes.string,
  field: PropTypes.string.isRequired,
  notFoundMessage: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

FormattedReferencedDataField.defaultProps = {
  id: null,
};

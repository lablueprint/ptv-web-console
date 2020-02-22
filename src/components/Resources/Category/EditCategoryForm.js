import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import dashify from 'dashify';
import PropTypes from 'prop-types';

export default function EditCategoryForm({ currentState }) {
  const history = useHistory();
  const [formState, setFormState] = useState(currentState);
  const [error, setError] = useState(null);
  const [readOnly, setReadOnly] = useState(true);

  const onChange = (event) => {
    event.preventDefault();
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
      urlId: event.target.name === 'title' ? encodeURI(dashify(event.target.value)) : formState.urlId,
    });
  };


  const onSubmit = (event) => {
    event.preventDefault();

    const urlIdCollision = async (urlId) => {
      let collided = false;

      const querySnapshot = await firebase.firestore()
        .collection('resource_categories')
        .where('urlId', '==', urlId)
        .get();

      querySnapshot.docs.forEach((doc) => {
        if (doc.id !== formState.id) {
          collided = true;
        }
      });

      return collided;
    };

    urlIdCollision(formState.urlId)
      .then((collision) => {
        if (!collision) {
          firebase.firestore()
            .collection('resource_categories')
            .doc(formState.id)
            .update({
              ...formState,
              updated: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              history.push(`/resources/${formState.urlId}`);
            })
            .catch((err) => {
              setError(err);
            });
        } else {
          setError({ message: 'A category with the same title already exists. Choose a different title.' });
        }
      });
  };


  return (
    <form onSubmit={onSubmit}>
      <table>
        <tbody>
          <tr>
            <td>
              Title
            </td>
            <td>
              <input
                name="title"
                type="text"
                value={formState.title}
                onChange={onChange}
                disabled={readOnly}
              />
            </td>
          </tr>
          <tr>
            <td>
              Description
            </td>
            <td>
              <textarea
                name="description"
                value={formState.description}
                onChange={onChange}
                disabled={readOnly}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <button type="button" onClick={() => { setReadOnly(false); }}>Edit</button>
      <button disabled={readOnly} type="submit">Save</button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

EditCategoryForm.propTypes = {
  currentState: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    urlId: PropTypes.string.isRequired,
  }).isRequired,
};

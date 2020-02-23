import firebase from 'firebase/app';
import 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

export default function EditCategoryForm({ currentState }) {
  const { categoryId } = useParams();
  const history = useHistory();
  const [formState, setFormState] = useState(currentState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [readOnly, setReadOnly] = useState(true);

  const onChange = useCallback((event) => {
    event.preventDefault();
    setFormState(
      {
        ...formState,
        [event.target.name]: event.target.value,
      },
    );
  }, [formState]);


  const onSubmit = useCallback((event) => {
    event.preventDefault();
    firebase.firestore().collection('resource_categories').doc(categoryId)
      .set(formState)
      .then(() => {
        setReadOnly(true);
        history.push(`/resources/${categoryId}`);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [categoryId, formState, history]);


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

      {errorMessage && <p>{errorMessage.message}</p>}
    </form>
  );
}

EditCategoryForm.propTypes = {
  currentState: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

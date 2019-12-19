import React from 'react';
import { useHistory } from 'react-router-dom';
import { useNewDocumentForm } from '../../../hooks';

const INITIAL_STATE = {
  title: '',
  description: '',
};

export default function NewCategoryForm() {
  const history = useHistory();

  const {
    onChange, onSubmit, error, title, description, urlId,
  } = useNewDocumentForm('resource_categories', INITIAL_STATE);

  const myOnSubmit = (event) => {
    onSubmit(event).then((success) => {
      if (success) {
        history.push(`/resources/${urlId}`);
      }
    });
  };

  return (
    <form onSubmit={myOnSubmit}>
      <input
        name="title"
        type="text"
        value={title}
        onChange={onChange}
        placeholder="Title"
      />
      <input
        name="description"
        type="text"
        value={description}
        onChange={onChange}
        placeholder="Description"
      />
      <button type="submit">Create category</button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

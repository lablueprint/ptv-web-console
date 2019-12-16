import React from 'react';
import { useNewDocumentForm } from '../../hooks';

const INITIAL_STATE = {
  title: '',
  description: '',
};

export default function NewResourceCategoryForm() {
  const {
    onChange, onSubmit, error, title, description,
  } = useNewDocumentForm('resource_categories', INITIAL_STATE);
  return (
    <form onSubmit={onSubmit}>
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

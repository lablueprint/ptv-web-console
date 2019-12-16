import React from 'react';
import { useParams } from 'react-router-dom';
import { useNewDocumentForm } from '../../hooks';

const INITIAL_STATE = {
  title: '',
  description: '',
};

export default function NewResourceForm() {
  const { category } = useParams();
  const {
    onChange, onSubmit, error, title, description,
  } = useNewDocumentForm(`resource_categories/${category}/resources`, INITIAL_STATE);
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
      <button type="submit">Create resource</button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

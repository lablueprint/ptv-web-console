import React from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useCollectionSnapshot } from '../../hooks';
import { CategoriesList } from './Category';

export default function ResourcesPage() {
  const { data, loading, error } = useCollectionSnapshot('resource_categories');

  return (
    <div>
      <h1>Resource Categories</h1>
      <ClipLoader loading={loading} />
      {error && <p>{error.message}</p>}
      <Link to="/resources/new">Create a new category</Link>
      <CategoriesList categories={data} />
    </div>
  );
}
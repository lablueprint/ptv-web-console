import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCollectionSnapshot, useDocumentOnce } from '../../../hooks';
import { withAuthorization } from '../../Session';
import { ResourcesList } from '../Resource';
import CategoriesList from './CategoriesList';
import DeleteCategoryButton from './DeleteCategoryButton';
import NewCategoryForm from './NewCategoryForm';

function CategoryPage() {
  const { category } = useParams();
  const categoryPath = `resource_categories/${category}`;
  const { data, loading, error } = useCollectionSnapshot(`${categoryPath}/resources`);
  const categoryData = useDocumentOnce(categoryPath);
  return (
    <div>
      <h1>{!categoryData.loading && `Resources in ${categoryData.data.title} category`}</h1>
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <Link to={`/resources/${category}/new`}>New resource</Link>
      <ResourcesList resources={data} category={category} />
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(CategoryPage);
export { CategoriesList, NewCategoryForm, DeleteCategoryButton };

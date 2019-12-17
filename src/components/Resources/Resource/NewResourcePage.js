import 'firebase/firestore';
import React from 'react';
import { useParams } from 'react-router-dom';
import { withAuthorization } from '../../Session';
import NewResourceForm from './NewResourceForm';
import { useDocumentOnce } from '../../../hooks';

function NewResourcePage() {
  const { category } = useParams();

  const categoryData = useDocumentOnce(`resource_categories/${category}`);

  return (
    <div>
      <h1>{!categoryData.loading && `Create a new resource in ${categoryData.data.title} category`}</h1>
      <NewResourceForm category={category} />
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(NewResourcePage);

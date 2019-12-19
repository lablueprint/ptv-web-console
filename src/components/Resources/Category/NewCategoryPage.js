import 'firebase/firestore';
import React from 'react';
import { withAuthorization } from '../../Session';
import NewCategoryForm from './NewCategoryForm';

function NewCategoryPage() {
  return (
    <div>
      <h1>Create a new category</h1>
      <NewCategoryForm />
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(NewCategoryPage);

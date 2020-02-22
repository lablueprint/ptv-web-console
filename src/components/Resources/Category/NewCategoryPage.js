import 'firebase/firestore';
import React from 'react';
import NewCategoryForm from './NewCategoryForm';

export default function NewCategoryPage() {
  return (
    <div>
      <h1>Create a new category</h1>
      <NewCategoryForm />
    </div>
  );
}

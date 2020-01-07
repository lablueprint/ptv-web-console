import React from 'react';
import { Toolbar } from 'react-admin';
import CategoryCreateSaveButton from './CategoryCreateSaveButton';

export default function CategoryCreateToolbar(props) {
  return (
    <Toolbar {...props}>
      <CategoryCreateSaveButton />
    </Toolbar>
  );
}

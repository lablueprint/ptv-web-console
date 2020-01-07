import React from 'react';
import {
  Create, SimpleForm, TextInput,
} from 'react-admin';
import CategoryCreateToolbar from './CategoryCreateToolbar';

export default function CategoryCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm toolbar={<CategoryCreateToolbar />} redirect="show">
        <TextInput source="title" />
        <TextInput source="description" />
      </SimpleForm>
    </Create>
  );
}

import React from 'react';
import {
  Create, SimpleForm, TextInput, ImageInput, ImageField,
} from 'react-admin';
import CategoryCreateToolbar from './CategoryCreateToolbar';

export default function CategoryCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm toolbar={<CategoryCreateToolbar />} redirect="show">
        <ImageInput source="thumbnail" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput source="title" />
        <TextInput source="description" />
      </SimpleForm>
    </Create>
  );
}

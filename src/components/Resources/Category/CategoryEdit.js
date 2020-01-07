import React from 'react';
import {
  Edit, SimpleForm, TextInput, ReferenceField, TextField, FunctionField, ImageInput, ImageField,
} from 'react-admin';
import CategoryEditToolbar from './CategoryEditToolbar';

export default function CategoryEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm toolbar={<CategoryEditToolbar />}>
        <ImageInput source="thumbnail" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput source="title" />
        <TextInput source="description" />
        <ReferenceField label="Author" source="author" reference="users" link="show">
          <TextField source="name" />
        </ReferenceField>
        <FunctionField
          source="createdAt"
          render={(record) => (
            record.createdAt ? new Date(record.createdAt.seconds * 1000).toLocaleString() : null
          )}
        />
        <FunctionField
          source="updatedAt"
          render={(record) => (
            record.updatedAt ? new Date(record.updatedAt.seconds * 1000).toLocaleString() : null
          )}
        />
      </SimpleForm>
    </Edit>
  );
}

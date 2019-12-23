import React from 'react';
import {
  Edit, SimpleForm, TextInput, ReferenceField, TextField, FunctionField,
} from 'react-admin';

export default function CategoryEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
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

import React from 'react';
import {
  Edit, TextField, SimpleForm, FunctionField,
} from 'react-admin';

export default function UserEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextField source="name" />
        <TextField source="email" />
        <FunctionField
          source="createdAt"
          render={(record) => (
            record.createdAt
              ? new Date(record.createdAt.seconds * 1000).toLocaleString()
              : null
          )}
        />
        <FunctionField
          source="updatedAt"
          render={(record) => (
            record.updatedAt
              ? new Date(record.updatedAt.seconds * 1000).toLocaleString()
              : null
          )}
        />
      </SimpleForm>
    </Edit>
  );
}

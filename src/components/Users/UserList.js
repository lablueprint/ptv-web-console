import React from 'react';
import {
  Datagrid, EditButton, FunctionField, List, ShowButton, TextField,
} from 'react-admin';

export default function UserList(props) {
  return (
    <List title="All users" {...props}>
      <Datagrid>
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
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
}

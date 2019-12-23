import React from 'react';
import {
  Datagrid, EditButton, FunctionField, List, ReferenceField, ShowButton, TextField,
} from 'react-admin';

export default function CategoryList(props) {
  return (
    <List title="Resource Categories" {...props}>
      <Datagrid>
        <TextField source="title" />
        <TextField source="description" />
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
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
}

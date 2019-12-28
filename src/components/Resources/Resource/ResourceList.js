import React from 'react';
import {
  List, Datagrid, TextField, ReferenceField, FunctionField, ShowButton, EditButton,
} from 'react-admin';

export default function ResourceList(props) {
  return (
    <List title="All resources" {...props}>
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
        <ReferenceField label="Category" source="category_id" reference="resource_categories" link="show">
          <TextField source="title" />
        </ReferenceField>
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
}

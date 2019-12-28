import React from 'react';
import {
  Show, SimpleShowLayout, TextField, ReferenceField, FunctionField, RichTextField,
} from 'react-admin';

export default function ResourceShow(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
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
        <RichTextField source="body" />
      </SimpleShowLayout>
    </Show>
  );
}

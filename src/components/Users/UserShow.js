import React from 'react';
import {
  Datagrid, EditButton, FunctionField, ReferenceField,
  ReferenceManyField, Show, ShowButton, SimpleShowLayout, TextField,
} from 'react-admin';


export default function UserShow(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
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

        <ReferenceManyField label="Resources" reference="resources" target="author">
          <Datagrid>
            <TextField source="title" />
            <TextField source="description" />
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
            <ReferenceField label="Category" source="category_id" reference="resource_categories" link="show">
              <TextField source="title" />
            </ReferenceField>
            <ShowButton />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
}

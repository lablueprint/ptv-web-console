import React from 'react';
import {
  Datagrid, EditButton, FunctionField, ReferenceField,
  ReferenceManyField, Show, ShowButton, SimpleShowLayout, TextField,
  ImageField,
} from 'react-admin';
import { Link } from 'react-router-dom';

export default function CategoryShow(props) {
  return (
    <>
      <Show {...props}>
        <SimpleShowLayout>
          <ImageField source="thumbnail.src" label="Thumbnail" />
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

          <ReferenceManyField label="Resources in this category" reference="resources" target="category_id">
            <Datagrid>
              <TextField source="title" />
              <TextField source="description" />
              <ReferenceField label="Author" source="author" reference="users" link="show">
                <TextField source="name" />
              </ReferenceField>
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
          </ReferenceManyField>

        </SimpleShowLayout>
      </Show>
      <Link to="/resources/create">New resource</Link>
    </>
  );
}

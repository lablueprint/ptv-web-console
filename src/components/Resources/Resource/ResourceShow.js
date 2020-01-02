import React from 'react';
import {
  Show, SimpleShowLayout, TextField, ReferenceField, FunctionField, SimpleForm,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

export default function ResourceShow(props) {
  const configureQuill = (quill) => {
    quill.disable();
  };

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
        <SimpleForm>
          <RichTextInput source="body" toolbar={[]} configureQuill={configureQuill} />
        </SimpleForm>
      </SimpleShowLayout>
    </Show>
  );
}

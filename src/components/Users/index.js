import React from 'react';
import {
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  EditButton,
  SimpleForm,
  TextInput,
  Show,
  SimpleShowLayout,
  ReferenceManyField,
  FunctionField,
  ShowButton,
  ReferenceField,
} from 'react-admin';

export function UserShow(props) {
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

export function UserList(props) {
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

export function UserCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="email" />
      </SimpleForm>
    </Create>
  );
}

export function UserEdit(props) {
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

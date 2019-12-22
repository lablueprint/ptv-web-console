import React, { useCallback } from 'react';
import { useForm } from 'react-final-form';
import {
  Create, Datagrid, Edit, EditButton, List, SimpleForm, TextField,
  TextInput, ReferenceManyField, SimpleShowLayout, Show, ShowButton,
  SaveButton, Toolbar, useAuthState, FunctionField, ReferenceField,
} from 'react-admin';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

export function CategoryList(props) {
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

export function CategoryShow(props) {
  return (
    <>
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

function CreateCategoryWithAuthor({ handleSubmitWithRedirect, ...props }) {
  const { loaded } = useAuthState();
  const form = useForm();
  const handleClick = useCallback(() => {
    if (loaded) {
      form.change('author', firebase.auth().currentUser.uid);
      handleSubmitWithRedirect('show');
    }
  }, [form, handleSubmitWithRedirect, loaded]);

  return <SaveButton {...props} label="Create" handleSubmitWithRedirect={handleClick} />;
}

CreateCategoryWithAuthor.propTypes = {
  handleSubmitWithRedirect: PropTypes.func.isRequired,
};

function CategoryCreateToolbar(props) {
  return (
    <Toolbar {...props}>
      <CreateCategoryWithAuthor />
    </Toolbar>
  );
}

export function CategoryCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm toolbar={<CategoryCreateToolbar />} redirect="show">
        <TextInput source="title" />
        <TextInput source="description" />
      </SimpleForm>
    </Create>
  );
}

export function CategoryEdit(props) {
  return (
    <>
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
    </>
  );
}

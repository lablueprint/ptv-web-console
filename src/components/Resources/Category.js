import React from 'react';
import {
  Create, Datagrid, Edit, EditButton, List, SimpleForm, TextField, TextInput, ReferenceManyField,
} from 'react-admin';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MyDateField({ source, record }) {
  return (
    <span>{record[source] ? new Date(record[source].seconds * 1000).toString() : null}</span>
  );
}

MyDateField.propTypes = {
  record: PropTypes.shape({
    seconds: PropTypes.number,
  }),
  source: PropTypes.string.isRequired,
};

MyDateField.defaultProps = {
  record: {},
};

export function CategoryList(props) {
  return (
    <List title="Resource Categories" {...props}>
      <Datagrid>
        <TextField source="title" />
        <TextField source="description" />
        <TextField source="author" />
        <MyDateField source="createdAt" />
        <MyDateField source="updatedAt" />
        <EditButton />
      </Datagrid>
    </List>
  );
}
export function CategoryCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="id" />
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
          <TextInput source="id" />
          <TextField source="title" />
          <TextField source="description" />
          <ReferenceManyField label="Resources in this category" reference="resources" target="category_id">
            <Datagrid>
              <TextField source="title" />
              <EditButton />
            </Datagrid>
          </ReferenceManyField>
        </SimpleForm>
      </Edit>
      <Link to="/resources/create">New resource</Link>
    </>
  );
}

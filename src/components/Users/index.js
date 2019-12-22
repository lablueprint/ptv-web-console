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
  ImageInput,
  ImageField,
} from 'react-admin';

export function UserList(props) {
  return (
    <List title="All users" {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="username" />
        <TextField source="email" />
        <EditButton />
      </Datagrid>
    </List>
  );
}

export function UserCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="name" />
        <TextInput source="username" />
        <TextInput source="email" />
        <ImageInput source="avatar" label="User avatar" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <ImageInput source="images" label="Other images" accept="image/*" multiple>
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
}

export function UserEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="name" />
        <TextInput source="username" />
        <TextInput source="email" />
        <ImageInput source="avatar" label="User avatar" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <ImageInput source="images" label="Other images" accept="image/*" multiple>
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
}

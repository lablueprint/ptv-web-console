import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import {
  Create, SaveButton, SimpleForm, TextInput, Toolbar, useAuthState,
} from 'react-admin';
import { useForm } from 'react-final-form';

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

export default function CategoryCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm toolbar={<CategoryCreateToolbar />} redirect="show">
        <TextInput source="title" />
        <TextInput source="description" />
      </SimpleForm>
    </Create>
  );
}

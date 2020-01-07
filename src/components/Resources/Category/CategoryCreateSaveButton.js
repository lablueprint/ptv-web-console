import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { SaveButton, useAuthState } from 'react-admin';
import { useForm } from 'react-final-form';

export default function CategoryCreateSaveButton({
  // eslint-disable-next-line react/prop-types
  handleSubmitWithRedirect, // cannot be validated
  ...props
}) {
  const { loaded } = useAuthState();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => firebase.auth().onAuthStateChanged((user) => {
    setAuthUser(user || null);
  }));

  const form = useForm();

  const handleClick = async () => {
    if (loaded) {
      form.change('author', authUser.uid);
      handleSubmitWithRedirect('show');
    }
  };

  return <SaveButton {...props} label="Create" handleSubmitWithRedirect={handleClick} />;
}

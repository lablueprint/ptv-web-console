import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  SaveButton, useAuthState, useDataProvider, useNotify, useRedirect,
} from 'react-admin';
import { useForm } from 'react-final-form';

export default function CategoryCreateSaveButton({
  // eslint-disable-next-line react/prop-types
  handleSubmitWithRedirect, // cannot be validated
  ...props
}) {
  const { loaded } = useAuthState();
  const [authUser, setAuthUser] = useState(null);
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const redirect = useRedirect();

  useEffect(() => firebase.auth().onAuthStateChanged((user) => {
    setAuthUser(user || null);
  }));

  const form = useForm();

  const handleClick = async () => {
    if (loaded) {
      form.change('author', authUser.uid);

      const categoryId = firebase
        .firestore()
        .collection('resource_categories')
        .doc().id;

      const { thumbnail } = form.getState().values;

      if (thumbnail && thumbnail.rawFile) {
        const snapshot = await firebase
          .storage()
          .ref()
          .child(`resource_categories/${categoryId}/thumbnail.jpg`)
          .put(thumbnail.rawFile);
        const imageUrl = await snapshot.ref.getDownloadURL();

        // Put him in an object to get rid of a warning when
        // trying to display the image in CategoryShow.
        const thumbnailObject = {
          src: imageUrl,
        };

        form.change('thumbnail', thumbnailObject);

        const formContents = form.getState().values;

        dataProvider
          .create('resource_categories', {
            id: categoryId,
            data: formContents,
          }).then(() => {
            redirect(`/resource_categories/${categoryId}/show`);
            notify('Category created');
          }).catch((err) => {
            notify(`Error creating category: ${err.message}`, 'warning');
          });
      }
    } else {
      throw new Error('User is not logged in');
    }
  };

  return <SaveButton {...props} label="Create" handleSubmitWithRedirect={handleClick} />;
}

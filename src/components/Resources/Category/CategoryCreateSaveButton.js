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

      const categoryId = firebase
        .firestore()
        .collection('categories')
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
      }

      handleSubmitWithRedirect('show');
    }
  };

  return <SaveButton {...props} label="Create" handleSubmitWithRedirect={handleClick} />;
}

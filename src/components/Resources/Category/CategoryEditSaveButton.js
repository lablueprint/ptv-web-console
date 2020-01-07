import firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import { SaveButton } from 'react-admin';
import { useForm } from 'react-final-form';

export default function CategoryEditSaveButton({
  // eslint-disable-next-line react/prop-types
  handleSubmitWithRedirect, // cannot be validated
  ...props
}) {
  const form = useForm();

  const handleClick = async () => {
    const { thumbnail, id } = form.getState().values;

    if (thumbnail && thumbnail.rawFile) {
      const snapshot = await firebase
        .storage()
        .ref()
        .child(`resource_categories/${id}/thumbnail.jpg`)
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
  };

  return <SaveButton {...props} label="Save" handleSubmitWithRedirect={handleClick} />;
}

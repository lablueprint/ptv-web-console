import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import {
  useAuthState, SaveButton, useDataProvider, useNotify, useRedirect,
} from 'react-admin';
import { useForm } from 'react-final-form';
import PropTypes from 'prop-types';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { asyncForEach, hashCode } from './utils';

export default function ResourceCreateSaveButton({
  // eslint-disable-next-line react/prop-types
  handleSubmitWithRedirect, // cannot be validated
  imagesToUpload, formBodyDelta, ...props
}) {
  const { loaded } = useAuthState();
  const form = useForm();
  const notify = useNotify();
  const redirect = useRedirect();
  const dataProvider = useDataProvider();

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => firebase.auth().onAuthStateChanged((user) => {
    setAuthUser(user || null);
  }));

  const handleClick = async () => {
    if (loaded) {
      form.change('author', authUser.uid);

      const resourceId = firebase
        .firestore()
        .collection('resources')
        .doc().id;

      const uploadAndReplaceImages = async () => {
        const imageHashToUrlMap = {}; // map from imageHash to url in storage
        await asyncForEach(Object.entries(imagesToUpload),
          async ([imageHash, { count, file }]) => {
            if (count > 0) {
              const snapshot = await firebase
                .storage()
                .ref()
                .child(`resources/${resourceId}/images/${imageHash}.jpg`)
                .put(file);
              const imageUrl = await snapshot.ref.getDownloadURL();
              imageHashToUrlMap[imageHash] = imageUrl;
            }
          });

        const replacedWithUrls = (await formBodyDelta).ops.map((op) => {
          // replace image with url of the image in the storage bucket
          if (op.insert && op.insert.image) {
            const insertImageOp = op;
            const imageHash = hashCode(insertImageOp.insert.image);
            insertImageOp.insert.image = imageHashToUrlMap[imageHash];
            return insertImageOp;
          }
          // not an image, so don't map this op to anything
          return op;
        });

        const converter = new QuillDeltaToHtmlConverter(replacedWithUrls, {});
        const html = converter.convert();
        form.change('body', html);

        const formContents = form.getState().values;

        dataProvider
          .create('resources', {
            id: resourceId,
            data: formContents,
          }).then(() => {
            redirect(`/resources/${resourceId}/show`);
            notify('Resource created');
          }).catch((err) => {
            notify(`Error creating resource: ${err.message}`, 'warning');
          });
      };

      uploadAndReplaceImages();
    } else {
      throw new Error('User is not logged in');
    }
  };

  return <SaveButton {...props} label="Create" handleSubmitWithRedirect={handleClick} />;
}

ResourceCreateSaveButton.propTypes = {
  imagesToUpload: PropTypes.objectOf(PropTypes.shape({
    count: PropTypes.number.isRequired,
    file: PropTypes.instanceOf(File).isRequired,
  })).isRequired,
  formBodyDelta: PropTypes.shape({
    ops: PropTypes.arrayOf(PropTypes.shape({
      insert: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
    })),
  }),
};

ResourceCreateSaveButton.defaultProps = {
  formBodyDelta: null,
};

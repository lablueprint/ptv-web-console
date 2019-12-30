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

export default function ResourceEditSaveButton({
  // eslint-disable-next-line react/prop-types
  handleSubmitWithRedirect, // cannot be validated
  imagesToUpload, formBodyDelta, record, ...props
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

      const resourceId = form.getState().values.id;

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

        const awaitedFormBodyDelta = await formBodyDelta;
        if (awaitedFormBodyDelta && awaitedFormBodyDelta.ops) {
          const replacedWithUrls = awaitedFormBodyDelta.ops.map((op) => {
            // replace image with url of the image in the storage bucket
            if (op.insert && op.insert.image && op.insert.image.startsWith('data:image/')) {
              const insertImageOp = op;
              const imageHash = hashCode(insertImageOp.insert.image);
              insertImageOp.insert.image = imageHashToUrlMap[imageHash];
              return insertImageOp;
            }
            // not an image, so don't map this op to anything
            return op;
          });

          const urlSanitizer = (url) => {
            // Do not sanitize our own image urls, but do sanitize any other urls
            if (url.startsWith('https://firebasestorage.googleapis.com/v0/b/la-blueprint-ptv.appspot.com/o/resources%2F')) {
              return url;
            }
            return undefined;
          };

          const converter = new QuillDeltaToHtmlConverter(replacedWithUrls, { urlSanitizer });
          const html = converter.convert();
          form.change('body', html);
        }

        form.change('updatedAt', firebase.firestore.Timestamp());

        const formContents = form.getState().values;

        dataProvider
          .update('resources', {
            id: resourceId,
            data: formContents,
            previousData: record,
          }).then(() => {
            redirect(`/resources/${resourceId}/show`);
            notify('Resource updated');
          }).catch((err) => {
            notify(`Error updating resource: ${err.message}`, 'warning');
          });
      };

      uploadAndReplaceImages();
    } else {
      throw new Error('User is not logged in');
    }
  };

  return <SaveButton {...props} label="Save" handleSubmitWithRedirect={handleClick} />;
}

ResourceEditSaveButton.propTypes = {
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
  record: PropTypes.shape({
    images: PropTypes.objectOf(
      PropTypes.number,
    ),
  }),
};

ResourceEditSaveButton.defaultProps = {
  formBodyDelta: null,
  record: null,
};

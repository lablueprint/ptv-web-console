import React, { useState } from 'react';
import {
  Create, SimpleForm, TextInput, ReferenceInput, SelectInput,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { RAFirebaseMethods } from 'ra-data-firestore-client';
import { hashCode, getImageHashesFromDelta, difference } from './utils';
import useImagesToUpload from './useImagesToUpload';
import ResourceCreateToolbar from './ResourceCreateToolbar';
import toolbarOptions from './toolbarOptions';

/*
 * TODO: handle memory leaks when uploading to storage.
 *
 * Proposed solution:
 *    (DONE) When user adds an image to the editor from the toolbar:
 *      - (DONE) show a temporary view of the image in the editor
 *      - (DONE) add the filename to a list in this component's state with count
 *    On editor text change:
 *      - (DONE) if not uploaded, decrement the file's count from the list of files to upload
 *      - if uploaded, decrement the file's count from the list of uploaded files
 *    (DONE) On submit:
 *      - (DONE) upload all the images in the list of files to upload (if count > 0)
 *      - (DONE) replace the embedded images in the editor with the links to the uploaded images
 *      - (DONE) add the list of urls to this resource's doc in the database
 *      - from the list of uploaded images, delete images from storage (if count <= 0)
 *    On resource delete:
 *      - delete all the images of this resource
 *
 *  We can also have a cloud function that acts as a
 *    garbage collector in case any of the deletions fail.
 *      - scan the database for the images that are referenced
 *      - scan the storage bucket
 *      - if any images are not referenced, delete them
 */

export default function ResourceCreate(props) {
  const [imagesToUpload, dispatch] = useImagesToUpload();
  const [formBodyDelta, setFormBodyDelta] = useState(null);

  const configureQuill = (quill) => {
    quill.getModule('toolbar').addHandler('image', () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.onchange = () => {
        const file = input.files[0];
        RAFirebaseMethods.default.convertFileToBase64({ rawFile: file })
          .then((res) => {
            const range = quill.getSelection(true); // Save current cursor state
            quill.insertEmbed(range.index, 'image', res);
            quill.setSelection(range.index + 1); // Move cursor to right side of image
            const imageHash = hashCode(res);
            dispatch({
              type: useImagesToUpload.types.insert,
              data: [
                {
                  imageHash,
                  file,
                },
              ],
            });
          });
      };
      input.click();
    });

    quill.on('text-change', (delta, oldDelta, source) => {
      const currentContents = quill.getContents();
      setFormBodyDelta(currentContents);
      if (source === 'user') {
        const currImageHashes = getImageHashesFromDelta(currentContents);
        const prevImageHashes = getImageHashesFromDelta(oldDelta);
        const diff = difference(prevImageHashes, currImageHashes);
        if (diff.length) {
          dispatch({
            type: useImagesToUpload.types.refresh,
            data: { currImageHashes },
          });
        }
      }
    });
  };

  return (
    <Create {...props}>
      <SimpleForm
        toolbar={(
          <ResourceCreateToolbar
            imagesToUpload={imagesToUpload}
            formBodyDelta={formBodyDelta}
          />
        )}
        redirect="show"
      >
        <TextInput source="title" />
        <TextInput source="description" />
        <ReferenceInput label="Category" source="category_id" reference="resource_categories">
          <SelectInput optionText="title" />
        </ReferenceInput>
        <RichTextInput source="body" toolbar={toolbarOptions} configureQuill={configureQuill} />
      </SimpleForm>
    </Create>
  );
}

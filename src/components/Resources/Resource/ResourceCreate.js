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

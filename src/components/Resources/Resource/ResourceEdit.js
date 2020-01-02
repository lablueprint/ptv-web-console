import React, { useState } from 'react';
import {
  Edit, SimpleForm, TextInput, ReferenceField, TextField,
  FunctionField, ReferenceInput, SelectInput,
} from 'react-admin';
import { RAFirebaseMethods } from 'ra-data-firestore-client';
import RichTextInput from 'ra-input-rich-text';
import {
  hashCode, getImageHashesFromDelta, difference,
} from './utils';
import toolbarOptions from './toolbarOptions';
import useImagesToUpload from './useImagesToUpload';
import ResourceEditToolbar from './ResourceEditToolbar';

export default function ResourceEdit(props) {
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
        const diffImageHashes = difference(prevImageHashes, currImageHashes);
        if (diffImageHashes.length) {
          dispatch({
            type: useImagesToUpload.types.refresh,
            data: { currImageHashes },
          });
        }
      }
    });
  };

  return (
    <Edit {...props}>
      <SimpleForm toolbar={(
        <ResourceEditToolbar
          imagesToUpload={imagesToUpload}
          formBodyDelta={formBodyDelta}
        />
        )}
      >
        <TextInput source="title" />
        <TextInput source="description" />
        <ReferenceField label="Author" source="author" reference="users" link="show">
          <TextField source="name" />
        </ReferenceField>
        <FunctionField
          source="createdAt"
          render={(record) => (
            record.createdAt ? new Date(record.createdAt.seconds * 1000).toLocaleString() : null
          )}
        />
        <FunctionField
          source="updatedAt"
          render={(record) => (
            record.updatedAt ? new Date(record.updatedAt.seconds * 1000).toLocaleString() : null
          )}
        />
        <ReferenceInput label="Category" source="category_id" reference="resource_categories">
          <SelectInput optionText="title" />
        </ReferenceInput>
        <RichTextInput source="body" toolbar={toolbarOptions} configureQuill={configureQuill} />
      </SimpleForm>
    </Edit>
  );
}

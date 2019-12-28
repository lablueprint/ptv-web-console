import React from 'react';
import {
  Edit, SimpleForm, TextInput, ReferenceField, TextField,
  FunctionField, ReferenceInput, SelectInput,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import firebase from 'firebase/app';
import 'firebase/storage';

/*
 * TODO: handle memory leaks when uploading to storage.
 *
 * See ResourceCreate.js for details.
 *
 */

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['link', 'image', 'video', 'formula'], // add's image support
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

const configureQuill = (quill) => {
  quill.getModule('toolbar').addHandler('image', () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      // Save current cursor state
      const range = quill.getSelection(true);

      // Move cursor to right side of image (easier to continue typing)
      quill.setSelection(range.index + 1);

      // Upload to storage and embed in the editor
      firebase
        .storage()
        .ref()
        .child(`${Date.now()}.jpg`)
        .put(file)
        .then((snapshot) => {
          snapshot.ref
            .getDownloadURL()
            .then((url) => {
              quill.insertEmbed(range.index, 'image', url);
            });
        });
    };
  });

  quill.on('text-change', (delta, oldDelta) => {
    const currrentContents = quill.getContents();
    const diff = currrentContents.diff(oldDelta);
    const insertOps = diff.ops.filter((op) => !!op.insert);
    insertOps.forEach((insertOp) => {
      if (insertOp.insert.image) {
        firebase.storage()
          .refFromURL(insertOp.insert.image)
          .delete()
          .catch((error) => {
            console.error(error);
          });
      }
    });
  });
};

export default function ResourceEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
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

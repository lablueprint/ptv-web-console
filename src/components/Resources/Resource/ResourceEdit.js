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
 * Proposed solution:
 *    When user adds an image to the editor:
 *      - show a temporary view of the image in the editor
 *      - add the filename to a list in this component's state
 *    When the user backspaces an image in the editor:
 *      - remove the filename from the list in the component state
 *    On submit:
 *      - add the list of filenames to this resource's doc in the database
 *      - upload all the images in the list
 *      - replace the embedded images in the editor with the links to the uploaded images in storage
 *    On resource delete:
 *      - delete all the images in the list first
 *
 *  We can also have a cloud function that acts as a
 *    garbage collector in case any of the deletions fail.
 *      - scan the database for the images that are referenced
 *      - scan the storage bucket
 *      - if any images are not referenced, delete them
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

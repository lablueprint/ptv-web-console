import React, { useCallback } from 'react';
import { useForm } from 'react-final-form';
import {
  useAuthState, Toolbar, Create, SimpleForm, TextInput, ReferenceInput, SelectInput, SaveButton,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import firebase from 'firebase/app';
import 'firebase/storage';
import PropTypes from 'prop-types';

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
  const imageHandler = () => {
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
  };

  quill.getModule('toolbar').addHandler('image', imageHandler);

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

function CreateResourceWithAuthor({ handleSubmitWithRedirect, ...props }) {
  const { loaded } = useAuthState();
  const form = useForm();
  const handleClick = useCallback(() => {
    if (loaded) {
      form.change('author', firebase.auth().currentUser.uid);
      handleSubmitWithRedirect('show');
    }
  }, [form, handleSubmitWithRedirect, loaded]);

  return <SaveButton {...props} label="Create" handleSubmitWithRedirect={handleClick} />;
}

CreateResourceWithAuthor.propTypes = {
  handleSubmitWithRedirect: PropTypes.func.isRequired,
};

function ResourceCreateToolbar(props) {
  return (
    <Toolbar {...props}>
      <CreateResourceWithAuthor />
    </Toolbar>
  );
}

export default function ResourceCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm toolbar={<ResourceCreateToolbar />} redirect="show">
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

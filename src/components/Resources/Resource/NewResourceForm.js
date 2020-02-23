import { EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import {
  BLOCK_TYPE, DraftailEditor, INLINE_STYLE, serialiseEditorStateToRaw,
} from 'draftail';
import 'draftail/dist/draftail.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const INITIAL_FORM_STATE = {
  title: '',
  description: '',
  body: '',
};

export default function NewResourceForm() {
  const { categoryId } = useParams();
  const history = useHistory();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = useCallback((event) => {
    event.preventDefault();

    const record = {
      ...formState,
      categoryId,
    };

    const docRef = firebase.firestore().collection('resources').doc();
    docRef.set(record)
      .then(() => {
        setFormState(INITIAL_FORM_STATE);
        setEditorState(EditorState.createEmpty());
        history.push(`/resources/${categoryId}/${docRef.id}`);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [categoryId, formState, history]);

  const onEditorChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
    setFormState(
      {
        ...formState,
        body: JSON.stringify(serialiseEditorStateToRaw(editorState)),
      },
    );
  }, [editorState, formState]);

  const onChange = useCallback((event) => {
    event.preventDefault();
    setFormState(
      {
        ...formState,
        [event.target.name]: event.target.value,
      },
    );
  }, [formState]);

  return (
    <form onSubmit={onSubmit}>
      <input
        name="title"
        type="text"
        value={formState.title}
        onChange={onChange}
        placeholder="Title"
      />
      <input
        name="description"
        type="text"
        value={formState.description}
        onChange={onChange}
        placeholder="Description"
      />
      <DraftailEditor
        editorState={editorState}
        onChange={onEditorChange}
        blockTypes={[
          { type: BLOCK_TYPE.UNSTYLED },
          { type: BLOCK_TYPE.HEADER_ONE },
          { type: BLOCK_TYPE.HEADER_TWO },
          { type: BLOCK_TYPE.HEADER_THREE },
          { type: BLOCK_TYPE.HEADER_FOUR },
          { type: BLOCK_TYPE.HEADER_FIVE },
          { type: BLOCK_TYPE.HEADER_SIX },
          { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
          { type: BLOCK_TYPE.ORDERED_LIST_ITEM },
          { type: BLOCK_TYPE.BLOCKQUOTE },
          { type: BLOCK_TYPE.CODE },

        ]}
        inlineStyles={[
          { type: INLINE_STYLE.BOLD },
          { type: INLINE_STYLE.ITALIC },
          { type: INLINE_STYLE.CODE },
          { type: INLINE_STYLE.UNDERLINE },
          { type: INLINE_STYLE.STRIKETHROUGH },
          { type: INLINE_STYLE.MARK },
          { type: INLINE_STYLE.QUOTATION },
          { type: INLINE_STYLE.SMALL },
          { type: INLINE_STYLE.SAMPLE },
          { type: INLINE_STYLE.INSERT },
          { type: INLINE_STYLE.DELETE },
          { type: INLINE_STYLE.KEYBOARD },
          { type: INLINE_STYLE.SUPERSCRIPT },
          { type: INLINE_STYLE.SUBSCRIPT },
        ]}
      />
      <button type="submit">Create resource</button>

      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

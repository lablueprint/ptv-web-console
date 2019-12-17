import { EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import {
  BLOCK_TYPE, DraftailEditor, INLINE_STYLE, serialiseEditorStateToRaw,
} from 'draftail';
import 'draftail/dist/draftail.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useNewDocumentForm } from '../../../hooks';

const INITIAL_STATE = {
  title: '',
  description: '',
  body: '',
};

export default function NewResourceForm({ category }) {
  const history = useHistory();

  const {
    onChange, onSubmit, setCustomField, error, title, description, docId,
  } = useNewDocumentForm(`resource_categories/${category}/resources`, INITIAL_STATE);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onSubmitWithEditor = (event) => {
    onSubmit(event).then((success) => {
      if (success) {
        setEditorState(EditorState.createEmpty());
        history.push(`/resources/${category}/${docId}`);
      }
    });
  };

  const onEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    setCustomField('body', JSON.stringify(serialiseEditorStateToRaw(editorState)));
  };

  return (
    <form onSubmit={onSubmitWithEditor}>
      <input
        name="title"
        type="text"
        value={title}
        onChange={onChange}
        placeholder="Title"
      />
      <input
        name="description"
        type="text"
        value={description}
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

      {error && <p>{error.message}</p>}
    </form>
  );
}

NewResourceForm.propTypes = {
  category: PropTypes.string.isRequired,
};

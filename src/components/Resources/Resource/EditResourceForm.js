import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {
  DraftailEditor, INLINE_STYLE, BLOCK_TYPE, createEditorStateFromRaw, serialiseEditorStateToRaw,
} from 'draftail';
import { EditorState } from 'draft-js';
import { useParams } from 'react-router-dom';

const INITIAL_FORM_STATE = {
  title: '',
  description: '',
  body: '',
};

export default function EditResourceForm({ currentState }) {
  const { resourceId } = useParams();
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [errorMessage, setErrorMessage] = useState(null);
  const [readOnly, setReadOnly] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!(Object.entries(currentState).length === 0)) {
      setFormState(currentState);
    }
    if (currentState.body) {
      setEditorState(createEditorStateFromRaw(JSON.parse(currentState.body)));
    }
  }, [currentState]);

  const onChange = useCallback((event) => {
    event.preventDefault();
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }, [formState]);

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    setLoading(true);
    firebase.firestore().collection('resources').doc(resourceId)
      .update(formState)
      .then(() => {
        setLoading(false);
        setReadOnly(true);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
        setReadOnly(true);
      });
  }, [formState, resourceId]);

  const onEditorChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
    setFormState({ ...formState, body: JSON.stringify(serialiseEditorStateToRaw(editorState)) });
  }, [editorState, formState]);

  return (
    <div>
      <button disabled={!readOnly} type="button" onClick={() => setReadOnly(false)}>
        Edit
      </button>
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                Title
              </td>
              <td>
                <input
                  name="title"
                  type="text"
                  value={formState.title}
                  onChange={onChange}
                  disabled={readOnly || loading}
                />
              </td>
            </tr>
            <tr>
              <td>
                Description
              </td>
              <td>
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={onChange}
                  disabled={readOnly || loading}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {formState.body && (
        <DraftailEditor
          readOnly={readOnly}
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
        )}

        <button type="submit" disabled={readOnly || loading} onSubmit={onSubmit}>Save</button>
        {loading && <p>Loading...</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

EditResourceForm.propTypes = {
  currentState: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

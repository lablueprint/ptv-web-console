import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {
  DraftailEditor, INLINE_STYLE, BLOCK_TYPE, createEditorStateFromRaw, serialiseEditorStateToRaw,
} from 'draftail';
import { EditorState } from 'draft-js';
import { useParams, useHistory } from 'react-router-dom';


export default function EditResourceForm({ readOnly, currentState }) {
  const { categoryId, resourceId } = useParams();
  const history = useHistory();
  const [formState, setFormState] = useState(currentState);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setFormState(currentState);
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
    firebase.firestore().collection('resources').doc(resourceId)
      .update(formState)
      .then(() => {
        setEditorState(EditorState.createEmpty());
        history.push(`/resources/${categoryId}/${resourceId}`);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [categoryId, formState, history, resourceId]);

  const onEditorChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
    setFormState({ ...formState, body: JSON.stringify(serialiseEditorStateToRaw(editorState)) });
  }, [editorState, formState]);

  return (
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
                disabled={readOnly}
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
                disabled={readOnly}
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

      <button type="submit">Save</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>

  );
}

EditResourceForm.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  currentState: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

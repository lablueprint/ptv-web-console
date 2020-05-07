import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router';

export default function RepliesChip({ postID }) {
  const [numReplies, setNumReplies] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const theme = useTheme();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    firebase.firestore().collection('forum_comments')
      .where('postID', '==', postID)
      .where('approved', '==', false)
      .get()
      .then((snapshot) => {
        setNumReplies(snapshot.size);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  }, [postID]);

  const handleClick = useCallback(() => {
    history.push(`/forum/approved/${postID}`);
  }, [history, postID]);

  return (
    <>
      {loading
        ? <CircularProgress />
        : (
          <Chip
            onClick={handleClick}
            label={`${numReplies} pending`}
            style={{
              backgroundColor: numReplies
                ? theme.palette.error.light
                : theme.palette.success.light,
            }}
          />
        )}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

RepliesChip.propTypes = {
  postID: PropTypes.string.isRequired,
};

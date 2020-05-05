import React, { useState, useEffect } from 'react';
import { makeStyles, Typography, LinearProgress } from '@material-ui/core';
import { useParams } from 'react-router';
import firebase from 'firebase/app';
import ForumBreadcrumbs from './ForumApprovedPostBreadcrumbs';
import ForumPostDetailsList from './ForumPostDetailsList';
import 'firebase/firestore';

const useStyles = makeStyles((theme) => ({
  navigationContainer: {
    marginBottom: theme.spacing(4),
  },
}));

export default function ForumApprovedPostDetails() {
  const classes = useStyles();
  const { postID } = useParams();
  const [postData, setPostData] = useState({});
  const [user, setUser] = useState({});
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    firebase.firestore().collection('forum_posts').doc(postID).get()
      .then((snapshot) => {
        setPostData({ ...snapshot.data(), id: snapshot.id });
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [postID]);

  useEffect(() => {
    if (postData && postData.userID) {
      setLoading(true);
      firebase.firestore().collection('users').doc(postData.userID).get()
        .then((snapshot) => {
          setUser({ ...snapshot.data(), id: snapshot.id });
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [postData]);

  useEffect(() => {
    if (postData && postData.categoryID) {
      setLoading(true);
      firebase.firestore().collection('forum_categories').doc(postData.categoryID).get()
        .then((snapshot) => {
          setCategory({ ...snapshot.data(), id: snapshot.id });
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [postData]);

  return (
    <div>
      {error && <Typography variant="error">{error.message}</Typography>}
      {loading
        ? <LinearProgress />
        : (
          <>
            <div className={classes.navigationContainer}>
              <ForumBreadcrumbs displayName={(user && user.displayName) || 'User not found'} />
            </div>
            <ForumPostDetailsList postData={postData} user={user} category={category} />
          </>
        )}
    </div>
  );
}

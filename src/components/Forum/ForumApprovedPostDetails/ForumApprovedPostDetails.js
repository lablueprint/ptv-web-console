import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ForumBreadcrumbs from './ForumApprovedPostBreadcrumbs';
import ForumPostDetailsList from './ForumPostDetailsList';

const useStyles = makeStyles((theme) => ({
  navigationContainer: {
    marginBottom: theme.spacing(4),
  },
}));

export default function ForumApprovedPostDetails() {
  const classes = useStyles();
  const { postID } = useParams();

  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);

  const [category, setCategory] = useState({});
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState(null);

  const [post, setPost] = useState({});
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    setPostLoading(true);
    firebase.firestore().collection('forum_posts').doc(postID).get()
      .then(async (snapshot) => {
        setPost(snapshot.data());
      })
      .catch((err) => {
        setPostError(err);
      })
      .finally(() => {
        setPostLoading(false);
      });
  }, [postID]);

  useEffect(() => {
    if (post && post.userID) {
      setUserLoading(true);
      firebase.firestore().collection('users').doc(post.userID).get()
        .then((snapshot) => {
          setUser(snapshot.data());
        })
        .catch((err) => {
          setUserError(err);
        })
        .finally(() => {
          setUserLoading(false);
        });
    }
  }, [post]);

  useEffect(() => {
    if (post && post.categoryID) {
      setCategoryLoading(true);
      firebase.firestore().collection('forum_categories').doc(post.categoryID).get()
        .then((snapshot) => {
          setCategory(snapshot.data());
        })
        .catch((err) => {
          setCategoryError(err);
        })
        .finally(() => {
          setCategoryLoading(false);
        });
    }
  }, [post]);

  return (
    <>
      {[postError, userError, categoryError]
      // eslint-disable-next-line react/no-array-index-key
        .map((error, i) => error && <Typography key={i} color="error">{error.message}</Typography>)}

      <div className={classes.navigationContainer}>
        <ForumBreadcrumbs
          displayName={(user && user.displayName) || 'User not found'}
          loading={postLoading || userLoading}
        />
      </div>

      {postLoading
        ? <LinearProgress />
        : (
          <ForumPostDetailsList
            post={post}
            user={user}
            userLoading={userLoading}
            category={category}
            categoryLoading={categoryLoading}
          />
        )}
    </>
  );
}

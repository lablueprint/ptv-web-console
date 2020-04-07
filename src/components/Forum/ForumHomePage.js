import 'firebase/auth';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import CreateForumPostForm from './CreateForumPostForm';
import ForumPostsList from './ForumPostsList';

const styles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function ForumHomePage() {
  return (
    <div style={styles.paper}>
      <h1>Forum</h1>
      <CreateForumPostForm />
      <ForumPostsList />
    </div>
  );
}

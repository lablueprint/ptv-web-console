import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Switch } from 'react-router-dom';
import { ForumNavigationTabs, PrivateRoute } from '../Navigation';
import PendingPostsPage from './PendingPostsPage';
import * as ROUTES from '../../constants/routes';

const useStyles = makeStyles((theme) => ({
  navigationContainer: {
    marginBottom: theme.spacing(4),
  },
}));

export default function ForumHomePage() {
  const classes = useStyles();
  return (
    <div>
      <h1>Forum</h1>
      <div className={classes.navigationContainer}>
        <ForumNavigationTabs />
      </div>
      <Switch>
        <PrivateRoute path={ROUTES.FORUM_HOME}>
          <PendingPostsPage />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

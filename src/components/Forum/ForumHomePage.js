import { makeStyles } from '@material-ui/core';
import React from 'react';
import * as ROUTES from '../../constants/routes';
import { PrivateRoute } from '../Navigation';
import ForumNavigationTabs from './ForumNavigationTabs';
import ForumPostsListByApproval from './ForumPostsList';

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
      <PrivateRoute exact path={ROUTES.FORUM_HOME}>
        <ForumPostsListByApproval approved={false} />
      </PrivateRoute>
      <PrivateRoute exact path={ROUTES.FORUM_APPROVED_POSTS}>
        <ForumPostsListByApproval approved />
      </PrivateRoute>
    </div>
  );
}

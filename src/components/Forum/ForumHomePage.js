import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
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
      <Route exact path={ROUTES.FORUM_HOME}>
        <ForumPostsListByApproval approved={false} />
      </Route>
      <Route exact path={ROUTES.FORUM_APPROVED_POSTS}>
        <ForumPostsListByApproval approved />
      </Route>
    </div>
  );
}

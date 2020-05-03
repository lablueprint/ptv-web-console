import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import ForumNavigationTabs from './ForumNavigationTabs';
import ForumApprovedPosts from './ForumApprovedPosts';
import ForumPendingPosts from './ForumPendingPosts';

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
        {/* Tabs for top level routes, breadcrumbs for nested routes */}
        <Route exact path={`(${ROUTES.FORUM_HOME}|${ROUTES.FORUM_APPROVED_POSTS})`}>
          <ForumNavigationTabs />
        </Route>
      </div>

      <Route exact path={ROUTES.FORUM_HOME}>
        <ForumPendingPosts />
      </Route>
      <Route path={ROUTES.FORUM_APPROVED_POSTS}>
        <ForumApprovedPosts />
      </Route>
    </div>
  );
}

import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import UsersPage from './UsersPage';
import UsersAdminPage from './UsersAdminPage';
import UsersNavigationTabs from './UsersNavigationTabs';

const useStyles = makeStyles((theme) => ({
  navigationContainer: {
    marginBottom: theme.spacing(4),
  },
}));

export default function ForumHomePage() {
  const classes = useStyles();

  return (
    <div>
      <h1>Users</h1>

      <div className={classes.navigationContainer}>
        {/* Tabs for top level routes, breadcrumbs for nested routes */}
        <Route exact path={`(${ROUTES.USERS}|${ROUTES.USERS_ADMIN_USERS})`}>
          <UsersNavigationTabs />
        </Route>
      </div>

      <Route exact path={ROUTES.USERS}>
        <UsersPage />
      </Route>
      <Route path={ROUTES.USERS_ADMIN_USERS}>
        <UsersAdminPage />
      </Route>
    </div>
  );
}

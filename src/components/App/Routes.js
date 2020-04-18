import React from 'react';
import { Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import { ForumHomePage } from '../Forum';
import PasswordForgetPage from '../PasswordForget';
import {
  CategoryPage, NewCategoryPage, NewResourcePage, ResourcePage, ResourcesPage,
} from '../Resources';
import EditCategoryPage from '../Resources/Category/EditCategoryPage';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import UsersPage from '../Users';
import { PrivateRoute } from '../Navigation';

export default function Routes() {
  return (
    <>
      {/* Signed out */}
      <Route exact path={ROUTES.SIGN_UP}>
        <SignUpPage />
      </Route>

      <Route exact path={ROUTES.SIGN_IN}>
        <SignInPage />
      </Route>

      <Route exact path={ROUTES.PASSWORD_FORGET}>
        <PasswordForgetPage />
      </Route>

      {/* Signed in */}
      <PrivateRoute exact path={ROUTES.ACCOUNT}>
        <AccountPage />
      </PrivateRoute>

      {/* Admin */}
      <PrivateRoute exact path={ROUTES.ADMIN}>
        <AdminPage />
      </PrivateRoute>

      <PrivateRoute exact path={ROUTES.USERS}>
        <UsersPage />
      </PrivateRoute>

      {/* Resources */}
      <PrivateRoute exact path={ROUTES.RESOURCES}>
        <ResourcesPage />
      </PrivateRoute>

      <PrivateRoute exact path="/resources/new">
        <NewCategoryPage />
      </PrivateRoute>

      <PrivateRoute exact path="/resources/:categoryId">
        <CategoryPage />
      </PrivateRoute>

      <PrivateRoute exact path="/resources/:categoryId/new">
        <NewResourcePage />
      </PrivateRoute>

      <PrivateRoute exact path="/resources/:categoryId/edit">
        <EditCategoryPage />
      </PrivateRoute>

      <PrivateRoute exact path="/resources/item/:resourceId">
        <ResourcePage />
      </PrivateRoute>

      {/* Forum */}
      <PrivateRoute path={ROUTES.FORUM_HOME}>
        <ForumHomePage />
      </PrivateRoute>
    </>
  );
}

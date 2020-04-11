import 'firebase/auth';
import React from 'react';
import { Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import { ForumHomePage, PendingPostsPage } from '../Forum';
import PasswordForgetPage from '../PasswordForget';
import {
  CategoryPage, NewCategoryPage, NewResourcePage, ResourcePage, ResourcesPage,
} from '../Resources';
import EditCategoryPage from '../Resources/Category/EditCategoryPage';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import UsersPage from '../Users';

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
      <Route exact path={ROUTES.ACCOUNT}>
        <AccountPage />
      </Route>

      {/* Admin */}
      <Route exact path={ROUTES.ADMIN}>
        <AdminPage />
      </Route>
      <Route exact path={ROUTES.USERS}>
        <UsersPage />
      </Route>

      {/* Resources */}
      <Route exact path={ROUTES.RESOURCES}>
        <ResourcesPage />
      </Route>

      <Route exact path="/resources/new">
        <NewCategoryPage />
      </Route>

      <Route exact path="/resources/:categoryId">
        <CategoryPage />
      </Route>

      <Route exact path="/resources/:categoryId/new">
        <NewResourcePage />
      </Route>

      <Route exact path="/resources/:categoryId/edit">
        <EditCategoryPage />
      </Route>

      <Route exact path="/resources/item/:resourceId">
        <ResourcePage />
      </Route>

      {/* Forum */}
      <Route exact path={ROUTES.FORUM}>
        <ForumHomePage />
      </Route>

      <Route exact path="/forum/pending">
        <PendingPostsPage />
      </Route>
    </>
  );
}

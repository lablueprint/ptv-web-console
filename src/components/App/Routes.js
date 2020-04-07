import 'firebase/auth';
import React from 'react';
import { Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import ForumHomePage from '../Forum';
import HomePage from '../Home';
import LandingPage from '../Landing';
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
      {/* Public */}
      <Route exact path={ROUTES.LANDING}>
        <LandingPage />
      </Route>

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
      <Route exact path={ROUTES.HOME}>
        <HomePage />
      </Route>

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
      <Route exact path={ROUTES.RESOURCE_CATEGORIES}>
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
    </>
  );
}

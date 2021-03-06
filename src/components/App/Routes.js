import React from 'react';
import * as ROUTES from '../../constants/routes';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import ForumHomePage from '../Forum';
import PasswordForgetPage from '../PasswordForget';
import {
  CategoryPage, NewCategoryPage, NewResourcePage, ResourcePage, ResourcesPage,
} from '../Resources';
import EditCategoryPage from '../Resources/Category/EditCategoryPage';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import UsersPage from '../Users';
import { RouteWithAuth } from '../Navigation';

export default function Routes() {
  return (
    <>
      {/* Signed out */}
      {[
        [ROUTES.SIGN_UP, SignUpPage],
        [ROUTES.SIGN_IN, SignInPage],
        [ROUTES.PASSWORD_FORGET, PasswordForgetPage],
      ].map(([route, Page]) => (
        <RouteWithAuth
          key={route}
          signedOutOnly
          exact
          path={route}
        >
          <Page />
        </RouteWithAuth>
      ))}

      {/* Signed in */}
      {[
        [ROUTES.ACCOUNT, AccountPage],
        [ROUTES.ADMIN, AdminPage],
        [ROUTES.USERS, UsersPage],
        [ROUTES.RESOURCES, ResourcesPage],
        /*
          TODO: nest resource routes inside ResourcesPage
          (this means resources routes won't need the `exact` prop)
        */
        ['/resources/new', NewCategoryPage],
        ['/resources/:categoryId', CategoryPage],
        ['/resources/:categoryId/new', NewResourcePage],
        ['/resources/:categoryId/edit', EditCategoryPage],
        ['/resources/item/:resourceId', ResourcePage],
        [ROUTES.FORUM_HOME, ForumHomePage],
      ].map(([route, Page]) => (
        <RouteWithAuth
          key={route}
          path={route}
        >
          <Page />
        </RouteWithAuth>
      ))}
    </>
  );
}

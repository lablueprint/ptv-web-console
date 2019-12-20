import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import * as ROUTES from '../../constants/routes';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import ForumPage from '../Forum';
import HomePage from '../Home';
import LandingPage from '../Landing';
import Navigation from '../Navigation';
import PasswordForgetPage from '../PasswordForget';
import {
  ResourcesPage, CategoryPage, NewCategoryPage, NewResourcePage, ResourcePage,
} from '../Resources';
import { AuthUserContext, withAuthentication } from '../Session';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import UsersPage from '../Users';


function App() {
  const { authLoading } = useContext(AuthUserContext);
  return (
    <Router>
      <div>
        <ClipLoader loading={authLoading} />
        {!authLoading && <Navigation />}

        <hr />

        <Switch>

          {/* Public */}
          <Route exact path={ROUTES.LANDING}>
            <LandingPage />
          </Route>
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
          <Route exact path="/resources/:categoryURLId">
            <CategoryPage />
          </Route>
          <Route exact path="/resources/:categoryURLId/new">
            <NewResourcePage />
          </Route>
          <Route exact path="/resources/:categoryURLId/:resourceURLId">
            <ResourcePage />
          </Route>

          {/* Forum */}
          <Route exact path={ROUTES.FORUM}>
            <ForumPage />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default withAuthentication(App);

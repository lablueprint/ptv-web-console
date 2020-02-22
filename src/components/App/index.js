import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import PropTypes from 'prop-types';
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
import { AuthUserContext, withAuthentication, withAuthorization } from '../Session';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import UsersPage from '../Users';

function App() {
  const { authLoading } = useContext(AuthUserContext);
  const isAuthenticated = (authUser) => !!authUser;
  return (
    <Router>
      <div>
        <ClipLoader loading={authLoading} />
        {!authLoading && <Navigation />}

        <hr />

        <Switch>

          {/* Public */}
          <Route exact path={ROUTES.LANDING} component={LandingPage} />

          {/* Signed out */}
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

          {/* Signed in */}
          <AuthorizedRoute
            condition={isAuthenticated}
            exact
            path={ROUTES.HOME}
            component={HomePage}
          />
          <AuthorizedRoute
            condition={isAuthenticated}
            exact
            path={ROUTES.ACCOUNT}
            component={AccountPage}
          />

          {/* Admin */}
          <AuthorizedRoute
            condition={isAuthenticated}
            exact
            path={ROUTES.ADMIN}
            component={AdminPage}
          />
          <AuthorizedRoute
            condition={isAuthenticated}
            exact
            path={ROUTES.USERS}
            component={UsersPage}
          />

          {/* Resources */}
          <AuthorizedRoute
            condition={isAuthenticated}
            exact
            path={ROUTES.RESOURCE_CATEGORIES}
            component={ResourcesPage}
          />
          <AuthorizedRoute
            condition={isAuthenticated}
            exact
            path="/resources/new"
            component={NewCategoryPage}
          />
          <AuthorizedRoute
            condition={isAuthenticated}
            exact
            path="/resources/:categoryURLId"
            component={CategoryPage}
          />
          <AuthorizedRoute
            condition={isAuthenticated}
            exact
            path="/resources/:categoryURLId/new"
            component={NewResourcePage}
          />
          <AuthorizedRoute
            condition={isAuthenticated}
            exact
            path="/resources/:categoryURLId/:resourceURLId"
            component={ResourcePage}
          />

          {/* Forum */}
          <AuthorizedRoute
            condition={isAuthenticated}
            exact
            path={ROUTES.FORUM}
            component={ForumPage}
          />

        </Switch>
      </div>
    </Router>
  );
}

function AuthorizedRoute({ condition, component, ...rest }) {
  const AuthorizedComponent = withAuthorization(condition)(component);
  return (
    <Route {...rest} component={AuthorizedComponent} />
  );
}

AuthorizedRoute.propTypes = {
  condition: PropTypes.func.isRequired,
  component: PropTypes.func,
};

AuthorizedRoute.defaultProps = {
  component: null,
};

export default withAuthentication(App);

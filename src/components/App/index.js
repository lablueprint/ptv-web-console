import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
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
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import UsersPage from '../Users';

import 'firebase/auth';
import EditCategoryPage from '../Resources/Category/EditCategoryPage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  const [user, initialising] = useAuthState(firebase.auth());
  const isAuthenticated = (authUser) => !!authUser;

  return (
    <Router>
      <div>
        <ClipLoader loading={initialising} />
        {!initialising && <Navigation authenticated={!!user} />}

        <hr />

        <Switch>

          {/* Public */}
          <Route exact path={ROUTES.LANDING} component={LandingPage} />

          {/* Signed out */}
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

          {/* Signed in */}
          <Route
            condition={isAuthenticated}
            exact
            path={ROUTES.HOME}
            component={HomePage}
          />
          <Route
            condition={isAuthenticated}
            exact
            path={ROUTES.ACCOUNT}
            component={AccountPage}
          />

          {/* Admin */}
          <Route
            condition={isAuthenticated}
            exact
            path={ROUTES.ADMIN}
            component={AdminPage}
          />
          <Route
            condition={isAuthenticated}
            exact
            path={ROUTES.USERS}
            component={UsersPage}
          />

          {/* Resources */}
          <Route
            condition={isAuthenticated}
            exact
            path={ROUTES.RESOURCE_CATEGORIES}
            component={ResourcesPage}
          />
          <Route
            condition={isAuthenticated}
            exact
            path="/resources/new"
            component={NewCategoryPage}
          />
          <Route
            condition={isAuthenticated}
            exact
            path="/resources/:categoryId"
            component={CategoryPage}
          />
          <Route
            condition={isAuthenticated}
            exact
            path="/resources/:categoryId/new"
            component={NewResourcePage}
          />
          <Route
            condition={isAuthenticated}
            exact
            path="/resources/:categoryId/edit"
            component={EditCategoryPage}
          />
          <Route
            condition={isAuthenticated}
            exact
            path="/resources/:categoryId/:resourceId"
            component={ResourcePage}
          />

          {/* Forum */}
          <Route
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

// function AuthorizedRoute({ condition, component, ...rest }) {
//   const AuthorizedComponent = withAuthorization(condition)(component);
//   return (
//     <Route {...rest} component={AuthorizedComponent} />
//   );
// }

// AuthorizedRoute.propTypes = {
//   condition: PropTypes.func.isRequired,
//   component: PropTypes.func,
// };

// AuthorizedRoute.defaultProps = {
//   component: null,
// };

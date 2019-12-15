import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import ForumPage from '../Forum';
import HomePage from '../Home';
import LandingPage from '../Landing';
import Navigation from '../Navigation';
import PasswordForgetPage from '../PasswordForget';
import ResourceCategoriesPage from '../ResourceCategories';
import ResourcesPage from '../Resources';
import { withAuthentication } from '../Session';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import UsersPage from '../Users';


function App() {
  return (
    <Router>
      <div>
        <Navigation />

        <hr />

        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route exact path={ROUTES.ADMIN} component={AdminPage} />
          <Route exact path={ROUTES.FORUM} component={ForumPage} />
          <Route exact path={ROUTES.USERS} component={UsersPage} />

          {/* Resources */}
          <Route exact path={ROUTES.RESOURCE_CATEGORIES}>
            <ResourceCategoriesPage />
          </Route>
          <Route exact path="/resources/:category">
            <ResourcesPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default withAuthentication(App);

import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { NavigationDrawer } from '../Navigation';
import ProfileMenu from './ProfileMenu';
import Routes from './Routes';
import { AuthContext } from '../Context';

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row-reverse',
    padding: theme.spacing(3),
    paddingRight: theme.spacing(6),
  },
  background: (props) => ({
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.main,
    minHeight: '100vh',
    height: '100%',
    paddingLeft: props.authenticated ? theme.spacing(3) : 0,
    paddingRight: props.authenticated ? theme.spacing(3) : 0,
  }),
  foreground: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  content: (props) => ({
    minHeight: '100%',
    paddingLeft: props.authenticated ? theme.spacing(20) : 0,
    paddingRight: props.authenticated ? theme.spacing(20) : 0,
  }),
}));

export default function App() {
  const [user, initialising] = useAuthState(firebase.auth());
  const classes = useStyles({ authenticated: !initialising && user });

  return (
    <AuthContext.Provider value={{ user, initialising }}>
      <div className={classes.root}>
        <CssBaseline />
        <Router>
          {!initialising && user && (
          <NavigationDrawer />
          )}
          <div className={classes.background}>
            <div className={classes.foreground}>
              {!initialising && user && (
              <div className={classes.toolbar}>
                <ProfileMenu />
              </div>
              )}
              <main className={classes.content}>
                <Switch>
                  <>
                    {initialising
                      ? <LinearProgress size={24} />
                      : <Routes user={user} initialising={initialising} />}
                  </>
                </Switch>
              </main>
            </div>
          </div>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

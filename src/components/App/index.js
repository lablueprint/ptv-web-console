import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { NavigationAuth, NavigationNonAuth } from '../Navigation';
import Routes from './Routes';

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
  toolbar: theme.mixins.toolbar,
  content: {
    width: '100%',
  },
}));

export default function App() {
  const [user, initialising] = useAuthState(firebase.auth());
  const classes = useStyles();

  const renderNavButtons = () => {
    if (initialising) {
      return <CircularProgress size={24} />;
    }
    if (user) {
      return <NavigationAuth />;
    }
    return <NavigationNonAuth />;
  };

  return (
    <div className={classes.root}>
      <Router>
        <AppBar position="fixed">
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <Button color="inherit" component={Link} to="/">
              <Typography className={classes.title} variant="h6" noWrap>
                Web Console &mdash; PTV Mobile App
              </Typography>
            </Button>
            {renderNavButtons()}
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {initialising && <LinearProgress size={24} />}
            <Routes />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

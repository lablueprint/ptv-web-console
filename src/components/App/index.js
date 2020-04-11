import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Routes from './Routes';
import ProfileMenu from './ProfileMenu';

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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.colors.primary,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  content: (props) => ({
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: props.authenticated ? theme.spacing(3) : 0,
  }),
}));

export default function App() {
  const [user, initialising] = useAuthState(firebase.auth());
  const classes = useStyles({ authenticated: !initialising && user });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        {!initialising && user && (
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <List>
              {[
                [ROUTES.RESOURCES, 'Home'],
                [ROUTES.FORUM, 'Forum'],
                [ROUTES.USERS, 'Users'],
              ].map(([route, buttonTitle]) => (
                <ListItem button key={route} color="inherit" component={Link} to={route}>
                  <ListItemText primary={buttonTitle} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        )}
        <main className={classes.content}>
          {!initialising && user && (
            <div className={classes.toolbar}>
              <ProfileMenu />
            </div>
          )}
          <Switch>
            {initialising && <LinearProgress size={24} />}
            <Routes />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

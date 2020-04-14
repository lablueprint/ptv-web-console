import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import ForumIcon from '@material-ui/icons/Forum';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
  },
  root: {
    backgroundColor: 'white',
    marginTop: theme.spacing(2),
    width: '80%',
    borderRadius: theme.spacing(0, 3, 3, 0),
  },
}));

export default function NavigationDrawer() {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <List className={classes.list}>
        {[
          [HomeIcon, ROUTES.RESOURCES, 'Home'],
          [ForumIcon, ROUTES.FORUM, 'Forum'],
          [PersonIcon, ROUTES.USERS, 'Users'],
        ].map(([Icon, route, buttonTitle]) => (
          <ListItem
            key={route}
            button
            color="inherit"
            component={Link}
            to={route}
            classes={{
              root: classes.root,
            }}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={buttonTitle}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>

  );
}

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import * as ROUTES from '../../constants/routes';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const [name, setName] = useState(null);

  useEffect(() => (
    firebase.auth().onAuthStateChanged((userCredential) => {
      setName(userCredential.email);
    })), []);

  const handleSignOut = () => {
    handleProfileMenuClose();
    firebase.auth().signOut();
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="menu-appbar"
      keepMounted
      open={isMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuClose} component={Link} to="/profile">
        Profile
      </MenuItem>
      <MenuItem onClick={handleProfileMenuClose} component={Link} to={ROUTES.ACCOUNT}>
        Account
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleSignOut} component={Link} to="/">
        Sign Out
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.container}>
      <Typography className={classes.text}>
        {`Hi, ${name}`}
      </Typography>
      <IconButton
        edge="end"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      {renderMenu}
    </div>
  );
}

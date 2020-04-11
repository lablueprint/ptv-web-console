import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

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
    <div>
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

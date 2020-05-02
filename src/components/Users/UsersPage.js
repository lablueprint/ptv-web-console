import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Typography } from '@material-ui/core';
import UsersList from './UsersList';

const useStyles = makeStyles({
  searchBarRoot: {
    padding: 5,
    display: 'flex',
    width: '20%',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 10,
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
  switchRoot: {
    marginBottom: 20,
    flexDirection: 'row',
    display: 'flex',
  },
  switchAdmin: {
    flex: 1,
  },
  dropdown: {
    flex: 1,
  },
  spacing: {
    flex: 3,
  },
});

const sortOptions = [
  'Newest Users',
  'Oldest Users',
  'Name - Alphabetical',
];

function SearchBar({ setSearchText }) {
  const classes = useStyles();
  return (
    <Paper component="form" className={classes.searchBarRoot}>
      <InputBase
        className={classes.input}
        placeholder="Search Users"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <IconButton type="submit" className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

function AdminSwitch({ adminSwitch, setAdminSwitch }) {
  const classes = useStyles();
  return (
    <Grid component="label" container alignItems="center" spacing={1} className={classes.switchAdmin}>
      <Grid item>Standard Users</Grid>
      <Grid item>
        <Switch checked={adminSwitch} onChange={(e) => { setAdminSwitch(e.target.checked); }} />
      </Grid>
      <Grid item>Admin Users</Grid>
    </Grid>
  );
}

function SortDropdown({
  anchorEl, selectedIndex, handleClickListItem, handleClose, handleMenuItemClick,
}) {
  const classes = useStyles();
  return (
    <Typography component="div">
      <List component="nav" className={classes.dropdown}>
        <ListItem
          button
          onClick={handleClickListItem}
        >
          <ListItemText primary="Sort By: " secondary={sortOptions[selectedIndex]} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {sortOptions.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(e) => handleMenuItemClick(e, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Typography>
  );
}

export default function UsersPage() {
  const classes = useStyles();
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('users'),
  );
  const [users, setUsers] = useState([]);

  /* Search bar text state */
  const [searchText, setSearchText] = useState(null);

  /* Standard user to admin switch state */
  const [adminSwitch, setAdminSwitch] = useState(false);

  /* Sort dropdown hooks */
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  /* Sort dropdown functions */
  const handleClickListItem = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuItemClick = (_, i) => {
    setSelectedIndex(i);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (value) {
      setUsers(value.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  }, [value]);

  return (
    <div>
      <h1>Users List</h1>
      <SearchBar setSearchText={setSearchText} classes={classes} />
      <Typography component="div" className={classes.switchRoot}>
        <AdminSwitch adminSwitch={adminSwitch} setAdminSwitch={setAdminSwitch} />
        <Typography component="div" className={classes.spacing} />
        <SortDropdown
          anchorEl={anchorEl}
          selectedIndex={selectedIndex}
          handleClickListItem={handleClickListItem}
          handleClose={handleClose}
          handleMenuItemClick={handleMenuItemClick}
        />
      </Typography>
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <UsersList
        users={users}
        searchText={searchText}
        adminSwitch={adminSwitch}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}

SearchBar.propTypes = {
  setSearchText: PropTypes.func.isRequired,
};

AdminSwitch.propTypes = {
  adminSwitch: PropTypes.bool.isRequired,
  setAdminSwitch: PropTypes.func.isRequired,
};

SortDropdown.propTypes = {
  anchorEl: PropTypes.element.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  handleClickListItem: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleMenuItemClick: PropTypes.func.isRequired,
};

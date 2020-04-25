import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  searchBarRoot: {
    marginBottom: 20,
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '20%',
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
  input: {
    marginLeft: 10,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  normalRow: {

  },
  bannedRow: {
    backgroundColor: 'LightCoral',
  },
});

const sortOptions = [
  'Newest Users',
  'Oldest Users',
  'Name - Alphabetical',
];

export default function UsersList({ users }) {
  const classes = useStyles();
  const [userItems, setUserItems] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [adminSwitch, setAdminSwitch] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  /* sort dropdown hooks */
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  /* sort dropdown functions */
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
    setUserItems(
      users.filter((user) => !searchText
    || ((user.name ? user.name : '').toLowerCase().search(searchText) !== -1
    || (user.displayName ? user.displayName : '').toLowerCase().search(searchText) !== -1)
    || (user.email ? user.email : '').toLowerCase().search(searchText) !== -1)
        .filter((user) => (adminSwitch ? user.isAdmin : !user.isAdmin))
        .sort((userA, userB) => {
          if (!userA.updatedAt || !userB.updatedAt) {
            return true;
          }
          switch (selectedIndex) {
          /* Newest users */
            case 0:
              if (userA.updatedAt.toDate() > userB.updatedAt.toDate()) {
                return 1;
              }
              return -1;
              /* Oldest users */
            case 1:
              if (userA.updatedAt.toDate() < userB.updatedAt.toDate()) {
                return 1;
              }
              return -1;
              /* Name - Alphabetical */
            case 2:
              if (userA.name > userB.name) {
                return 1;
              }
              return -1;
              /* Invalid selection */
            default:
              return true;
          }
        })
        .map((user) => (
          <TableRow key={user.id} className={user.isBanned ? classes.bannedRow : classes.normalRow}>
            <TableCell component="th" scope="row">{user.displayName}</TableCell>
            <TableCell align="center">{user.name}</TableCell>
            <TableCell align="center">{user.updatedAt ? user.updatedAt.toDate().toUTCString() : 'N/A'}</TableCell>
            <TableCell align="center">{user.email}</TableCell>
            <TableCell align="center">{user.role}</TableCell>
            <TableCell align="center">
              <Button onClick={() => {
                firebase.firestore().collection('users').doc(user.id).set({
                  ...user,
                  isBanned: !user.isBanned,
                })
                  .catch((error) => {
                    setErrorMessage(error.message);
                  });
              }}
              >
                {user.isBanned ? 'Unban' : 'Ban'}
              </Button>
            </TableCell>
          </TableRow>
        )),
    );
  }, [users, searchText, adminSwitch, classes, selectedIndex]);

  return (
    <Typography component="div">
      <Paper component="form" className={classes.searchBarRoot}>
        <InputBase
          className={classes.input}
          placeholder="Search Users"
          inputProps={{ 'aria-label': 'search users' }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Typography component="div" className={classes.switchRoot}>
        <Grid component="label" container alignItems="center" spacing={1} className={classes.switchAdmin}>
          <Grid item>Standard Users</Grid>
          <Grid item>
            <Switch checked={adminSwitch} onChange={(e) => { setAdminSwitch(e.target.checked); }} />
          </Grid>
          <Grid item>Admin Users</Grid>
        </Grid>
        <Typography component="div" className={classes.spacing} />
        <List component="nav" className={classes.dropdown}>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Display Name</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Date Joined</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userItems}
          </TableBody>
        </Table>
      </TableContainer>
      {errorMessage && <Typography>{errorMessage}</Typography>}
    </Typography>
  );
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string,
      role: PropTypes.string,
      name: PropTypes.string,
      displayName: PropTypes.string,
      isAdmin: PropTypes.bool,
    }),
  ).isRequired,
};

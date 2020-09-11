import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Typography, useTheme } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import UsersList from './UsersList';
import ListView from '../ListView';

const useStyles = makeStyles((theme) => ({
  searchBarRoot: {
    marginBottom: 20,
    padding: 5,
    display: 'flex',
    width: '40%',
    justifyContent: 'space-between',
    borderRadius: 40,
  },
  iconButton: {
    padding: 10,
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
  switchRoot: {
    flexDirection: 'row',
    display: 'flex',
  },
  switchAdmin: {
    flex: 1,
    paddingTop: 10,
  },
  tab: {
    fontSize: theme.typography.pxToRem(20),
    textTransform: 'none',
  },
  dropdown: {
    flex: 1,
  },
  spacing: {
    flex: 3,
  },
}));

const sortOptions = [
  'Newest Users',
  'Oldest Users',
  'Name - Alphabetical',
];

const usersListColumnsSortIndex = 0;
const usersListColumnsTimeIndex = 2;
const usersListColumns = [
  {
    id: 'name',
    label: 'Full Name',
    search: true,
  },
  {
    id: 'displayName',
    label: 'Display Name',
    search: true,
  },
  {
    id: 'updatedAt',
    label: 'Date Joined',
    search: false,
    format: (value) => (value ? value.toDate().toLocaleString() : 'Date not found'),
  },
  {
    id: 'email',
    label: 'Email',
    search: true,
  },
];

function SearchBar({ setSearchText, setPage }) {
  const classes = useStyles();
  return (
    <Paper component="form" className={classes.searchBarRoot}>
      <InputBase
        className={classes.input}
        placeholder="Search Users"
        onChange={(e) => {
          setSearchText(e.target.value);
          setPage(0);
        }}
      />
      <IconButton type="submit" className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

function AdminSwitch({ adminSwitch, setAdminSwitch, setPage }) {
  const classes = useStyles();
  return (
    <Paper elevation={0}>
      <Tabs
        className={classes.switchAdmin}
        value={adminSwitch}
        onChange={(_, n) => {
          setAdminSwitch(n);
          setPage(0);
        }}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Standard Users" className={classes.tab} />
        <Tab label="Admin Users" className={classes.tab} />
      </Tabs>
    </Paper>
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
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const pendingActionButtons = [
    {
      Icon: EditIcon,
      color: theme.palette.text.main,
    },
    {
      Icon: CheckIcon,
      color: theme.palette.success.main,
    },
    {
      Icon: ClearIcon,
      color: theme.palette.error.main,
    },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    firebase.firestore().collection('users')
      .orderBy('updatedAt')
      .get()
      .then((snapshot) => {
        const forumData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setRows(forumData);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h1>Users</h1>
      <ListView
        rows={rows}
        loading={loading}
        errorMessage={errorMessage}
        columns={usersListColumns}
        actionButtons={pendingActionButtons}
        sortColumnIndex={usersListColumnsSortIndex}
        timestampColumnIndex={usersListColumnsTimeIndex}
      />
    </div>
  );

  // const classes = useStyles();
  // const [value, loading, error] = useCollection(
  //   firebase.firestore().collection('users'),
  // );
  // const [users, setUsers] = useState([]);

  // /* Page number state */
  // const [page, setPage] = useState(0);

  // /* Search bar text state */
  // const [searchText, setSearchText] = useState(null);

  // /* Standard user to admin switch state */
  // const [adminSwitch, setAdminSwitch] = useState(0);

  // /* Sort dropdown hooks */
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [selectedIndex, setSelectedIndex] = useState(0);

  // /* Sort dropdown functions */
  // const handleClickListItem = (e) => {
  //   setAnchorEl(e.currentTarget);
  // };

  // const handleMenuItemClick = (_, i) => {
  //   setSelectedIndex(i);
  //   setAnchorEl(null);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // useEffect(() => {
  //   if (value) {
  //     setUsers(value.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   }
  // }, [value]);

  // return (
  //   <div>
  //     <h1>Users List</h1>
  //     <SearchBar setSearchText={setSearchText} classes={classes} setPage={setPage} />
  //     <Typography component="div" className={classes.switchRoot}>
  //       <AdminSwitch adminSwitch={adminSwitch} setAdminSwitch={setAdminSwitch} setPage={setPage} />
  //       <Typography component="div" className={classes.spacing} />
  //       <SortDropdown
  //         anchorEl={anchorEl}
  //         selectedIndex={selectedIndex}
  //         handleClickListItem={handleClickListItem}
  //         handleClose={handleClose}
  //         handleMenuItemClick={handleMenuItemClick}
  //       />
  //     </Typography>
  //     {loading && <p>loading...</p>}
  //     {error && <p>{error.message}</p>}
  //     <UsersList
  //       users={users}
  //       searchText={searchText}
  //       adminSwitch={adminSwitch}
  //       selectedIndex={selectedIndex}
  //       page={page}
  //       setPage={setPage}
  //     />
  //   </div>
  // );
}

SearchBar.propTypes = {
  setSearchText: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

AdminSwitch.propTypes = {
  adminSwitch: PropTypes.bool.isRequired,
  setAdminSwitch: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

SortDropdown.propTypes = {
  anchorEl: PropTypes.element.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  handleClickListItem: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleMenuItemClick: PropTypes.func.isRequired,
};

import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
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
  spacing: {
    flex: 3,
  },
  tab: {
    fontSize: theme.typography.pxToRem(20),
    textTransform: 'none',
  },
  dropdown: {
    flex: 1,
  },
}));

const sortOptions = [
  'Newest',
  'Oldest',
  'Alphabetical',
];

function SearchBar({ setSearchText, setPage }) {
  const classes = useStyles();
  return (
    <Paper component="form" className={classes.searchBarRoot}>
      <InputBase
        className={classes.input}
        placeholder="Search Here"
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

export default function ListView({
  rows, loading, errorMessage, columns, actionButtons, sortColumnIndex, timestampColumnIndex,
}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* Search bar text state */
  const [searchText, setSearchText] = useState(null);

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

  const handleChangePage = useCallback((event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    event.preventDefault();
    setRowsPerPage(event.target.value);
    setPage(0);
  }, []);

  return (
    <Paper className={classes.root} elevation={0}>
      <Typography component="div" className={classes.switchRoot}>
        <SearchBar setSearchText={setSearchText} setPage={setPage} classes={classes} />
        <Typography component="div" className={classes.spacing} />
        <SortDropdown
          anchorEl={anchorEl}
          selectedIndex={selectedIndex}
          handleClickListItem={handleClickListItem}
          handleClose={handleClose}
          handleMenuItemClick={handleMenuItemClick}
        />
      </Typography>
      {loading && <LinearProgress />}
      {errorMessage && <p>{errorMessage}</p>}
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[columns].map((columnsList) => (
                columnsList.map((column) => (
                  <TableCell key={column.label}>
                    <Chip color="primary" label={column.label} />
                  </TableCell>
                ))))}
              <TableCell>
                <Chip color="primary" label="Actions" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.filter((row) => !searchText
            || ([columns].map((columnsList) => (
              columnsList.map((column) => {
                const value = row[column.id] ? row[column.id] : '';
                return column.search
                  ? value.toString().toLowerCase().search(searchText) !== -1
                  : false;
              })
            )))
              .filter((nest) => nest.filter((item) => item).length !== 0).length !== 0)
              .sort((a, b) => {
                switch (selectedIndex) {
                  case 0: /* Newest */
                    if (a[columns[timestampColumnIndex].id].toDate()
                      < b[columns[timestampColumnIndex].id].toDate()) {
                      return 1;
                    }
                    return -1;
                  case 1: /* Oldest */
                    if (a[columns[timestampColumnIndex].id].toDate()
                      > b[columns[timestampColumnIndex].id].toDate()) {
                      return 1;
                    }
                    return -1;
                  case 2: /* Alphabetical */
                    if (a[columns[sortColumnIndex].id] > b[columns[sortColumnIndex].id]) {
                      return 1;
                    }
                    return -1;
                  default: /* Invalid selection */
                    return true;
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {[columns].map((columnsList) => (
                    columnsList.map((column) => {
                      const value = row[column.id];
                      const col = column;
                      col.textValue = column.format ? column.format(value) : value;
                      return (
                        <TableCell key={column.label}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })))}
                  <TableCell>
                    {actionButtons.map(({ Icon, color }, i) => (
                    // Array will never change; index okay to use as key
                    // eslint-disable-next-line react/no-array-index-key
                      <IconButton key={i}>
                        <Icon style={{ color }} />
                      </IconButton>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

ListView.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    format: PropTypes.func,
  })).isRequired,
  actionButtons: PropTypes.arrayOf(PropTypes.shape({
    Icon: PropTypes.elementType.isRequired,
    color: PropTypes.string,
  })).isRequired,
  sortColumnIndex: PropTypes.number.isRequired,
  timestampColumnIndex: PropTypes.number.isRequired,
};

ListView.defaultProps = {
  errorMessage: null,
};

SearchBar.propTypes = {
  setSearchText: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

SortDropdown.propTypes = {
  anchorEl: PropTypes.objectOf(PropTypes.object),
  selectedIndex: PropTypes.number.isRequired,
  handleClickListItem: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleMenuItemClick: PropTypes.func.isRequired,
};

SortDropdown.defaultProps = {
  anchorEl: null,
};

import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function ListView({
  rows, loading, errorMessage, columns, actionButtons,
}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {[columns].map((columnsList) => (
                  columnsList.map((column) => {
                    const value = row[column.id];
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
  errorMessage: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    format: PropTypes.func,
  })).isRequired,
  actionButtons: PropTypes.arrayOf(PropTypes.shape({
    Icon: PropTypes.elementType.isRequired,
    color: PropTypes.string,
  })).isRequired,
};

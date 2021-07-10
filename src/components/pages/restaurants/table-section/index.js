import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import orange from "@material-ui/core/colors/orange";
import defaultTo from 'lodash/defaultTo';

const color = orange[300];

const columns = [
  { id: "id", label: "ID", minWidth: 10 },
  { id: "title", label: "Title", minWidth: 170 },
  { id: "rateValue", label: "Rate" },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: color,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const TableSection = ({ data }) => {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((restaurant) => {
                return (
                  <TableRow
                    hover={true}
                    onClick={() => history.push(`/${restaurant.id}`)}
                    role="checkbox"
                    tabIndex={-1}
                    key={restaurant.id}
                  >
                    {columns.map((column) => {
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.id === "rateValue"
                            ? defaultTo(Math.round(
                                restaurant.rateValue / restaurant.rateCount
                              ), 0)
                            : restaurant[column.id]}
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

TableSection.defaultProps = {
  data: [],
};

TableSection.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rateValue: PropTypes.number.isRequired,
      rateCount: PropTypes.number.isRequired,
    })
  ),
};

export default TableSection;

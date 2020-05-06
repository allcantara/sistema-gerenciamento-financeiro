import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from '@material-ui/core/Typography'
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import {
  TableToolbarComponent,
  TableHeadComponent,
  TableRowComponent,
} from "./components";

function createData(taxe, value, date, total, isTaxes) {
  return { taxe, value, date, total, isTaxes };
}

const rows = [
  createData(6, 300, "02/02/2020", 350, false),
  createData(6, 200, "02/02/2020", 250, true),
  createData(6, 100, "02/02/2020", 150, true),
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 40,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    marginTop: 12
  },
  table: {
    minWidth: 500,
  },
  th: {
    cursor: "pointer",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  iconPayment: {
    color: "green",
  },
  iconNotPayment: {
    color: "red",
  },
}));

export default function TableComponent() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        component="div"
      >
        Impostos pagos
      </Typography>
      <Paper className={classes.paper}>
        <TableToolbarComponent />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <TableHeadComponent classes={classes} rowCount={rows.length} />

            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRowComponent
                      row={row}
                      key={index}
                      className={classes}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Densidade"
      />
    </div>
  );
}
